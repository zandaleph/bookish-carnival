import React from 'react';
import { Link } from 'gatsby';
import { css } from '@emotion/core';
import { rhythm } from '../utils/typography';

import { navigate } from '@reach/router';

import { logout, isLoggedIn } from '../utils/auth';

interface Props {
  siteTitle: string;
}

const Header: React.FC<Props> = ({ siteTitle }) => {
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
          onClick={async () => {
            const { Auth } = await import('aws-amplify');

            Auth.signOut()
              .then(() => logout(() => navigate('/backend')))
              // tslint:disable-next-line:no-console
              .catch((err: string) => console.log('eror:', err));
          }}
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
};

export default Header;
