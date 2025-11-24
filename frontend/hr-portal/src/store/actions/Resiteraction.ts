import * as actions from "../actions/actionTypes";

// Payload type for registration
export interface RegisterPayload {
  name: string;
  username: string;
  email: string;
  password: string;
  role: "Admin" | "Editor" | "Viewer";
}

// Action creator: start registration
export const registerUser = (payload: RegisterPayload) => ({
  type: actions.REGISTER_USER_START as typeof actions.REGISTER_USER_START,
  payload,
});

// Action creator: registration succeeded
export const setRegisterDetails = (payload: RegisterPayload) => ({
  type: actions.REGISTER_USER_SUCCEEDED as typeof actions.REGISTER_USER_SUCCEEDED,
  payload,
});

// Action creator: registration failed
export const setRegistrationDetailsError = (error: string) => ({
  type: actions.REGISTER_USER_FAILED as typeof actions.REGISTER_USER_FAILED,
  error,
});
