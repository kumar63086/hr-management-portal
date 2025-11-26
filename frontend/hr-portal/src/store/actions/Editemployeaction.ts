import * as actions from "../actions/actionTypes";


// Action creator: start login
export const EditEmployee = (payload: LoginPayload) => ({
  type: actions.UPDATE_EMPLOYEE_START as typeof actions.UPDATE_EMPLOYEE_START,
  payload,
});

// Action creator: login succeeded
export const EditEmployeeSuccess = (payload: LoginSuccessPayload) => ({
  type: actions.UPDATE_EMPLOYEE_SUCCEEDED as typeof actions.UPDATE_EMPLOYEE_SUCCEEDED,
  payload,
});

// Action creator: login failed
export const EditEmployeError = (error: string) => ({
  type: actions.UPDATE_EMPLOYEE_FAILED as typeof actions.UPDATE_EMPLOYEE_FAILED,
  error,
});