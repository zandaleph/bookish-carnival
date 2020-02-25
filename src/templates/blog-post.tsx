import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/core';
import ordinal from 'ordinal';
import Layout from '../components/Layout';
import { BlogPostQuery } from '../../types/graphql-type';

const GITHUB_HISTORY_URL_BASE =
  'https://github.com/zandaleph/bookish-carnival/commits/master/src/posts/';

// XXX All the types here should be string but the graphql codegen is broken.
function formatDate(isoDate: any | null | undefined): string {
  if (isoDate == null) {
    return 'unknown';
  }
  const d = new Date(isoDate);
  const month = d.toLocaleString('en-US', { month: 'long' });
  const day = d.getDate();
  const year = d.getFullYear();
  const time = d.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  });
  return `${month} ${ordinal(day)}, ${year} ${time}`;
}

interface Props {
  data: BlogPostQuery;
}

export default function BlogPost({ data }: Props) {
  const post = data.mdx;
  const fm = post?.frontmatter;
  const editDate = formatDate(post?.parent?.fields?.gitLogLatestDate);
  const path = post?.parent?.relativePath;
  const githubHref = GITHUB_HISTORY_URL_BASE + path;
  return (
    <Layout>
      <h1>{fm?.title}</h1>
      <p>Posted {fm?.date} by Zack Spencer</p>
      <p
        css={css`
          font-style: italic;
        `}
      >
        {fm?.lead}
      </p>
      <MDXRenderer>{post?.body ?? ''}</MDXRenderer>
      <p
        css={css`
          font-style: italic;
        `}
      >
        <a href={githubHref}>Last edited: {editDate}</a>
      </p>
    </Layout>
  );
}

export const query = graphql`
  query BlogPost($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        lead
      }
      parent {
        ... on File {
          fields {
            gitLogLatestDate
          }
          relativePath
        }
      }
    }
  }
`;
