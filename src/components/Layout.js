import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';

import Header from './Header';

export default function Layout({ children }) {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Sample' },
              { name: 'keywords', content: 'sample, something' },
            ]}
          >
            <html lang="en" />
          </Helmet>
          <div
            css={css`
              margin: 0 auto;
              max-width: 700px;
              padding: ${rhythm(2)};
              padding-top: ${rhythm(1.5)};
            `}
          >
            <Header siteTitle={data.site.siteMetadata.title} />
            {children}
          </div>
        </>
      )}
    />
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
