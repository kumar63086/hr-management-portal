import * as actions from "../actions/actionTypes";

export interface EmployeeDeleteState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: EmployeeDeleteState = {
  loading: false,
  success: false,
  error: null,
};

type Action =
  | { type: typeof actions.DELETE_EMPLOYEE_START }
  | { type: typeof actions.DELETE_EMPLOYEE_SUCCEEDED; payload: { id: string } }
  | { type: typeof actions.DELETE_EMPLOYEE_FAILED; error: string };

export const EmployeeDeleteReducer = (
  state = initialState,
  action: Action
): EmployeeDeleteState => {
  switch (action.type) {
    case actions.DELETE_EMPLOYEE_START:
      return { ...state, loading: true, success: false, error: null };
    case actions.DELETE_EMPLOYEE_SUCCEEDED:
      return { ...state, loading: false, success: true };
    case actions.DELETE_EMPLOYEE_FAILED:
      return { ...state, loading: false, error: action.error, success: false };
    default:
      return state;
  }
};
