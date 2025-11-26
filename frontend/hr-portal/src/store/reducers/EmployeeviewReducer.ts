import * as actions from "../actions/actionTypes";
import type { ViewEmployeeSuccessPayload } from "../actions/Employeeview";

export interface EmployeeViewState {
  loading: boolean;
  employee: ViewEmployeeSuccessPayload | null;
  error: string | null;
}

const initialState: EmployeeViewState = {
  loading: false,
  employee: null,
  error: null,
};

type Action =
  | { type: typeof actions.VIEWS_EMPLOYEE_START }
  | { type: typeof actions.VIEWS_EMPLOYEE_SUCCEEDED; payload: ViewEmployeeSuccessPayload }
  | { type: typeof actions.VIEWS_EMPLOYEE_FAILED; error: string };

export const EmployeeViewReducer = (
  state = initialState,
  action: Action
): EmployeeViewState => {
  switch (action.type) {
    case actions.VIEWS_EMPLOYEE_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actions.VIEWS_EMPLOYEE_SUCCEEDED:
      return {
        ...state,
        loading: false,
        employee: action.payload,
      };
    case actions.VIEWS_EMPLOYEE_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
