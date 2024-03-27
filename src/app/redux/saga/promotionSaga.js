import { call, put, takeLatest } from "redux-saga/effects";
import { statusCode } from "utils";
import {
  ADD_PROMOTION_BY_EMPLOYEE_REQUEST,
  DELETE_PROMOTION_BY_EMPLOYEE_REQUEST,
  GET_PROMOTION_LIST_BY_EMPLOYEE_REQUEST,
  GET_PROMOTION_LIST_BY_LEADER_REQUEST,
  UPDATE_PROMOTION_BY_EMPLOYEE_REQUEST,
  addPromotionByEmployeeFail,
  addPromotionByEmployeeSuccess,
  deletePromotionByEmployeeFail,
  deletePromotionByEmployeeSuccess,
  getPromotionListByEmployeeFail,
  getPromotionListByEmployeeSuccess,
  getPromotionListByLeaderFail,
  getPromotionListByLeaderSuccess,
  updatePromotionByEmployeeFail,
  updatePromotionByEmployeeSuccess,
} from "../actions/PromotionActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import {
  getPromotionListByEmployee,
  addPromotionByEmployee,
  deletePromotionByEmployee,
  updatePromotionByEmployee,
  getPromotionListByLeader,
} from "../services/promotionServices";
function* getPromotionListByEmployeeSaga(action) {
  try {
    const { id } = action;
    const response = yield call(getPromotionListByEmployee(id));
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getPromotionListByEmployeeSuccess(data));
    } else {
      yield put(getPromotionListByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* getPromotionListByLeaderSaga() {
  try {
    const response = yield call(getPromotionListByLeader());
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getPromotionListByLeaderSuccess(data));
    } else {
      yield put(getPromotionListByLeaderFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* addPromotionByEmployeeSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addPromotionByEmployee(payload));
    const { data, code, message } = response?.data;

    if (code === statusCode.SUCCESS) {
      yield put(addPromotionByEmployeeSuccess(data));
      toast.success("Thêm thành công");
    } else {
      yield put(addPromotionByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updatePromotionByEmployeeSaga(action) {
  try {
    const { id, ...payload } = action.payload;

    const response = yield call(updatePromotionByEmployee(id, payload));

    const { code, message, data } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(updatePromotionByEmployeeSuccess(data));
      toast.success("Cập nhật thành công");
    } else {
      yield put(updatePromotionByEmployeeFail(message));

      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deletePromotionByEmployeeSaga(action) {
  try {
    const { id } = action;
    const response = yield call(deletePromotionByEmployee(id));
    const { message, code } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(deletePromotionByEmployeeSuccess(id));
      toast.success("Xóa thành công");
    } else {
      yield put(deletePromotionByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* promotionSaga() {
  yield takeLatest(
    GET_PROMOTION_LIST_BY_EMPLOYEE_REQUEST,
    getPromotionListByEmployeeSaga
  );
  yield takeLatest(
    GET_PROMOTION_LIST_BY_LEADER_REQUEST,
    getPromotionListByLeaderSaga
  );
  yield takeLatest(ADD_PROMOTION_BY_EMPLOYEE_REQUEST, addPromotionByEmployeeSaga);
  yield takeLatest(
    UPDATE_PROMOTION_BY_EMPLOYEE_REQUEST,
    updatePromotionByEmployeeSaga
  );
  yield takeLatest(
    DELETE_PROMOTION_BY_EMPLOYEE_REQUEST,
    deletePromotionByEmployeeSaga
  );
}
