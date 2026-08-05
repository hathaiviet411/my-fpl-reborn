export type User = {
  id: string;
  email: string;
  name: string;
};

export type AuthSession = {
  token: string;
  user: User;
};
