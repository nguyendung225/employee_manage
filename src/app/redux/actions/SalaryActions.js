export const GET_SALARY_LIST_BY_EMPLOYEE_REQUEST = "GET_SALARY_LIST_BY_EMPLOYEE_REQUEST";
export const GET_SALARY_LIST_BY_EMPLOYEE_SUCCESS = "GET_SALARY_LIST_BY_EMPLOYEE_SUCCESS";
export const GET_SALARY_LIST_BY_EMPLOYEE_FAIL = "GET_SALARY_LIST_BY_EMPLOYEE_FAIL";
export const GET_SALARY_LIST_BY_LEADER_REQUEST = "GET_SALARY_LIST_BY_LEADER_REQUEST";
export const GET_SALARY_LIST_BY_LEADER_SUCCESS = "GET_SALARY_LIST_BY_LEADER_SUCCESS";
export const GET_SALARY_LIST_BY_LEADER_FAIL = "GET_SALARY_LIST_BY_LEADER_FAIL";
export const ADD_SALARY_BY_EMPLOYEE_REQUEST = "ADD_SALARY_BY_EMPLOYEE_REQUEST";
export const ADD_SALARY_BY_EMPLOYEE_SUCCESS = "ADD_SALARY_BY_EMPLOYEE_SUCCESS";
export const ADD_SALARY_BY_EMPLOYEE_FAIL = "ADD_SALARY_BY_EMPLOYEE_FAIL";
export const UPDATE_SALARY_BY_EMPLOYEE_REQUEST = "UPDATE_SALARY_BY_EMPLOYEE_REQUEST";
export const UPDATE_SALARY_BY_EMPLOYEE_SUCCESS = "UPDATE_SALARY_BY_EMPLOYEE_SUCCESS";
export const UPDATE_SALARY_BY_EMPLOYEE_FAIL = "UPDATE_SALARY_BY_EMPLOYEE_FAIL";
export const DELETE_SALARY_BY_EMPLOYEE_REQUEST = "DELETE_SALARY_BY_EMPLOYEE_REQUEST";
export const DELETE_SALARY_BY_EMPLOYEE_SUCCESS = "DELETE_SALARY_BY_EMPLOYEE_SUCCESS";
export const DELETE_SALARY_BY_EMPLOYEE_FAIL = "DELETE_SALARY_BY_EMPLOYEE_FAIL";
export const getSalaryListByEmployee = (id) => {
  return {
    type: GET_SALARY_LIST_BY_EMPLOYEE_REQUEST,
    id,
  };
};
export const getSalaryListByEmployeeSuccess = (payload) => {
  return {
    type: GET_SALARY_LIST_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const getSalaryListByEmployeeFail = (payload) => {
  return {
    type: GET_SALARY_LIST_BY_EMPLOYEE_FAIL,
    payload,
  };
};


export const getSalaryListByLeader = () => {
  return {
    type: GET_SALARY_LIST_BY_LEADER_REQUEST,
  
  };
};
export const getSalaryListByLeaderSuccess = (payload) => {
  return {
    type: GET_SALARY_LIST_BY_LEADER_SUCCESS,
    payload,
  };
};
export const getSalaryListByLeaderFail = (payload) => {
  return {
    type: GET_SALARY_LIST_BY_LEADER_FAIL,
    payload,
  };
};


export const addSalaryByEmployee = (payload) => {
  return {
    type: ADD_SALARY_BY_EMPLOYEE_REQUEST,
    payload,
  };
};
export const addSalaryByEmployeeSuccess = (payload) => {
  return {
    type: ADD_SALARY_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const addSalaryByEmployeeFail = (payload) => {
  return {
    type: ADD_SALARY_BY_EMPLOYEE_FAIL,
    payload,
  };
};

export const updateSalaryByEmployee = (payload) => {
  return {
    type: UPDATE_SALARY_BY_EMPLOYEE_REQUEST,
    payload,
  };
};
export const updateSalaryByEmployeeSuccess = (payload) => {
  return {
    type: UPDATE_SALARY_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const updateSalaryByEmployeeFail = (payload) => {
  return {
    type: UPDATE_SALARY_BY_EMPLOYEE_FAIL,
    payload,
  };
};

export const deleteSalaryByEmployee = (id) => {
  return {
    type: DELETE_SALARY_BY_EMPLOYEE_REQUEST,
    id,
  };
};
export const deleteSalaryByEmployeeSuccess = (id) => {
  return {
    type: DELETE_SALARY_BY_EMPLOYEE_SUCCESS,
    id,
  };
};
export const deleteSalaryByEmployeeFail = (payload) => {
  return {
    type: DELETE_SALARY_BY_EMPLOYEE_FAIL,
    payload,
  };
};
