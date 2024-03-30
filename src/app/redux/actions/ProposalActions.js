export const GET_PROPOSAL_LIST_BY_EMPLOYEE_REQUEST = "GET_PROPOSAL_LIST_BY_EMPLOYEE_REQUEST";
export const GET_PROPOSAL_LIST_BY_EMPLOYEE_SUCCESS = "GET_PROPOSAL_LIST_BY_EMPLOYEE_SUCCESS";
export const GET_PROPOSAL_LIST_BY_EMPLOYEE_FAIL = "GET_PROPOSAL_LIST_BY_EMPLOYEE_FAIL";
export const GET_PROPOSAL_LIST_BY_LEADER_REQUEST = "GET_PROPOSAL_LIST_BY_LEADER_REQUEST";
export const GET_PROPOSAL_LIST_BY_LEADER_SUCCESS = "GET_PROPOSAL_LIST_BY_LEADER_SUCCESS";
export const GET_PROPOSAL_LIST_BY_LEADER_FAIL = "GET_PROPOSAL_LIST_BY_LEADER_FAIL";
export const ADD_PROPOSAL_BY_EMPLOYEE_REQUEST = "ADD_PROPOSAL_BY_EMPLOYEE_REQUEST";
export const ADD_PROPOSAL_BY_EMPLOYEE_SUCCESS = "ADD_PROPOSAL_BY_EMPLOYEE_SUCCESS";
export const ADD_PROPOSAL_BY_EMPLOYEE_FAIL = "ADD_PROPOSAL_BY_EMPLOYEE_FAIL";
export const UPDATE_PROPOSAL_BY_EMPLOYEE_REQUEST = "UPDATE_PROPOSAL_BY_EMPLOYEE_REQUEST";
export const UPDATE_PROPOSAL_BY_EMPLOYEE_SUCCESS = "UPDATE_PROPOSAL_BY_EMPLOYEE_SUCCESS";
export const UPDATE_PROPOSAL_BY_EMPLOYEE_FAIL = "UPDATE_PROPOSAL_BY_EMPLOYEE_FAIL";
export const DELETE_PROPOSAL_BY_EMPLOYEE_REQUEST = "DELETE_PROPOSAL_BY_EMPLOYEE_REQUEST";
export const DELETE_PROPOSAL_BY_EMPLOYEE_SUCCESS = "DELETE_PROPOSAL_BY_EMPLOYEE_SUCCESS";
export const DELETE_PROPOSAL_BY_EMPLOYEE_FAIL = "DELETE_PROPOSAL_BY_EMPLOYEE_FAIL";
export const getProposalListByEmployee = (id) => {
  return {
    type: GET_PROPOSAL_LIST_BY_EMPLOYEE_REQUEST,
    id,
  };
};
export const getProposalListByEmployeeSuccess = (payload) => {
  return {
    type: GET_PROPOSAL_LIST_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const getProposalListByEmployeeFail = (payload) => {
  return {
    type: GET_PROPOSAL_LIST_BY_EMPLOYEE_FAIL,
    payload,
  };
};

export const getProposalListByLeader = () => {
  return {
    type: GET_PROPOSAL_LIST_BY_LEADER_REQUEST,
    
  };
};
export const getProposalListByLeaderSuccess = (payload) => {
  return {
    type: GET_PROPOSAL_LIST_BY_LEADER_SUCCESS,
    payload,
  };
};
export const getProposalListByLeaderFail = (payload) => {
  return {
    type: GET_PROPOSAL_LIST_BY_LEADER_FAIL,
    payload,
  };
};


export const addProposalByEmployee = (payload) => {
  return {
    type: ADD_PROPOSAL_BY_EMPLOYEE_REQUEST,
    payload,
  };
};
export const addProposalByEmployeeSuccess = (payload) => {
  return {
    type: ADD_PROPOSAL_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const addProposalByEmployeeFail = (payload) => {
  return {
    type: ADD_PROPOSAL_BY_EMPLOYEE_FAIL,
    payload,
  };
};

export const updateProposalByEmployee = (payload) => {
  return {
    type: UPDATE_PROPOSAL_BY_EMPLOYEE_REQUEST,
    payload,
  };
};
export const updateProposalByEmployeeSuccess = (payload) => {
  return {
    type: UPDATE_PROPOSAL_BY_EMPLOYEE_SUCCESS,
    payload,
  };
};
export const updateProposalByEmployeeFail = (payload) => {
  return {
    type: UPDATE_PROPOSAL_BY_EMPLOYEE_FAIL,
    payload,
  };
};

export const deleteProposalByEmployee = (id) => {
  return {
    type: DELETE_PROPOSAL_BY_EMPLOYEE_REQUEST,
    id,
  };
};
export const deleteProposalByEmployeeSuccess = (id) => {
  return {
    type: DELETE_PROPOSAL_BY_EMPLOYEE_SUCCESS,
    id,
  };
};
export const deleteProposalByEmployeeFail = (payload) => {
  return {
    type: DELETE_PROPOSAL_BY_EMPLOYEE_FAIL,
    payload,
  };
};
