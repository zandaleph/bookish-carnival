import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/core';
import ordinal from 'ordinal';
import Layout from '../components/Layout';
import { BlogPostQuery, BlogPostsQuery } from '../../types/graphql-type';

type BlogPostNode = BlogPostsQuery['allMdx']['edges'][0]['node'];

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

function relativeLink(
  rel: BlogPostNode | null,
  link: string
): JSX.Element | null {
  return rel != null ? (
    <Link to={rel.fields?.slug ?? ''}>
      {link}: {rel.frontmatter?.title}
    </Link>
  ) : null;
}

interface Props {
  data: BlogPostQuery;
  pageContext: {
    prev: BlogPostNode | null;
    next: BlogPostNode | null;
  };
}

export default function BlogPost({ data, pageContext }: Props) {
  const post = data.mdx;
  const fm = post?.frontmatter;
  const editDate = formatDate(post?.parent?.fields?.gitLogLatestDate);
  const path = post?.parent?.relativePath;
  const githubHref = GITHUB_HISTORY_URL_BASE + path;

  const prevLink = relativeLink(pageContext.prev, 'Previous');
  const nextLink = relativeLink(pageContext.next, 'Next');

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
      <p>{prevLink}</p>
      <p>{nextLink}</p>
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
