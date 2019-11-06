import React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import ordinal from 'ordinal';
import Layout from '../components/Layout';

export default function BlogPost({ data }) {
  const post = data.markdownRemark;
  const fm = post.frontmatter;
  const date = `${fm.month} ${ordinal(parseInt(fm.day))}, ${fm.year}`;
  return (
    <Layout>
      <h1>{fm.title}</h1>
      <p>Posted {date} by Zack Spencer</p>
      <p
        css={css`
          font-style: italic;
        `}
      >
        {fm.lead}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
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
