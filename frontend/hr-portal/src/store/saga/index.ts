import { all, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import { RegistrationSaga } from "./Registrationsaga";
import {loginSaga} from "./loginSaga"
import {fetchEmployeesSaga} from './Employeesaga'
import { createEmployeeSaga} from "./EmployeeCreateSaga";
import { handleUpdateEmployee } from "./EmployeeUpdateSaga";
import { handleDeleteEmployee } from "./EmployeeDeleteSaga";
import { handleViewEmployee } from "./EmployeeViewSaga";
import { employeeLogoutSaga } from "./EmployeeLogoutSaga";
// Root saga combines all watchers
export function* rootSaga() {
  yield all([
    takeEvery(actions.REGISTER_USER_START, RegistrationSaga),
    takeEvery(actions.LOGIN_START,loginSaga),
    takeEvery(actions.FETCH_EMPLOYEES_START,fetchEmployeesSaga),
    takeEvery(actions.CREATE_EMPLOYEE_REQUEST, createEmployeeSaga),
    takeEvery(actions.UPDATE_EMPLOYEE_START, handleUpdateEmployee),
     takeEvery(actions.DELETE_EMPLOYEE_START, handleDeleteEmployee),
     takeEvery(actions.VIEWS_EMPLOYEE_START, handleViewEmployee),
      takeEvery(actions.LOGOUT_REQUEST , employeeLogoutSaga),
     
  ]);
}
