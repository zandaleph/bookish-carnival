import React from 'react';
import { Link } from 'gatsby';
import usePrivateRoute from '../utils/usePrivateRoute';

interface Props {
  path: string;
}

export default function Home(props: Props) {
  const loggedIn = usePrivateRoute();
  if (!loggedIn) {
    return null;
  }
  return (
    <div>
      <h1>Home</h1>
      <p>
        You are now logged in! <Link to="/backend/profile">View profile</Link>
      </p>
      <p>
        Now go build something great and deploy it using the{' '}
        <a href="https://console.amplify.aws">AWS Amplify Console</a>
      </p>
    </div>
  );
}
