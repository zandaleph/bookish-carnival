import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { rhythm } from '../utils/typography';

import { navigate } from '@reach/router';

import { logout, isLoggedIn } from '../utils/auth';
import { Auth } from 'aws-amplify';

export default function Header({ siteTitle }) {
  return (
    <>
      <Link to="/">
        <h1
          css={css`
            display: inline-block;
            font-style: normal;
          `}
        >
          {siteTitle}
        </h1>
      </Link>
      {isLoggedIn() && (
        <a
          onClick={() =>
            Auth.signOut()
              .then(logout(() => navigate('/backend')))
              .catch(err => console.log('eror:', err))
          }
          css={css`
            margin-top: ${rhythm(1.5)};
            float: right;
          `}
        >
          Sign Out
        </a>
      )}
    </>
  );
}
