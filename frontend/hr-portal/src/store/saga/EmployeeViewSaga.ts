import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import type { Employee } from "../../utils/Api";
import { viewEmployeeDetails } from "../../utils/Api";

// Action payload interface
interface ViewEmployeeAction {
  type: typeof actions.VIEWS_EMPLOYEE_START;
  payload: string; // employee ID
}

// Worker saga
export function* handleViewEmployee(action: ViewEmployeeAction) {
  try {
    // Call the API to fetch employee by ID
    const employee: Employee = yield call(viewEmployeeDetails, action.payload);

    // Dispatch success with employee data
    yield put({
      type: actions.VIEWS_EMPLOYEE_SUCCEEDED,
      payload: employee,
    });
  } catch (error: any) {
    // Dispatch failure
    yield put({
      type: actions.VIEWS_EMPLOYEE_FAILED,
      error: error.message || "Failed to fetch employee details",
    });
  }
}

// Watcher saga
export function* watchViewEmployee() {
  yield takeLatest(actions.VIEWS_EMPLOYEE_START, handleViewEmployee);
}
