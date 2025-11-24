import * as actions from "../actions/actionTypes";

// Define a proper interface for the registration state
interface RegistrationState {
  user: Record<string, any> | null;
  error: string | null;
}

// Optionally, define action type for type safety
interface Action {
  type: string;
  payload?: any;
  error?: string;
}

// Initial state
const initialState: RegistrationState = {
  user: null,
  error: null,
};

// Registration reducer
const RegistrationReducer = (
  state = initialState,
  action: Action
): RegistrationState => {
  switch (action.type) {
    case actions.REGISTER_USER_SUCCEEDED: {
      console.log("Registration succeeded:", action.payload);
      return {
        ...state,
        user: action.payload,
        error: null, // clear any previous error
      };
    }

    case actions.REGISTER_USER_FAILED: {
      console.error("Registration failed:", action.error);
      return {
        ...state,
        error: action.error || "Registration failed", // fallback message
      };
    }

    default:
      return state;
  }
};

export default RegistrationReducer;
