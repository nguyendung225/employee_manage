import {
  ADD_FAMILY_FAIL,
  ADD_FAMILY_REQUEST,
  ADD_FAMILY_SUCCESS,
  DELETE_FAMILY_FAIL,
  DELETE_FAMILY_REQUEST,
  DELETE_FAMILY_SUCCESS,
  GET_FAMILY_LIST_SUCCESS,
  UPDATE_FAMILY_FAIL,
  UPDATE_FAMILY_REQUEST,
  UPDATE_FAMILY_SUCCESS,
} from "../actions/FamilyActions";

const initialState = {
  familyList: [],
  success: false,
  totalElements: 0,

  family: {},
};
const familyReducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_FAMILY_REQUEST:
    case ADD_FAMILY_REQUEST:
    case DELETE_FAMILY_REQUEST:
      return {
        ...state,
        success: false,
      };

    case ADD_FAMILY_FAIL:
    case UPDATE_FAMILY_FAIL:
    case DELETE_FAMILY_FAIL:
      return {
        ...state,
        success: false,
      };

    case GET_FAMILY_LIST_SUCCESS:
      return {
        ...state,
        familyList: [...action.payload],
        success: true,
      };

    case ADD_FAMILY_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case UPDATE_FAMILY_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case DELETE_FAMILY_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export default familyReducer;
