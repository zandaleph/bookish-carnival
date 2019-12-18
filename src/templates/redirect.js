import { useEffect } from 'react';
import { navigate } from 'gatsby';

export default function Redirect({ pageContext }) {
  useEffect(() => navigate(pageContext.slug, { replace: true }));
  return null;
}
