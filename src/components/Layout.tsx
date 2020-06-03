import React from 'react';
import { Global, css } from '@emotion/core';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import { rhythm } from '../utils/typography';

import Header from './Header';

import { SiteTitleQuery } from '../../types/graphql-type';

// Let's guarantee Amplify is configured on every page
import Amplify from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

export const Layout: React.FC = ({ children }) => {
  const data: SiteTitleQuery = useStaticQuery(graphql`
    query SiteTitle {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);
  const { title, description, author } = data.site?.siteMetadata ?? {};
  return (
    <>
      <Helmet
        title={title ?? ''}
        meta={[
          {
            name: 'description',
            content: description ?? '',
          },
          { name: 'keywords', content: 'sample, something' },
          { name: 'author', content: author ?? '' },
        ]}
      >
        <html lang="en" />
      </Helmet>
      <Global
        styles={css`
          .grvsc-code {
            font-size: 0.75rem;
            line-height: 1.3rem;
          }
        `}
      />
      <div
        css={css`
          margin: 0 auto;
          max-width: 650px;
          padding: ${rhythm(1)};
          padding-top: ${rhythm(0.5)};
        `}
      >
        <Header siteTitle={title ?? ''} />
        {children}
      </div>
    </>
  );
};
