import React from 'react'
import { Router } from '@reach/router'
import Layout from '../components/layout'
import Details from '../components/Details'
import Home from '../components/Home'
import Login from '../components/Login'
import PrivateRoute from '../components/PrivateRoute'

export default function Backend() {
  return (
    <Layout>
      <Router>
        <PrivateRoute path="/backend/home" component={Home} />
        <PrivateRoute path="/backend/profile" component={Details} />
        <Login path="/backend" />
      </Router>
    </Layout>
  )
}
