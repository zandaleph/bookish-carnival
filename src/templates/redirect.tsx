import React, { useEffect } from 'react';
import { navigate } from 'gatsby';

interface Props {
  pageContext: {
    slug: string;
  };
}

const Redirect: React.FC<Props> = ({ pageContext }) => {
  useEffect(() => {
    void navigate(pageContext.slug, { replace: true });
  });
  return null;
};

export default Redirect;
