import { call, put, takeLatest } from "redux-saga/effects";
import { statusCode } from "utils";
import {
  ADD_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_REQUEST,
  GET_EMPLOYEE_BY_ID_REQUEST,
  GET_EMPLOYEE_LIST_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
  addEmployeeFail,
  addEmployeeSuccess,
  deleteEmployeeFail,
  deleteEmployeeSuccess,
  getEmployeeByIdFail,
  getEmployeeByIdSuccess,
  getEmployeesFail,
  getEmployeesSuccess,
  updateEmployeeFail,
  updateEmployeeSuccess,
} from "../actions/EmployeeActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployeeById,
} from "../services/employeeServices";
function* getEmployeesSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(getEmployees(payload));

    const { data, totalElements, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getEmployeesSuccess({ data, totalElements }));
    } else {
      yield put(getEmployeesFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* getEmployeeByIdSaga(action) {
  try {
    const { id } = action;
    const response = yield call(getEmployeeById(id));

    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getEmployeeByIdSuccess(data));
    } else {
      yield put(getEmployeeByIdFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* addEmployeeSaga(action) {
  try {
    const { payload } = action;

    const response = yield call(addEmployee(payload));
    const { data, code, message } = response?.data;

    if (code === statusCode.SUCCESS) {
      yield put(addEmployeeSuccess(data));
      toast.success("Thêm thành công");
    } else {
      yield put(addEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updateEmployeeSaga(action) {
  try {
    const { id, ...payload } = action.payload;

    const response = yield call(updateEmployee(id, payload));

    const { code, message, data } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(updateEmployeeSuccess(data));
      toast.success("Cập nhật thành công");
    } else {
      yield put(updateEmployeeFail(message));

      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteEmployeeSaga(action) {
  try {
    const { id } = action;
    const response = yield call(deleteEmployee(id));
    const { message, code } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(deleteEmployeeSuccess(id));
      toast.success("Xóa thành công");
    } else {
      yield put(deleteEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* employeeSaga() {
  yield takeLatest(GET_EMPLOYEE_LIST_REQUEST, getEmployeesSaga);
  yield takeLatest(GET_EMPLOYEE_BY_ID_REQUEST, getEmployeeByIdSaga);
  yield takeLatest(ADD_EMPLOYEE_REQUEST, addEmployeeSaga);
  yield takeLatest(UPDATE_EMPLOYEE_REQUEST, updateEmployeeSaga);
  yield takeLatest(DELETE_EMPLOYEE_REQUEST, deleteEmployeeSaga);
}
