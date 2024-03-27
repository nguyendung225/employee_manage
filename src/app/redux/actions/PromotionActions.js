export const GET_PROMOTION_LIST_BY_EMPLOYEE_REQUEST = "GET_PROMOTION_LIST_BY_EMPLOYEE_REQUEST";
export const GET_PROMOTION_LIST_BY_EMPLOYEE_SUCCESS = "GET_PROMOTION_LIST_BY_EMPLOYEE_SUCCESS";
export const GET_PROMOTION_LIST_BY_EMPLOYEE_FAIL = "GET_PROMOTION_LIST_BY_EMPLOYEE_FAIL";
export const GET_PROMOTION_LIST_BY_LEADER_REQUEST = "GET_PROMOTION_LIST_BY_LEADER_REQUEST";
export const GET_PROMOTION_LIST_BY_LEADER_SUCCESS = "GET_PROMOTION_LIST_BY_LEADER_SUCCESS";
export const GET_PROMOTION_LIST_BY_LEADER_FAIL = "GET_PROMOTION_LIST_BY_LEADER_FAIL";
export const ADD_PROMOTION_BY_EMPLOYEE_REQUEST = "ADD_PROMOTION_BY_EMPLOYEE_REQUEST";
export const ADD_PROMOTION_BY_EMPLOYEE_SUCCESS = "ADD_PROMOTION_BY_EMPLOYEE_SUCCESS";
export const ADD_PROMOTION_BY_EMPLOYEE_FAIL = "ADD_PROMOTION_BY_EMPLOYEE_FAIL";
export const UPDATE_PROMOTION_BY_EMPLOYEE_REQUEST = "UPDATE_PROMOTION_BY_EMPLOYEE_REQUEST";
export const UPDATE_PROMOTION_BY_EMPLOYEE_SUCCESS = "UPDATE_PROMOTION_BY_EMPLOYEE_SUCCESS";
export const UPDATE_PROMOTION_BY_EMPLOYEE_FAIL = "UPDATE_PROMOTION_BY_EMPLOYEE_FAIL";
export const DELETE_PROMOTION_BY_EMPLOYEE_REQUEST = "DELETE_PROMOTION_BY_EMPLOYEE_REQUEST";
export const DELETE_PROMOTION_BY_EMPLOYEE_SUCCESS = "DELETE_PROMOTION_BY_EMPLOYEE_SUCCESS";
export const DELETE_PROMOTION_BY_EMPLOYEE_FAIL = "DELETE_PROMOTION_BY_EMPLOYEE_FAIL";
export const getPromotionListByEmployee = (id) => {
  return {
    type: GET_PROMOTION_LIST_BY_EMPLOYEE_REQUEST,
    id,
  };
};
export const getPromotionListByEmployeeSuccess = (payload) => {
  return {
    type: GET_PROMOTION_LIST_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const getPromotionListByEmployeeFail = (payload) => {
  return {
    type: GET_PROMOTION_LIST_BY_EMPLOYEE_FAIL,
    payload,
  };
};

export const getPromotionListByLeader = () => {
  return {
    type: GET_PROMOTION_LIST_BY_LEADER_REQUEST,
   
  };
};
export const getPromotionListByLeaderSuccess = (payload) => {
  return {
    type: GET_PROMOTION_LIST_BY_LEADER_SUCCESS,
    payload,
  };
};
export const getPromotionListByLeaderFail = (payload) => {
  return {
    type: GET_PROMOTION_LIST_BY_LEADER_FAIL,
    payload,
  };
};


export const addPromotionByEmployee = (payload) => {
  return {
    type: ADD_PROMOTION_BY_EMPLOYEE_REQUEST,
    payload,
  };
};
export const addPromotionByEmployeeSuccess = (payload) => {
  return {
    type: ADD_PROMOTION_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const addPromotionByEmployeeFail = (payload) => {
  return {
    type: ADD_PROMOTION_BY_EMPLOYEE_FAIL,
    payload,
  };
};

export const updatePromotionByEmployee = (payload) => {
  return {
    type: UPDATE_PROMOTION_BY_EMPLOYEE_REQUEST,
    payload,
  };
};
export const updatePromotionByEmployeeSuccess = (payload) => {
  return {
    type: UPDATE_PROMOTION_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const updatePromotionByEmployeeFail = (payload) => {
  return {
    type: UPDATE_PROMOTION_BY_EMPLOYEE_FAIL,
    payload,
  };
};

export const deletePromotionByEmployee = (id) => {
  return {
    type: DELETE_PROMOTION_BY_EMPLOYEE_REQUEST,
    id,
  };
};
export const deletePromotionByEmployeeSuccess = (id) => {
  return {
    type: DELETE_PROMOTION_BY_EMPLOYEE_SUCCESS,
    id,
  };
};
export const deletePromotionByEmployeeFail = (payload) => {
  return {
    type: DELETE_PROMOTION_BY_EMPLOYEE_FAIL,
    payload,
  };
};
