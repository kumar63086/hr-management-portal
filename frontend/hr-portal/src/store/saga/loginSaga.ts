import Cookies from "js-cookie";
import { call, put } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import { loginApi } from "../../utils/Api";

export function* loginSaga(action: any) {
  try {
    const response = yield call(loginApi, action.payload);

    const { user, accessToken, refreshToken } = response.data;

    // ✔ Save access token in cookies
    Cookies.set("accessToken", accessToken, {
      expires: 1,   // 1 day
      secure: false,
    });

    yield put({
      type: actions.LOGIN_SUCCEEDED,
      payload: { user, accessToken, refreshToken },
    });
  } catch (error: any) {
    yield put({
      type: actions.LOGIN_FAILED,
      error: error?.response?.data?.message || "Login failed",
    });
  }
}
