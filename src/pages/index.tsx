import React from 'react';

import { Link, graphql } from 'gatsby';

import { Layout } from '../components/Layout';

import { BlogIndexQuery } from '../../types/graphql-type';

interface Props {
  data: BlogIndexQuery;
}

const IndexPage: React.FC<Props> = ({ data }) => {
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
      <p>
        Hey, uh... you&apos;re still here! Wonderful. Well, I&apos;m
        experimenting with what I&apos;m calling &quot;feature&quot; articles,
        where content might be a little more connected than blog posts. To start
        with, I&apos;ve got some writing on{' '}
        <Link to="/features/learn-code/getting-started/">
          the first steps of coding
        </Link>
        .
      </p>
    </Layout>
  );
};

export default IndexPage;

export const query = graphql`
  query BlogIndex {
    allMdx(
      filter: { fileAbsolutePath: { glob: "**/weblog/**" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
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
