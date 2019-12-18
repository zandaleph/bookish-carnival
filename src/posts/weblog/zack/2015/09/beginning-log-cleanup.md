---
title: 'Beginning Log Cleanup'
date: '2015-09-16'
lead: 'Turning bits of data into bigger bits of data.'
legacyPath: '/weblog/zack/2013/12/beginning-log-cleanup.html'
---

Well, it turns out that altmeta.org has been running for almost two years (639 days at the time of this writing). During that time, we've received a fair amount of web traffic. I wanted to know how much, but my S3 access logs were so fine-grained that it was getting time consuming to download them all.

I've know this was going to be a problem from the early days, and had some code lying around which began to solve the problem by downloading all the log files for a given day, concatenating them into a single daily file, compressing them, and uploading them to a slightly different location in my logs bucket. But the code was not complete, and I decided to go ahead and finish it.

It turns out that in two years my python has atrophied even further, and I almost didn't know where to begin with the code I had written almost two years ago. But I quickly figured out that the code as written would try to store all the logs I'd ever generated in memory before uploading any data, which just reeked of bad design. So I figured I'd just try again.

As I've written a fair amount of Ruby in the past three years, including a few scripts intended to be invoked from the command line, my second attempt was in Ruby. AWS provides a two nice SDKs for ruby - an API level SDK, and a Resource (or Object-Oriented, if you prefer) version for higher level interactions.

Naively, I wanted to use `#group_by` to gather the second-granularity files into day-sized buckets, then handle things a day at a time. However, I knew that S3 would return results in alphabetical order, and that because the second-granularity files were prefixed with an ISO 8601 timestamp, that I would get the files in chronological order. I wanted to see if there was a way to handle a day at a time in a streaming fashion instead of listing all the files. I found the method I wanted via a little google searching, and it was called `#chunk`.

After that, the code basically wrote itself. I needed a function which would take a date and a list of files for that date and would build them into a single concatenated file - easily done. I paid some close attention to the order in which files were written and deleted - wouldn't want to delete files before I was sure I had rewritten the data somewhere else. Finally, I knew I would end up with a partial day somehow, so I added support for appending to an existing condensed file. I do some extra error checking around this because it seems prone to subtle bugs (what happens if the computer dies halfway through writing the new version?), but realistically I probably overcomplicated things here.

I also opted to not compress the concatenated logs. The sum total of the data was just not very large, and so the added complexity of trying to figure that out was best left for a later addition to the code. You can see the whole script at the end of this post.

To see how this all gets installed, the updates to the startup script are here:

```sh
# Install ruby

yum -y install ruby22

# Install log-condense cron

gem2.2 install 'aws-sdk-resources'
aws s3 cp s3://org.altmeta.data/spot-1/log_condense /usr/local/bin/log_condense
chmod +x /usr/local/bin/log_condense
aws s3 cp s3://org.altmeta.data/spot-1/cron.d/log-condense /etc/cron.d/log-condense
```

All I'm doing is installing ruby and the AWS SDK I need, followed by inserting my script into a common place for scripts. I also add a small task to be run by cron by putting this file into /etc/cron.d:

```cron
AWS_REGION=us-east-1
@daily root /usr/local/bin/log_condense
```

The cron entry is simple enough, though I didn't discover that I needed the environment variable until after it failed once. I also learned that any output generated by scripts run by cron get emailed to the user running the job, in this case root. Since this is Unix, apparently that means that some data shows up in /var/mail/root. Not the first way I would have chosen to be notified of something going wrong, and possibly something to be improved upon in a later iteration.

So now that we've got this running every night, what are the results? Well, here are a few interesting observations about the data.

By far my most frequent visitors are robots - baidu, google, and majestic12 say hi every day. I also get vulnerability scans - PHP and ColdFusion seems to be the most popular, which probably says something sad about the history of vulnerabilities those frameworks have.

I don't have IP addresses for my visitiors in the S3 access logs because all access is being proxied through my webserver. It looks like I have additional work to do in persisting my nginx logs if I want to understand more about where my visitors are actually coming from.

Finally, at the time of this writing I have exactly 49000 recorded hits of my S3 website bucket, which puts me 1000 hits shy of 50k "views". Of course, since most of these are robots, that's not really saying anything, but it is indicative of the kind of traffic you can expect just for existing on the internet.

It feels good to be able to do small changes like this again. If there's one valuable lesson I've learned in the past year, it's that cutting corners can help you build up some intertia, which you can later use to pay down your technical debt if needed.

Oh yeah, here's that log condense script. Not the prettiest code I ever wrote, but works plenty well enough for now.

```ruby
#!/usr/bin/env ruby2.2

require 'aws-sdk-resources'

class Condenser

  def initialize(bucket, src_prefix, dest_prefix, key_size)
    @bucket = bucket
    @src_prefix = src_prefix
    @dest_prefix = dest_prefix
    @key_size = key_size
  end

  def condense
    @bucket.objects(prefix: @src_prefix)
      .chunk {|o| o.key[@src_prefix.size, @key_size]}
      .each {|key, objs| _condense(key, objs)}
  end

  def _condense(key, objs)
    target = @bucket.object("#{@dest_prefix}#{key}")
    orig = nil
    body = ''
    if target.exists?
      orig = @bucket.object("#{target.key}.orig")
      raise 'recondense already in progress or failed' if orig.exists?
      body = target.get.body.read
      orig.put(body: body)
    end
    body += objs.map {|o| o.get.body.read}.reduce(:+)
    target.put(body: body)
    objs.each(&:delete)
    unless orig.nil?
      orig.delete
    end
  end
end

if $0 == __FILE__
  s3 = Aws::S3::Resource.new
  bucket = s3.bucket('org.altmeta.logs')
  condenser = Condenser.new(bucket, 'altmeta.org/', 'condensed/altmeta.org/', 10)
  condenser.condense
end
```