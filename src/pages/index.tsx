import React from 'react';

import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';

interface Query {
  allMdx: {
    totalCount: number;
    edges: {
      node: {
        id: string;
        frontmatter: {
          title: string;
        };
        fields: {
          slug: string;
        };
      };
    }[];
  };
}

interface Props {
  data: Query;
}

export default function IndexPage({ data }: Props) {
  return (
    <Layout>
      <h1>A Website</h1>
      <p>
        Welcome to Altmeta.org. I&apos;d invite you to sit and stay for a while,
        but there&apos;s nowhere to sit. Instead, all I can offer you is my
        riveting weblog entries.
      </p>
      <ul>
        {data.allMdx.edges.map(({ node }) => (
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
