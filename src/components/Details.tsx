import React from 'react';
import { Link } from 'gatsby';
import { getCurrentUser } from '../utils/auth';
import usePrivateRoute from '../utils/usePrivateRoute';

interface Props {
  path: string;
}

export default function Details(props: Props) {
  usePrivateRoute();
  const user = getCurrentUser();
  console.log('user:', user); // tslint:disable-line:no-console
  return (
    <div>
      <h1>Profile Details</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone_number}</p>
      <p>Username: {user.username}</p>
      <Link to="/backend/home">Home</Link>
    </div>
  );
}
