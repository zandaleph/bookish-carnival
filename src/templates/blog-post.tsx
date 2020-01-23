import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { css } from '@emotion/core';
import ordinal from 'ordinal';
import Layout from '../components/Layout';
import { BlogPostQuery } from '../../types/graphql-type';

interface Props {
  data: BlogPostQuery;
}

export default function BlogPost({ data }: Props) {
  const post = data.mdx;
  const fm = post?.frontmatter;
  const date = `${fm?.month} ${ordinal(parseInt(fm?.day))}, ${fm?.year}`;
  return (
    <Layout>
      <h1>{fm?.title}</h1>
      <p>Posted {date} by Zack Spencer</p>
      <p
        css={css`
          font-style: italic;
        `}
      >
        {fm?.lead}
      </p>
      <MDXRenderer>{post?.body ?? ''}</MDXRenderer>
    </Layout>
  );
}

export const query = graphql`
  query BlogPost($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        day: date(formatString: "DD")
        month: date(formatString: "MMMM")
        year: date(formatString: "YYYY")
        lead
      }
    }
  }
`;
