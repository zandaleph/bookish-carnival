import React from 'react';
import { navigate } from '@reach/router';
import { isLoggedIn } from '../utils/auth';

export default function PrivateRoute(props) {
  const { component: Component, location, ...rest } = props;
  if (!isLoggedIn()) {
    navigate(`/`);
    return null;
  }
  return <Component {...rest} />;
}
