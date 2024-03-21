import {
  ADD_CERTIFICATE_FAIL,
  ADD_CERTIFICATE_REQUEST,
  ADD_CERTIFICATE_SUCCESS,
  DELETE_CERTIFICATE_FAIL,
  DELETE_CERTIFICATE_REQUEST,
  DELETE_CERTIFICATE_SUCCESS,
  GET_CERTIFICATE_LIST_SUCCESS,
  UPDATE_CERTIFICATE_FAIL,
  UPDATE_CERTIFICATE_REQUEST,
  UPDATE_CERTIFICATE_SUCCESS,
} from "../actions/CertificateActions";

const initialState = {
  certificateList: [],
  success: false,
  totalElements: 0,

  certificate: {},
};
const certificateReducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_CERTIFICATE_REQUEST:
    case ADD_CERTIFICATE_REQUEST:
    case DELETE_CERTIFICATE_REQUEST:
      return {
        ...state,
        success: false,
      };

    case ADD_CERTIFICATE_FAIL:
    case UPDATE_CERTIFICATE_FAIL:
    case DELETE_CERTIFICATE_FAIL:
      return {
        ...state,
        success: false,
      };

    case GET_CERTIFICATE_LIST_SUCCESS:
      return {
        ...state,
        certificateList: [...action.payload],
        success: true,
      };

    case ADD_CERTIFICATE_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case UPDATE_CERTIFICATE_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case DELETE_CERTIFICATE_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export default certificateReducer;
