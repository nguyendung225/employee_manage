import { call, put, takeLatest } from "redux-saga/effects";
import { statusCode } from "utils";
import {
  ADD_PROPOSAL_BY_EMPLOYEE_REQUEST,
  DELETE_PROPOSAL_BY_EMPLOYEE_REQUEST,
  GET_PROPOSAL_LIST_BY_EMPLOYEE_REQUEST,
  GET_PROPOSAL_LIST_BY_LEADER_REQUEST,
  UPDATE_PROPOSAL_BY_EMPLOYEE_REQUEST,
  addProposalByEmployeeFail,
  addProposalByEmployeeSuccess,
  deleteProposalByEmployeeFail,
  deleteProposalByEmployeeSuccess,
  getProposalListByEmployeeFail,
  getProposalListByEmployeeSuccess,
  getProposalListByLeaderFail,
  getProposalListByLeaderSuccess,
  updateProposalByEmployeeFail,
  updateProposalByEmployeeSuccess,
} from "../actions/ProposalActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import {
  getProposalListByEmployee,
  addProposalByEmployee,
  deleteProposalByEmployee,
  updateProposalByEmployee,
  getProposalListByLeader,
} from "../services/proposalServices";
function* getProposalListByEmployeeSaga(action) {
  try {
    const { id } = action;
    const response = yield call(getProposalListByEmployee(id));
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getProposalListByEmployeeSuccess(data));
    } else {
      yield put(getProposalListByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* getProposalListByLeaderSaga(action) {
  try {
    const response = yield call(getProposalListByLeader());
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getProposalListByLeaderSuccess(data));
    } else {
      yield put(getProposalListByLeaderFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* addProposalByEmployeeSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addProposalByEmployee(payload));
    const { data, code, message } = response?.data;

    if (code === statusCode.SUCCESS) {
      yield put(addProposalByEmployeeSuccess(data));
      toast.success("Thêm thành công");
    } else {
      yield put(addProposalByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updateProposalByEmployeeSaga(action) {
  try {
    const { id, ...payload } = action.payload;
    const response = yield call(updateProposalByEmployee(id, payload));
    const { code, message, data } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(updateProposalByEmployeeSuccess(data));
      toast.success("Cập nhật thành công");
    } else {
      yield put(updateProposalByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteProposalByEmployeeSaga(action) {
  try {
    const { id } = action;
    const response = yield call(deleteProposalByEmployee(id));
    const { message, code } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(deleteProposalByEmployeeSuccess(id));
      toast.success("Xóa thành công");
    } else {
      yield put(deleteProposalByEmployeeFail(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* proposalSaga() {
  yield takeLatest(
    GET_PROPOSAL_LIST_BY_EMPLOYEE_REQUEST,
    getProposalListByEmployeeSaga
  );
  yield takeLatest(
    GET_PROPOSAL_LIST_BY_LEADER_REQUEST,
    getProposalListByLeaderSaga
  );
  yield takeLatest(ADD_PROPOSAL_BY_EMPLOYEE_REQUEST, addProposalByEmployeeSaga);
  yield takeLatest(
    UPDATE_PROPOSAL_BY_EMPLOYEE_REQUEST,
    updateProposalByEmployeeSaga
  );
  yield takeLatest(
    DELETE_PROPOSAL_BY_EMPLOYEE_REQUEST,
    deleteProposalByEmployeeSaga
  );
}
