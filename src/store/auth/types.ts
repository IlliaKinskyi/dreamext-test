export type TUser = {
  username: string;
  password: string;
};

export enum authStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export type TAuthState = {
  token: string;
  isAuth: boolean;
  status: authStatus;
};
