import { call, put } from "redux-saga/effects";
import Cookies from "js-cookie";
import { logout } from "../../utils/Api";
import {
  employeeLogoutSuccess,
  employeeLogoutFailure,
} from "../actions/EmployeLogoutactions";

export function* employeeLogoutSaga() {
  try {
    // 1️⃣ Call backend logout API
    yield call(logout);

    // 2️⃣ Clear client cookies
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("employee_data");

    // 3️⃣ Dispatch success to Redux
    yield put(employeeLogoutSuccess());
    navigate ('/')

    // // 4️⃣ Redirect to login page
    // window.location.href = "/";
  } catch (error: any) {
    yield put(employeeLogoutFailure(error?.message || "Logout failed"));
  }
}
