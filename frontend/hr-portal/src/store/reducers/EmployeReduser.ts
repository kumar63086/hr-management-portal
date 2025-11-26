import * as actions from "../actions/actionTypes";
import type  {
  Employee,
  FetchEmployeesSuccessPayload,
} from "../actions/Employeeaction";

export interface EmployeesState {
  loading: boolean;
  error: string | null;
  data: Employee[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalRecords: number;
  };
}

const initialState: EmployeesState = {
  loading: false,
  error: null,
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0,
    totalRecords: 0,
  },
};

export const employeeReducer = (
  state = initialState,
  action: any
): EmployeesState => {
  switch (action.type) {
    case actions.FETCH_EMPLOYEES_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.FETCH_EMPLOYEES_SUCCEEDED:
      const payload = action.payload as FetchEmployeesSuccessPayload;
      return {
        ...state,
        loading: false,
        data: payload.data,
        pagination: payload.pagination,
      };

    case actions.FETCH_EMPLOYEES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
