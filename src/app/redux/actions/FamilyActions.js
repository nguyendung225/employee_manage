export const GET_FAMILY_LIST_REQUEST = "GET_FAMILY_LIST_REQUEST";
export const GET_FAMILY_LIST_SUCCESS = "GET_FAMILY_LIST_SUCCESS";
export const GET_FAMILY_LIST_FAIL = "GET_FAMILIES_LIST_FAIL";
export const ADD_FAMILY_REQUEST = "ADD_FAMILY_REQUEST";
export const ADD_FAMILY_SUCCESS = "ADD_FAMILY_SUCCESS";
export const ADD_FAMILY_FAIL = "ADD_FAMILY_FAIL";
export const UPDATE_FAMILY_REQUEST = "UPDATE_FAMILY_REQUEST";
export const UPDATE_FAMILY_SUCCESS = "UPDATE_FAMILY_SUCCESS";
export const UPDATE_FAMILY_FAIL = "UPDATE_FAMILY_FAIL";
export const DELETE_FAMILY_REQUEST = "DELETE_FAMILY_REQUEST";
export const DELETE_FAMILY_SUCCESS = "DELETE_FAMILY_SUCCESS";
export const DELETE_FAMILY_FAIL = "DELETE_FAMILY_FAIL";
export const getFamilies = (id) => {
  return {
    type: GET_FAMILY_LIST_REQUEST,
    id,
  };
};
export const getFamiliesSuccess = (payload) => {
  return {
    type: GET_FAMILY_LIST_SUCCESS,
    payload,
  };
};
export const getFamiliesFAIL = (payload) => {
  return {
    type: GET_FAMILY_LIST_FAIL,
    payload,
  };
};

export const addFamily = (payload) => {
  return {
    type: ADD_FAMILY_REQUEST,
    payload,
  };
};
export const addFamilySuccess = (payload) => {
  return {
    type: ADD_FAMILY_SUCCESS,
    payload,
  };
};
export const addFamilyFAIL = (payload) => {
  return {
    type: ADD_FAMILY_FAIL,
    payload,
  };
};

export const updateFamily = (payload) => {
  return {
    type: UPDATE_FAMILY_REQUEST,
    payload,
  };
};
export const updateFamilySuccess = (payload) => {
  return {
    type: UPDATE_FAMILY_SUCCESS,
    payload,
  };
};
export const updateFamilyFAIL = (payload) => {
  return {
    type: UPDATE_FAMILY_FAIL,
    payload,
  };
};

export const deleteFamily = (id) => {
  return {
    type: DELETE_FAMILY_REQUEST,
    id,
  };
};
export const deleteFamilySuccess = (id) => {
  return {
    type: DELETE_FAMILY_SUCCESS,
    id,
  };
};
export const deleteFamilyFAIL = (payload) => {
  return {
    type: DELETE_FAMILY_FAIL,
    payload,
  };
};

