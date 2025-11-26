import * as actions from "../actions/actionTypes";

interface RegistrationState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  loading: false,
  success: false,
  error: null,
};

export default function RegistrationReducer(state = initialState, action: any): RegistrationState {
  switch (action.type) {
    case actions.REGISTER_USER_START:
      return { ...state, loading: true, success: false, error: null };
    case actions.REGISTER_USER_SUCCEEDED:
      return { ...state, loading: false, success: true, error: null };
    case actions.REGISTER_USER_FAILED:
      return { ...state, loading: false, success: false, error: action.error };
    default:
      return state;
  }
}
