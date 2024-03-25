export const GET_LEADER_LIST_REQUEST = "GET_LEADER_LIST_REQUEST";
export const GET_LEADER_LIST_SUCCESS = "GET_LEADER_LIST_SUCCESS";
export const GET_LEADER_LIST_FAIL = "GET_LEADERS_LIST_FAIL";
export const ADD_LEADER_REQUEST = "ADD_LEADER_REQUEST";
export const ADD_LEADER_SUCCESS = "ADD_LEADER_SUCCESS";
export const ADD_LEADER_FAIL = "ADD_LEADER_FAIL";
export const UPDATE_LEADER_REQUEST = "UPDATE_LEADER_REQUEST";
export const UPDATE_LEADER_SUCCESS = "UPDATE_LEADER_SUCCESS";
export const UPDATE_LEADER_FAIL = "UPDATE_LEADER_FAIL";
export const DELETE_LEADER_REQUEST = "DELETE_LEADER_REQUEST";
export const DELETE_LEADER_SUCCESS = "DELETE_LEADER_SUCCESS";
export const DELETE_LEADER_FAIL = "DELETE_LEADER_FAIL";
export const SET_LEADER='SET_LEADER'
export const getLeaders = (payload) => {
  return {
    type: GET_LEADER_LIST_REQUEST,
    payload,
  };
};
export const getLeadersSuccess = (payload) => {
  return {
    type: GET_LEADER_LIST_SUCCESS,
    payload,
  };
};
export const getLeadersFAIL = (payload) => {
  return {
    type: GET_LEADER_LIST_FAIL,
    payload,
  };
};

export const addLeader = (payload) => {
  return {
    type: ADD_LEADER_REQUEST,
    payload,
  };
};
export const addLeaderSuccess = (payload) => {
  return {
    type: ADD_LEADER_SUCCESS,
    payload,
  };
};
export const addLeaderFAIL = (payload) => {
  return {
    type: ADD_LEADER_FAIL,
    payload,
  };
};

export const updateLeader = (payload) => {
  return {
    type: UPDATE_LEADER_REQUEST,
    payload,
  };
};
export const updateLeaderSuccess = (payload) => {
  return {
    type: UPDATE_LEADER_SUCCESS,
    payload,
  };
};
export const updateLeaderFAIL = (payload) => {
  return {
    type: UPDATE_LEADER_FAIL,
    payload,
  };
};

export const deleteLeader = (id) => {
  return {
    type: DELETE_LEADER_REQUEST,
    id,
  };
};
export const deleteLeaderSuccess = (id) => {
  return {
    type: DELETE_LEADER_SUCCESS,
    id,
  };
};
export const deleteLeaderFAIL = (payload) => {
  return {
    type: DELETE_LEADER_FAIL,
    payload,
  };
};

export const setLeader=(payload)=>{
   return {
      type:SET_LEADER,
      payload
   }
}