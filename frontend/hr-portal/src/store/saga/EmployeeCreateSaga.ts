import { takeEvery, call, put } from "redux-saga/effects";
import {
  CREATE_EMPLOYEE_REQUEST,
  createEmployeeSuccess,
  createEmployeeFailure,
} from "../actions/EmployeeCreateaction";

import { createEmployees } from "../../utils/Api";  // <-- your real API


// --- Worker Saga ---
export function* createEmployeeSaga(action: any): any {
  try {
    const payload = action.payload;

    // Call the actual backend API
    const response = yield call(createEmployees, payload);

    // ⬇️ If your backend returns something like:
    // { status: true, message: "created", data: { ...employee } }

    const employee = response?.data?.data ?? response?.data;

    yield put(createEmployeeSuccess(employee));
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "Failed to create employee";

    yield put(createEmployeeFailure(errorMessage));
  }
}


// --- Watcher Saga ---
export function* watchCreateEmployee() {
  yield takeEvery(CREATE_EMPLOYEE_REQUEST, createEmployeeSaga);
}
