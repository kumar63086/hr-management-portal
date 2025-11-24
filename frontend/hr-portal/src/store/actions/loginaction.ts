import * as actions from "../actions/actionTypes";

// Payload type for login request
export interface LoginPayload {
  email: string;
  password: string;
}

// Payload type for login success
export interface LoginSuccessPayload {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

// Action creator: start login
export const loginUser = (payload: LoginPayload) => ({
  type: actions.LOGIN_START as typeof actions.LOGIN_START,
  payload,
});

// Action creator: login succeeded
export const setLoginSuccess = (payload: LoginSuccessPayload) => ({
  type: actions.LOGIN_SUCCEEDED as typeof actions.LOGIN_SUCCEEDED,
  payload,
});

// Action creator: login failed
export const setLoginError = (error: string) => ({
  type: actions.LOGIN_FAILED as typeof actions.LOGIN_FAILED,
  error,
});
