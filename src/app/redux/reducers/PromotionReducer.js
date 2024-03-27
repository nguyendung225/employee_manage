import {
  ADD_PROMOTION_BY_EMPLOYEE_FAIL,
  ADD_PROMOTION_BY_EMPLOYEE_REQUEST,
  ADD_PROMOTION_BY_EMPLOYEE_SUCCESS,
  DELETE_PROMOTION_BY_EMPLOYEE_FAIL,
  DELETE_PROMOTION_BY_EMPLOYEE_REQUEST,
  DELETE_PROMOTION_BY_EMPLOYEE_SUCCESS,
  GET_PROMOTION_LIST_BY_EMPLOYEE_FAIL,
  GET_PROMOTION_LIST_BY_EMPLOYEE_SUCCESS,
  GET_PROMOTION_LIST_BY_LEADER_SUCCESS,
  UPDATE_PROMOTION_BY_EMPLOYEE_FAIL,
  UPDATE_PROMOTION_BY_EMPLOYEE_REQUEST,
  UPDATE_PROMOTION_BY_EMPLOYEE_SUCCESS,
} from "../actions/PromotionActions";

const initialState = {
  promotionListByEmployee: [],
  promotionListByLeader: [],
  success: false,
  totalElements: 0,
  promotion: {},
};
const promotionReducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROMOTION_BY_EMPLOYEE_REQUEST:
    case ADD_PROMOTION_BY_EMPLOYEE_REQUEST:
    case DELETE_PROMOTION_BY_EMPLOYEE_REQUEST:
      return {
        ...state,
        success: false,
      };
     
    case ADD_PROMOTION_BY_EMPLOYEE_FAIL:
    case UPDATE_PROMOTION_BY_EMPLOYEE_FAIL:
    case DELETE_PROMOTION_BY_EMPLOYEE_FAIL:
      return {
        ...state,
        success: false,
      };

    case GET_PROMOTION_LIST_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        promotionListByEmployee: [...action.payload],
        success: true,
      };

    case GET_PROMOTION_LIST_BY_LEADER_SUCCESS:
      return {
        ...state,
        promotionListByLeader: [...action.payload],
        success: true,
      };

    case ADD_PROMOTION_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        success: true,
      };

    case UPDATE_PROMOTION_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        success: true,
      };

    case DELETE_PROMOTION_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export default promotionReducer;
