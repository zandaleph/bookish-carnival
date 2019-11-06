import React from 'react';

import Layout from '../components/Layout';

import Amplify from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

export default function IndexPage() {
  return (
    <Layout>
      <h1>A Website</h1>
      <p>
        Welcome to Altmeta.org. I&apos;d invite you to sit and stay for a while,
        but there&apos;s nowhere to sit. Instead, all I can offer you is my
        riveting weblog entries.
      </p>
      <ul>
        <li>
          <a>Placeholder</a>
        </li>
      </ul>
    </Layout>
  );
}
