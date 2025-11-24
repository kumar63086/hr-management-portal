import { call, put } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import {registerUser } from "../../utils/Api"; // <-- your API call

// action is of type { type: REGISTER_USER_START, payload: RegisterPayload }
export function* RegistrationSaga(action: any) {
  try {
    // Call backend API
    const response = yield call(registerUser, action.payload);

    // Dispatch success with payload
    yield put({
      type: actions.REGISTER_USER_SUCCEEDED,
      payload: response.data.user, // <-- use payload, not user
    });
  } catch (error: any) {
    console.error("Registration failed:", error);
    yield put({
      type: actions.REGISTER_USER_FAILED,
      error: error.message,
    });
  }
}
