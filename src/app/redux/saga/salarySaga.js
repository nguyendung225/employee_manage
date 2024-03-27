import { call, put, takeLatest } from "redux-saga/effects";
import { statusCode } from "utils";
import {
  ADD_SALARY_BY_EMPLOYEE_REQUEST,
  DELETE_SALARY_BY_EMPLOYEE_REQUEST,
  GET_SALARY_LIST_BY_EMPLOYEE_REQUEST,
  GET_SALARY_LIST_BY_LEADER_REQUEST,
  UPDATE_SALARY_BY_EMPLOYEE_REQUEST,
  addSalaryByEmployeeFail,
  addSalaryByEmployeeSuccess,
  deleteSalaryByEmployeeFail,
  deleteSalaryByEmployeeSuccess,
  getSalaryListByEmployeeFail,
  getSalaryListByEmployeeSuccess,
  getSalaryListByLeaderFail,
  getSalaryListByLeaderSuccess,
  updateSalaryByEmployeeFail,
  updateSalaryByEmployeeSuccess,
} from "../actions/SalaryActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import {
  getSalaryListByEmployee,
  addSalaryByEmployee,
  deleteSalaryByEmployee,
  updateSalaryByEmployee,
  getSalaryListByLeader,
} from "../services/salaryServices";
function* getSalaryListByEmployeeSaga(action) {
 
  try {
    const { id } = action;
    const response = yield call(getSalaryListByEmployee(id));
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getSalaryListByEmployeeSuccess(data));
    } else {
      yield put(getSalaryListByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* getSalaryListLeaderSaga() {
  try {
    const response = yield call(getSalaryListByLeader());
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getSalaryListByLeaderSuccess(data));
    } else {
      yield put(getSalaryListByLeaderFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* addSalaryByEmployeeSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addSalaryByEmployee(payload));
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(addSalaryByEmployeeSuccess(data));
      toast.success("Thêm thành công");
    } else {
      yield put(addSalaryByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updateSalaryByEmployeeSaga(action) {
  try {
    const { id, ...payload } = action.payload;
    const response = yield call(updateSalaryByEmployee(id, payload));
    const { code, message, data } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(updateSalaryByEmployeeSuccess(data));
      toast.success("Cập nhật thành công");
    } else {
      yield put(updateSalaryByEmployeeFail(message));

      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteSalaryByEmployeeSaga(action) {
  try {
    const { id } = action;
    const response = yield call(deleteSalaryByEmployee(id));
    const { message, code } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(deleteSalaryByEmployeeSuccess(id));
      toast.success("Xóa thành công");
    } else {
      yield put(deleteSalaryByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* salarySaga() {
  yield takeLatest(
    GET_SALARY_LIST_BY_EMPLOYEE_REQUEST,
    getSalaryListByEmployeeSaga
  );
  yield takeLatest(GET_SALARY_LIST_BY_LEADER_REQUEST, getSalaryListLeaderSaga);
  yield takeLatest(ADD_SALARY_BY_EMPLOYEE_REQUEST, addSalaryByEmployeeSaga);
  yield takeLatest(
    UPDATE_SALARY_BY_EMPLOYEE_REQUEST,
    updateSalaryByEmployeeSaga
  );
  yield takeLatest(
    DELETE_SALARY_BY_EMPLOYEE_REQUEST,
    deleteSalaryByEmployeeSaga
  );
}
