import { call, put, takeLatest } from "redux-saga/effects";
import { statusCode } from "utils";
import {
  ADD_CERTIFICATE_REQUEST,
  DELETE_CERTIFICATE_REQUEST,
  GET_CERTIFICATE_LIST_REQUEST,
  UPDATE_CERTIFICATE_REQUEST,
  addCertificateFAIL,
  addCertificateSuccess,
  deleteCertificateFAIL,
  deleteCertificateSuccess,
  getCertificatesFAIL,
  getCertificatesSuccess,
  updateCertificateFAIL,
  updateCertificateSuccess,
} from "../actions/CertificateActions";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { getCertificates ,
  addCertificate,
  deleteCertificate,
  updateCertificate,
} from "../services/certificateServices";
function* getCertificatesSaga(action) {
 
  try {
    const { id } = action;
    const response = yield call(getCertificates(id));
   
    const { data, code, message } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(getCertificatesSuccess(data));
    } else {
      yield put(getCertificatesFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* addCertificateSaga(action) {
  try {
    const { payload } = action;
    const response = yield call(addCertificate(payload));
    
    const { data, code, message } = response?.data;

    if (code === statusCode.SUCCESS) {
      yield put(addCertificateSuccess(data));
      toast.success("Thêm thành công");
    } else {
      yield put(addCertificateFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* updateCertificateSaga(action) {
  try {
    const { id, ...payload } = action.payload;
    const response = yield call(updateCertificate(id, payload));
    const { code, message, data } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(updateCertificateSuccess(data));
      toast.success("Cập nhật thành công");
    } else {
      yield put(updateCertificateFAIL(message));

      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

function* deleteCertificateSaga(action) {
  try {
    const { id } = action;
    const response = yield call(deleteCertificate(id));
    const { message, code } = response?.data;
    if (code === statusCode.SUCCESS) {
      yield put(deleteCertificateSuccess(id));
      toast.success("Xóa thành công");
    } else {
      yield put(deleteCertificateFAIL(message));
      toast.error(message);
    }
  } catch (error) {
    console.error(error);
  }
}

export function* certificateSaga() {
  yield takeLatest(GET_CERTIFICATE_LIST_REQUEST, getCertificatesSaga);
  yield takeLatest(ADD_CERTIFICATE_REQUEST, addCertificateSaga);
  yield takeLatest(UPDATE_CERTIFICATE_REQUEST, updateCertificateSaga);
  yield takeLatest(DELETE_CERTIFICATE_REQUEST, deleteCertificateSaga);
}
