import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import Helmet from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';

import Header from './Header';

interface LayoutData {
  site: {
    siteMetadata: {
      title: string;
      description: string;
      author: string;
    };
  };
}

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const data: LayoutData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);
  return (
    <>
      <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          {
            name: 'description',
            content: data.site.siteMetadata.description,
          },
          { name: 'keywords', content: 'sample, something' },
          { name: 'author', content: data.site.siteMetadata.author },
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
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
