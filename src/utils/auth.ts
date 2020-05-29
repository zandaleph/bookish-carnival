const isBrowser = typeof window !== `undefined`;

export const setUser = (user: Record<string, unknown>): void =>
  void (window.localStorage.gatsbyUser = JSON.stringify(user));

const getUser = (): Record<string, unknown> => {
  if (window.localStorage.gatsbyUser) {
    const user = JSON.parse(window.localStorage.gatsbyUser) as Record<
      string,
      unknown
    >;
    return user ? user : {};
  }
  return {};
};

export const isLoggedIn = (): boolean => {
  if (!isBrowser) return false;

  const user = getUser();
  if (user) return !!user.username;
  return false;
};

export const getCurrentUser = (): Record<string, unknown> | false =>
  isBrowser && getUser();

export const logout: (callback: () => unknown) => void = (callback) => {
  if (!isBrowser) return;
  setUser({});
  callback();
};
