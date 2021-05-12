import React from "react";

import { Link, graphql, useStaticQuery } from "gatsby";

const IndexPage: React.FC = () => {
  const data = useStaticQuery<GatsbyTypes.MyQueryQuery>(graphql`
    query MyQuery {
      allSitePage {
        nodes {
          id
          path
        }
        totalCount
      }
    }
  `);
  const nodes = data?.allSitePage?.nodes ?? [];
  return (
    <>
      <h1>A Website</h1>
      <ul>
        {nodes.map(({ id, path }) => (
          <li key={id}>
            <Link to={path}>{id}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default IndexPage;
