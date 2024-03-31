import { call, put, takeLatest } from "redux-saga/effects";
import { statusCode } from "utils";
import {
  ADD_LEADER_REQUEST,
  DELETE_LEADER_REQUEST,
  GET_LEADER_LIST_REQUEST,
  UPDATE_LEADER_REQUEST,
  addLeaderFAIL,
  addLeaderSuccess,
  deleteLeaderFAIL,
  deleteLeaderSuccess,
  getLeadersFAIL,
  getLeadersSuccess,
  updateLeaderFAIL,
  updateLeaderSuccess,
} from "../actions/LeaderActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import {
  getLeaders,
  addLeader,
  deleteLeader,
  updateLeader,
} from "../services/leaderServices";
function* getLeadersSaga(action) {
  try {
    const response = yield call(getLeaders());
    const { data, totalElements, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getLeadersSuccess({ data, totalElements }));
    } else {
      yield put(getLeadersFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* addLeaderSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addLeader(payload));
    const { data, code, message } = response?.data;

    if (code === statusCode.SUCCESS) {
      yield put(addLeaderSuccess(data));
      toast.success("Thêm thành công");
    } else {
      yield put(addLeaderFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updateLeaderSaga(action) {
  try {
    const { id, ...payload } = action.payload;

    const response = yield call(updateLeader(id, payload));

    const { code, message, data } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(updateLeaderSuccess(data));
      toast.success("Cập nhật thành công");
    } else {
      yield put(updateLeaderFAIL(message));

      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteLeaderSaga(action) {
  try {
    const { id } = action;
    const response = yield call(deleteLeader(id));
    const { message, code } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(deleteLeaderSuccess(id));
      toast.success("Xóa thành công");
    } else {
      yield put(deleteLeaderFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* leaderSaga() {
  yield takeLatest(GET_LEADER_LIST_REQUEST, getLeadersSaga);
  yield takeLatest(ADD_LEADER_REQUEST, addLeaderSaga);
  yield takeLatest(UPDATE_LEADER_REQUEST, updateLeaderSaga);
  yield takeLatest(DELETE_LEADER_REQUEST, deleteLeaderSaga);
}
