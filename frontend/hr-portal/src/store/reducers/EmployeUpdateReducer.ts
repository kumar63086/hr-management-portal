import * as actions from "../actions/actionTypes";
import type { Employee } from "../../utils/Api";

export interface EmployeeUpdateState {
  loading: boolean;
  employee: Employee | null;
  error: string | null;
  success: boolean;
}

const initialState: EmployeeUpdateState = {
  loading: false,
  employee: null,
  error: null,
  success: false,
};

type Action =
  | { type: typeof actions.UPDATE_EMPLOYEE_START }
  | { type: typeof actions.UPDATE_EMPLOYEE_SUCCEEDED; payload: Employee }
  | { type: typeof actions.UPDATE_EMPLOYEE_FAILED; error: string };

export const EmployeeUpdateReducer = (
  state = initialState,
  action: Action
): EmployeeUpdateState => {
  switch (action.type) {
    case actions.UPDATE_EMPLOYEE_START:
      return { ...state, loading: true, success: false, error: null };
    case actions.UPDATE_EMPLOYEE_SUCCEEDED:
      return { ...state, loading: false, success: true, employee: action.payload };
    case actions.UPDATE_EMPLOYEE_FAILED:
      return { ...state, loading: false, success: false, error: action.error };
    default:
      return state;
  }
};
