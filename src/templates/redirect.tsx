import { useEffect } from 'react';
import { navigate } from 'gatsby';

interface Props {
  pageContext: {
    slug: string;
  };
}

export default function Redirect({ pageContext }: Props) {
  useEffect(() => {
    navigate(pageContext.slug, { replace: true });
  });
  return null;
}
