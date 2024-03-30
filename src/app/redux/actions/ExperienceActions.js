export const GET_EXPERIENCE_LIST_REQUEST = "GET_EXPERIENCE_LIST_REQUEST";
export const GET_EXPERIENCE_LIST_SUCCESS = "GET_EXPERIENCE_LIST_SUCCESS";
export const GET_EXPERIENCE_LIST_FAIL = "GET_EXPERIENCES_LIST_FAIL";
export const ADD_EXPERIENCE_REQUEST = "ADD_EXPERIENCE_REQUEST";
export const ADD_EXPERIENCE_SUCCESS = "ADD_EXPERIENCE_SUCCESS";
export const ADD_EXPERIENCE_FAIL = "ADD_EXPERIENCE_FAIL";
export const UPDATE_EXPERIENCE_REQUEST = "UPDATE_EXPERIENCE_REQUEST";
export const UPDATE_EXPERIENCE_SUCCESS = "UPDATE_EXPERIENCE_SUCCESS";
export const UPDATE_EXPERIENCE_FAIL = "UPDATE_EXPERIENCE_FAIL";
export const DELETE_EXPERIENCE_REQUEST = "DELETE_EXPERIENCE_REQUEST";
export const DELETE_EXPERIENCE_SUCCESS = "DELETE_EXPERIENCE_SUCCESS";
export const DELETE_EXPERIENCE_FAIL = "DELETE_EXPERIENCE_FAIL";
export const getExperiences = (id) => {
  return {
    type: GET_EXPERIENCE_LIST_REQUEST,
    id,
  };
};
export const getExperiencesSuccess = (payload) => {
  return {
    type: GET_EXPERIENCE_LIST_SUCCESS,
    payload,
  };
};
export const getExperiencesFAIL = (payload) => {
  return {
    type: GET_EXPERIENCE_LIST_FAIL,
    payload,
  };
};

export const addExperience = (payload) => {
  return {
    type: ADD_EXPERIENCE_REQUEST,
    payload,
  };
};
export const addExperienceSuccess = (payload) => {
  return {
    type: ADD_EXPERIENCE_SUCCESS,
    payload,
  };
};
export const addExperienceFAIL = (payload) => {
  return {
    type: ADD_EXPERIENCE_FAIL,
    payload,
  };
};

export const updateExperience = (payload) => {
  return {
    type: UPDATE_EXPERIENCE_REQUEST,
    payload,
  };
};
export const updateExperienceSuccess = (payload) => {
  return {
    type: UPDATE_EXPERIENCE_SUCCESS,
    payload,
  };
};
export const updateExperienceFAIL = (payload) => {
  return {
    type: UPDATE_EXPERIENCE_FAIL,
    payload,
  };
};

export const deleteExperience = (id) => {
  return {
    type: DELETE_EXPERIENCE_REQUEST,
    id,
  };
};
export const deleteExperienceSuccess = (id) => {
  return {
    type: DELETE_EXPERIENCE_SUCCESS,
    id,
  };
};
export const deleteExperienceFAIL = (payload) => {
  return {
    type: DELETE_EXPERIENCE_FAIL,
    payload,
  };
};

