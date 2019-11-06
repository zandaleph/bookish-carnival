import React from 'react';

import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';

import Amplify from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

export default function IndexPage({ data }) {
  return (
    <Layout>
      <h1>A Website</h1>
      <p>
        Welcome to Altmeta.org. I&apos;d invite you to sit and stay for a while,
        but there&apos;s nowhere to sit. Instead, all I can offer you is my
        riveting weblog entries.
      </p>
      <ul>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
