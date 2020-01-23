import React from 'react';

import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';

import { BlogIndexQuery } from '../../types/graphql-type';

interface Props {
  data: BlogIndexQuery;
}

export default function IndexPage({ data }: Props) {
  const edges = data?.allMdx?.edges ?? [];
  return (
    <Layout>
      <h1>A Website</h1>
      <p>
        Welcome to Altmeta.org. I&apos;d invite you to sit and stay for a while,
        but there&apos;s nowhere to sit. Instead, all I can offer you is my
        riveting weblog entries.
      </p>
      <ul>
        {edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.fields?.slug ?? ''}>{node.frontmatter?.title}</Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const query = graphql`
  query BlogIndex {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
