import React from 'react';
import { Link } from 'gatsby';
import { getCurrentUser } from '../utils/auth';
import usePrivateRoute from '../utils/usePrivateRoute';

interface Props {
  path: string;
}

export const Details: React.FC<Props> = (_props) => {
  usePrivateRoute();
  const user = getCurrentUser();
  console.log('user:', user); // tslint:disable-line:no-console
  if (!user) return null;
  return (
    <div>
      <h1>Profile Details</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone_number}</p>
      <p>Username: {user.username}</p>
      <Link to="/backend/home">Home</Link>
    </div>
  );
};
