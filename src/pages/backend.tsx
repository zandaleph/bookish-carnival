import React from 'react';
import { Router } from '@reach/router';
import { Layout } from '../components/Layout';
import { Details } from '../components/Details';
import { Home } from '../components/Home';
import { Login } from '../components/Login';

const Backend: React.FC = () => {
  return (
    <Layout>
      <Router>
        <Home path="/backend/home" />
        <Details path="/backend/profile" />
        <Login path="/backend" />
      </Router>
    </Layout>
  );
};

export default Backend;
