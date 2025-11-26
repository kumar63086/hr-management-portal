// actions/EmployeeCreateaction.ts

export const CREATE_EMPLOYEE_REQUEST = 'CREATE_EMPLOYEE_REQUEST';
export const CREATE_EMPLOYEE_SUCCESS = 'CREATE_EMPLOYEE_SUCCESS';
export const CREATE_EMPLOYEE_FAILURE = 'CREATE_EMPLOYEE_FAILURE';

// Action to trigger the employee creation request
export const createEmployeeRequest = (employeeData: any) => ({
  type: CREATE_EMPLOYEE_REQUEST,
  payload: employeeData,
});

// Action to handle the success case
export const createEmployeeSuccess = (employee: any) => ({
  type: CREATE_EMPLOYEE_SUCCESS,
  payload: employee,
});

// Action to handle the failure case
export const createEmployeeFailure = (error: string) => ({
  type: CREATE_EMPLOYEE_FAILURE,
  payload: error,
});
