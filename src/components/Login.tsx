import React, { useState, CSSProperties } from 'react';
import { navigate } from '@reach/router';
import { setUser, isLoggedIn } from '../utils/auth';
import Error from './Error';
import type { CognitoUser } from 'amazon-cognito-identity-js';

interface Props {
  path: string;
}

export const Login: React.FC<Props> = (_props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const login = async () => {
    const { Auth } = await import('aws-amplify');
    try {
      await Auth.signIn(username, password);
      const user = (await Auth.currentAuthenticatedUser()) as CognitoUser;
      const userInfo = {
        ...user.attributes,
        username: user.username,
      };
      setUser(userInfo);
      void navigate('/backend/home');
    } catch (err) {
      setError(err);
      console.log('error...: ', err); // tslint:disable-line:no-console
    }
  };

  if (isLoggedIn()) void navigate('/backend/profile');
  return (
    <div>
      <h1>Sign In</h1>
      {error != null && <Error errorMessage={error} />}
      <div style={styles.formContainer}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          name="username"
          value={username}
          style={styles.input}
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          name="password"
          value={password}
          type="password"
          style={styles.input}
        />
        <div style={styles.button} onClick={login}>
          <span style={styles.buttonText}>Sign In</span>
        </div>
      </div>
      <br />
    </div>
  );
};

const styles: Record<string, CSSProperties> = {
  input: {
    height: 40,
    margin: '10px 0px',
    padding: 7,
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    backgroundColor: 'rebeccapurple',
    padding: '15px 7px',
    cursor: 'pointer',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
  },
};
