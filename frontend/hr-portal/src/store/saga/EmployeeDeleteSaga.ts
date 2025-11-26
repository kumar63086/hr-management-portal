import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import { DeleteEmployee } from "../../utils/Api";

// Action payload interface
interface DeleteEmployeeAction {
  type: typeof actions.DELETE_EMPLOYEE_START;
  payload: string; // employee ID
}

// Worker saga
export function* handleDeleteEmployee(action: DeleteEmployeeAction) {
  try {
    // Call the API
    yield call(DeleteEmployee, action.payload);

    // Dispatch success
    yield put({
      type: actions.DELETE_EMPLOYEE_SUCCEEDED,
      payload: { id: action.payload },
    });
  } catch (error: any) {
    yield put({
      type: actions.DELETE_EMPLOYEE_FAILED,
      error: error.message || "Failed to delete employee",
    });
  }
}

// Watcher saga
export function* watchDeleteEmployee() {
  yield takeLatest(actions.DELETE_EMPLOYEE_START, handleDeleteEmployee);
}
