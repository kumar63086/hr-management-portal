

import { call, put } from "redux-saga/effects";

// Import values normally, types using `type`
import {
  fetchEmployees,
  fetchEmployeesSuccess,
  fetchEmployeesError,
  type FetchEmployeesPayload,
} from "../actions/Employeeaction";

import { getAllEmployees } from "../../utils/Api";

// Worker saga: fetch employees
export function* fetchEmployeesSaga(action: ReturnType<typeof fetchEmployees>) {
  try {
    const { page, limit, search, role, isActive } =
      action.payload as FetchEmployeesPayload; // ⭐ FIXED: replaced `active`

    // Correct response type
    const response: Awaited<ReturnType<typeof getAllEmployees>> = yield call(
      getAllEmployees,
      page,
      limit,
      search,
      role,
      isActive // ⭐ FIXED
    );

    yield put(fetchEmployeesSuccess(response.data));
  } catch (error: any) {
    yield put(
      fetchEmployeesError(error.message || "Failed to fetch employees")
    );
  }
}
