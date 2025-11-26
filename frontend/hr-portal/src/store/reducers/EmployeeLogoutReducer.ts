import * as actions from "../actions/actionTypes";

interface LogoutState {
  loading: boolean;
  isLoggedOut: boolean;
  error: string | null;
}

const initialState: LogoutState = {
  loading: false,
  isLoggedOut: false,
  error: null,
};

const employeeLogoutReducer = (state = initialState, action: any): LogoutState => {
  switch (action.type) {
    case actions.LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoggedOut: true,
        error: null,
      };

    case actions.LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default employeeLogoutReducer;
