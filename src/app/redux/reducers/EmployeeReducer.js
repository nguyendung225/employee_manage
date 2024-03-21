import {
    ADD_EMPLOYEE_FAIL,
    ADD_EMPLOYEE_REQUEST,
    ADD_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_FAIL,
    DELETE_EMPLOYEE_REQUEST,
    DELETE_EMPLOYEE_SUCCESS,
    GET_EMPLOYEE_BY_ID_SUCCESS,
    GET_EMPLOYEE_LIST_FAIL,
    GET_EMPLOYEE_LIST_SUCCESS,
    SET_EMPLOYEE,
    UPDATE_EMPLOYEE_FAIL,
    UPDATE_EMPLOYEE_REQUEST,
    UPDATE_EMPLOYEE_SUCCESS,
  } from "../actions/EmployeeActions";
  
  const initialState = {
    employeeList: [],
    success: false,
    totalElements: 0,
  
    employee: {},
  };
  const EmployeeReducer = function (state = initialState, action) {
    switch (action.type) {
      case UPDATE_EMPLOYEE_REQUEST:
      case ADD_EMPLOYEE_REQUEST:
      case DELETE_EMPLOYEE_REQUEST:
        return {
          ...state,
          success: false,
        };
  
      
      case ADD_EMPLOYEE_FAIL:
      case UPDATE_EMPLOYEE_FAIL:
      case DELETE_EMPLOYEE_FAIL:
        return {
          ...state,
          success: false,
        };
  
      case GET_EMPLOYEE_LIST_SUCCESS:
        return {
          ...state,
          employeeList: action.payload.data,
          totalElements: action.payload.totalElements,
          success: true,
        };
  
      case GET_EMPLOYEE_BY_ID_SUCCESS:
        return {
          ...state,
          employee: action.payload,
          success: true,
        };
  
      case ADD_EMPLOYEE_SUCCESS:
        
        return {
          ...state,
          employee: action.payload,
          success: true,
        };
  
      case UPDATE_EMPLOYEE_SUCCESS:
       
        return {
          ...state,
        
          employee:action.payload,
          success: true,
        };
  
      case DELETE_EMPLOYEE_SUCCESS:
        return {
          ...state,
        
          success: true,
        };
  
      case SET_EMPLOYEE: {
        return {
          ...state,
          employee: action.payload,
        };
      }
      default:
        return state;
    }
  };
  
  export default EmployeeReducer;
  