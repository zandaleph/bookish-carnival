import { navigate } from '@reach/router';
import { isLoggedIn } from '../utils/auth';
import { useEffect } from 'react';

export default function usePrivateRoute(): boolean {
  const shouldStay = isLoggedIn();
  useEffect(() => {
    if (!shouldStay) {
      void navigate('/');
    }
  }, [shouldStay]);
  return shouldStay;
}
