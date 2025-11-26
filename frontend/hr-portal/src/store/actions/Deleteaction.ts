import * as actions from "../actions/actionTypes";

// Payload for deleting an employee
export interface DeleteEmployeePayload {
  id: string; // Employee ID to delete
}

// Payload for successful deletion response
export interface DeleteEmployeeSuccessPayload {
  id: string; // ID of deleted employee
}

// Action creator: start deleting employee
export const DeleteEmployee = (payload: DeleteEmployeePayload) => ({
  type: actions.DELETE_EMPLOYEE_START as typeof actions.DELETE_EMPLOYEE_START,
  payload,
});

// Action creator: deletion succeeded
export const DeleteEmployeeSuccess = (payload: DeleteEmployeeSuccessPayload) => ({
  type: actions.DELETE_EMPLOYEE_SUCCEEDED as typeof actions.DELETE_EMPLOYEE_SUCCEEDED,
  payload,
});

// Action creator: deletion failed
export const DeleteEmployeeError = (error: string) => ({
  type: actions.DELETE_EMPLOYEE_FAILED as typeof actions.DELETE_EMPLOYEE_FAILED,
  error,
});
