import React from 'react';

import Layout from '../components/Layout';

import Amplify from 'aws-amplify';
import config from '../aws-exports';
Amplify.configure(config);

export default function IndexPage() {
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>
        Welcome to your new Gatsby site with multi-user authentication powered
        by <a href="https://amplify.aws">AWS Amplify</a>
      </p>
      <br />
    </Layout>
  );
}
