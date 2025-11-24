import { call, put } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import { loginApi } from "../../utils/Api";
import type { LoginPayload } from "../actions/loginaction";

export function* loginSaga(action: { type: string; payload: LoginPayload }) {
  try {
    const response = yield call(loginApi, action.payload);

    yield put({
      type: actions.LOGIN_SUCCEEDED,
      payload: {
        user: response.data.user,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      },
    });
  } catch (error: any) {
    yield put({
      type: actions.LOGIN_FAILED,
      error: error?.response?.data?.message || "Login failed",
    });
  }
}
