export const GET_EMPLOYEE_LIST_REQUEST = "GET_EMPLOYEE_LIST_REQUEST";
export const GET_EMPLOYEE_LIST_SUCCESS = "GET_EMPLOYEE_LIST_SUCCESS";
export const GET_EMPLOYEE_LIST_FAIL = "GET_EMPLOYEE_LIST_FAIL";
export const GET_EMPLOYEE_BY_ID_REQUEST = "GET_EMPLOYEE_BY_ID_REQUEST";
export const GET_EMPLOYEE_BY_ID_SUCCESS = "GET_EMPLOYEE_BY_ID_SUCCESS";
export const GET_EMPLOYEE_BY_ID_FAIL = "GET_EMPLOYEE_BY_ID_FAIL";
export const ADD_EMPLOYEE_REQUEST = "ADD_EMPLOYEE_REQUEST";
export const ADD_EMPLOYEE_SUCCESS = "ADD_EMPLOYEE_SUCCESS";
export const ADD_EMPLOYEE_FAIL = "ADD_EMPLOYEE_FAIL";
export const UPDATE_EMPLOYEE_REQUEST = "UPDATE_EMPLOYEE_REQUEST";
export const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_FAIL = "UPDATE_EMPLOYEE_FAIL";
export const DELETE_EMPLOYEE_REQUEST = "DELETE_EMPLOYEE_REQUEST";
export const DELETE_EMPLOYEE_SUCCESS = "DELETE_EMPLOYEE_SUCCESS";
export const DELETE_EMPLOYEE_FAIL = "DELETE_EMPLOYEE_FAIL";
export const SET_EMPLOYEE='SET_EMPLOYEE'
export const getEmployees = (payload) => {
  return {
    type: GET_EMPLOYEE_LIST_REQUEST,
    payload,
  };
};
export const getEmployeesSuccess = (payload) => {
  return {
    type: GET_EMPLOYEE_LIST_SUCCESS,
    payload,
  };
};
export const getEmployeesFail = (payload) => {
  return {
    type: GET_EMPLOYEE_LIST_FAIL,
    payload,
  };
};



export const getEmployeeById = (id) => {
  return {
    type: GET_EMPLOYEE_BY_ID_REQUEST,
    id,
  };
};
export const getEmployeeByIdSuccess = (payload) => {
  return {
    type: GET_EMPLOYEE_BY_ID_SUCCESS,
    payload,
  };
};
export const getEmployeeByIdFail = (payload) => {
  return {
    type: GET_EMPLOYEE_BY_ID_FAIL,
    payload,
  };
};


export const addEmployee = (payload) => {
  return {
    type: ADD_EMPLOYEE_REQUEST,
    payload,
  };
};
export const addEmployeeSuccess = (payload) => {
  return {
    type: ADD_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const addEmployeeFail = (payload) => {
  return {
    type: ADD_EMPLOYEE_FAIL,
    payload,
  };
};

export const updateEmployee = (payload) => {
  return {
    type: UPDATE_EMPLOYEE_REQUEST,
    payload,
  };
};
export const updateEmployeeSuccess = (payload) => {
  return {
    type: UPDATE_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const updateEmployeeFail = (payload) => {
  return {
    type: UPDATE_EMPLOYEE_FAIL,
    payload,
  };
};

export const deleteEmployee = (id) => {
  return {
    type: DELETE_EMPLOYEE_REQUEST,
    id,
  };
};
export const deleteEmployeeSuccess = (id) => {
  return {
    type: DELETE_EMPLOYEE_SUCCESS,
    id,
  };
};
export const deleteEmployeeFail = (payload) => {
  return {
    type: DELETE_EMPLOYEE_FAIL,
    payload,
  };
};

export const setEmployee=(payload)=>{
   return {
      type:SET_EMPLOYEE,
      payload
   }
}