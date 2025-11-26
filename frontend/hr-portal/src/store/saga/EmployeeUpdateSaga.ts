import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import type { Employee, EmployeePayload } from "../../utils/Api";
import { EditEmployeeDetails } from "../../utils/Api";

// Action payload interface
interface UpdateEmployeeAction {
  type: typeof actions.UPDATE_EMPLOYEE_START;
  payload: {
    id: string;
    data: EmployeePayload;
  };
}

// Worker saga
export function* handleUpdateEmployee(action: UpdateEmployeeAction) {
  try {
    // Call the API
    const response: { data: Employee } = yield call(
      EditEmployeeDetails,
      action.payload.id,
      action.payload.data
    );

    // Dispatch success with updated employee data
    yield put({
      type: actions.UPDATE_EMPLOYEE_SUCCEEDED,
      payload: response.data,
    });
  } catch (error: any) {
    // Dispatch failure
    yield put({
      type: actions.UPDATE_EMPLOYEE_FAILED,
      error: error.message || "Failed to update employee",
    });
  }
}

// Watcher saga
export function* watchUpdateEmployee() {
  yield takeLatest(actions.UPDATE_EMPLOYEE_START, handleUpdateEmployee);
}
