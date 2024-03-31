import {
  ADD_SALARY_BY_EMPLOYEE_FAIL,
  ADD_SALARY_BY_EMPLOYEE_REQUEST,
  ADD_SALARY_BY_EMPLOYEE_SUCCESS,
  DELETE_SALARY_BY_EMPLOYEE_FAIL,
  DELETE_SALARY_BY_EMPLOYEE_REQUEST,
  DELETE_SALARY_BY_EMPLOYEE_SUCCESS,
  GET_SALARY_LIST_BY_EMPLOYEE_FAIL,
  GET_SALARY_LIST_BY_EMPLOYEE_SUCCESS,
  GET_SALARY_LIST_BY_LEADER_SUCCESS,
  UPDATE_SALARY_BY_EMPLOYEE_FAIL,
  UPDATE_SALARY_BY_EMPLOYEE_REQUEST,
  UPDATE_SALARY_BY_EMPLOYEE_SUCCESS,
} from "../actions/SalaryActions";

const initialState = {
  salaryListByEmployee: [],
  salaryListByLeader: [],
  success: false,
  totalElements: 0,

  salary: {},
};
const salaryReducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_SALARY_BY_EMPLOYEE_REQUEST:
    case ADD_SALARY_BY_EMPLOYEE_REQUEST:
    case DELETE_SALARY_BY_EMPLOYEE_REQUEST:
      return {
        ...state,
        success: false,
      };

    case GET_SALARY_LIST_BY_EMPLOYEE_FAIL:
    case ADD_SALARY_BY_EMPLOYEE_FAIL:
    case UPDATE_SALARY_BY_EMPLOYEE_FAIL:
    case DELETE_SALARY_BY_EMPLOYEE_FAIL:
      return {
        ...state,
        success: false,
      };

    case GET_SALARY_LIST_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        salaryListByEmployee: [...action.payload],
        success: true,
      };

    case GET_SALARY_LIST_BY_LEADER_SUCCESS:
      return {
        ...state,
        salaryListByLeader: [...action.payload],
        success: true,
      };

    case ADD_SALARY_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case UPDATE_SALARY_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case DELETE_SALARY_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export default salaryReducer;
