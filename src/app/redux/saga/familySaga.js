import { call, put, takeLatest } from "redux-saga/effects";
import { statusCode } from "utils";
import {
  ADD_FAMILY_REQUEST,
  DELETE_FAMILY_REQUEST,
  GET_FAMILY_LIST_REQUEST,
  UPDATE_FAMILY_REQUEST,
  addFamilyFAIL,
  addFamilySuccess,
  deleteFamilyFAIL,
  deleteFamilySuccess,
  getFamiliesFAIL,
  getFamiliesSuccess,
  updateFamilyFAIL,
  updateFamilySuccess,
} from "../actions/FamilyActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import {
  getFamilies,
  addFamily,
  deleteFamily,
  updateFamily,
} from "../services/familyServices";
function* getFamiliesSaga(action) {
  try {
    const { id } = action;
    const response = yield call(getFamilies(id));
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getFamiliesSuccess(data));
    } else {
      yield put(getFamiliesFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* addFamilySaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addFamily(payload));
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(addFamilySuccess(data));
      toast.success("Thêm thành công");
    } else {
      yield put(addFamilyFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updateFamilySaga(action) {
  try {
    const { id, ...payload } = action.payload;
    const response = yield call(updateFamily(id, payload));
    const { code, message, data } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(updateFamilySuccess(data));
      toast.success("Cập nhật thành công");
    } else {
      yield put(updateFamilyFAIL(message));

      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteFamilySaga(action) {
  try {
    const { id } = action;
    const response = yield call(deleteFamily(id));
    const { message, code } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(deleteFamilySuccess(id));
      toast.success("Xóa thành công");
    } else {
      yield put(deleteFamilyFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* familySaga() {
  yield takeLatest(GET_FAMILY_LIST_REQUEST, getFamiliesSaga);
  yield takeLatest(ADD_FAMILY_REQUEST, addFamilySaga);
  yield takeLatest(UPDATE_FAMILY_REQUEST, updateFamilySaga);
  yield takeLatest(DELETE_FAMILY_REQUEST, deleteFamilySaga);
}
