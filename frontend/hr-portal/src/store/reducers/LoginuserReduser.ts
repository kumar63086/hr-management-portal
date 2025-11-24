import * as actions from "../actions/actionTypes";

interface LoginState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const loginReducer = (state = initialState, action: any): LoginState => {
  switch (action.type) {
    case actions.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actions.LOGIN_SUCCEEDED:
      return {
        ...state,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        loading: false,
        error: null,
      };

    case actions.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actions.LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default loginReducer;
