import { call, put, takeLatest } from "redux-saga/effects";
import { statusCode } from "utils";
import {
  ADD_EXPERIENCE_REQUEST,
  DELETE_EXPERIENCE_REQUEST,
  GET_EXPERIENCE_LIST_REQUEST,
  UPDATE_EXPERIENCE_REQUEST,
  addExperienceFAIL,
  addExperienceSuccess,
  deleteExperienceFAIL,
  deleteExperienceSuccess,
  getExperiencesFAIL,
  getExperiencesSuccess,
  updateExperienceFAIL,
  updateExperienceSuccess,
} from "../actions/ExperienceActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import {
  getExperiences,
  addExperience,
  deleteExperience,
  updateExperience,
} from "../services/experienceServices";
function* getExperiencesSaga(action) {
  try {
    const { id } = action;
    const response = yield call(getExperiences(id));
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getExperiencesSuccess(data));
    } else {
      yield put(getExperiencesFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* addExperienceSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addExperience(payload));
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(addExperienceSuccess(data));
      toast.success("Thêm thành công");
    } else {
      yield put(addExperienceFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updateExperienceSaga(action) {
  try {
    const { id, ...payload } = action.payload;
    const response = yield call(updateExperience(id, payload));
    const { code, message, data } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(updateExperienceSuccess(data));
      toast.success("Cập nhật thành công");
    } else {
      yield put(updateExperienceFAIL(message));

      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteExperienceSaga(action) {
  try {
    const { id } = action;
    const response = yield call(deleteExperience(id));
    const { message, code } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(deleteExperienceSuccess(id));
      toast.success("Xóa thành công");
    } else {
      yield put(deleteExperienceFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* experienceSaga() {
  yield takeLatest(GET_EXPERIENCE_LIST_REQUEST, getExperiencesSaga);
  yield takeLatest(ADD_EXPERIENCE_REQUEST, addExperienceSaga);
  yield takeLatest(UPDATE_EXPERIENCE_REQUEST, updateExperienceSaga);
  yield takeLatest(DELETE_EXPERIENCE_REQUEST, deleteExperienceSaga);
}
