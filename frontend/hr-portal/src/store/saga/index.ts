import { all, takeEvery } from "redux-saga/effects";
import * as actions from "../actions/actionTypes";
import { RegistrationSaga } from "./Registrationsaga";
import {loginSaga} from "./loginSaga"
// Root saga combines all watchers
export function* rootSaga() {
  yield all([
    takeEvery(actions.REGISTER_USER_START, RegistrationSaga),
    takeEvery(actions.LOGIN_START,loginSaga)
  ]);
}
