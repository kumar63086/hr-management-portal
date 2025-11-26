import * as actions from "../actions/actionTypes";

export const employeeLogoutRequest = () => ({
  type: actions.LOGOUT_REQUEST, // ✅ use LOGOUT_REQUEST, not LOGIN_START
});

export const employeeLogoutSuccess = () => ({
  type: actions.LOGOUT_SUCCESS,
});

export const employeeLogoutFailure = (error: string) => ({
  type: actions.LOGOUT_FAILURE,
  payload: error,
});
