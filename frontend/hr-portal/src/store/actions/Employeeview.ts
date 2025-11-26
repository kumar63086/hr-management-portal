import * as actions from "../actions/actionTypes";

// Payload to view an employee
export interface ViewEmployeePayload {
  id: string; // Employee ID
}

// Payload for successful response
export interface ViewEmployeeSuccessPayload {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer" | "Developer";
  isActive: boolean;
  skills: string[];
  availableSlots: string[];
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  company: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

// Action creator: start viewing employee
export const ViewEmployee = (payload: ViewEmployeePayload) => ({
  type: actions.VIEWS_EMPLOYEE_START as typeof actions.VIEWS_EMPLOYEE_START,
  payload,
});

// Action creator: view succeeded
export const ViewEmployeeSuccess = (payload: ViewEmployeeSuccessPayload) => ({
  type: actions.VIEWS_EMPLOYEE_SUCCEEDED as typeof actions.VIEWS_EMPLOYEE_SUCCEEDED,
  payload,
});

// Action creator: view failed
export const ViewEmployeeError = (error: string) => ({
  type: actions.VIEWS_EMPLOYEE_FAILED as typeof actions.VIEWS_EMPLOYEE_FAILED,
  error,
});
