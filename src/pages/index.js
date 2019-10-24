import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

const IndexPage = () => (
  <Layout>
    <h1>Hi people</h1>
    <p>
      Welcome to your new Gatsby site with multi-user authentication powered by{' '}
      <a href="https://amplify.aws">AWS Amplify</a>
    </p>
    <br />
  </Layout>
)

export default IndexPage
