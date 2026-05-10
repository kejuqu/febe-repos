// api/types/user.ts
export type UserInfo = {
  id: number;
  name: string;
  email: string;
};

export type LoginParams = {
  username: string;
  password: string;
};
