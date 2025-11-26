
import {
  CREATE_EMPLOYEE_REQUEST,
  CREATE_EMPLOYEE_SUCCESS,
  CREATE_EMPLOYEE_FAILURE,
} from '../actions/EmployeeCreateaction';

const initialState = {
  employee: null,
  loading: false,
  error: null,
};

  const EmployeeCreateReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CREATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        employee: action.payload,
      };
    case CREATE_EMPLOYEE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default EmployeeCreateReducer;
