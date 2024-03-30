import {
  ADD_EXPERIENCE_FAIL,
  ADD_EXPERIENCE_REQUEST,
  ADD_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_FAIL,
  DELETE_EXPERIENCE_REQUEST,
  DELETE_EXPERIENCE_SUCCESS,
  GET_EXPERIENCE_LIST_SUCCESS,
  UPDATE_EXPERIENCE_FAIL,
  UPDATE_EXPERIENCE_REQUEST,
  UPDATE_EXPERIENCE_SUCCESS,
} from "../actions/ExperienceActions";

const initialState = {
  experienceList: [],
  success: false,
  totalElements: 0,

  experience: {},
};
const ExperienceReducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_EXPERIENCE_REQUEST:
    case ADD_EXPERIENCE_REQUEST:
    case DELETE_EXPERIENCE_REQUEST:
      return {
        ...state,
        success: false,
      };

    case ADD_EXPERIENCE_FAIL:
    case UPDATE_EXPERIENCE_FAIL:
    case DELETE_EXPERIENCE_FAIL:
      return {
        ...state,
        success: false,
      };

    case GET_EXPERIENCE_LIST_SUCCESS:
      return {
        ...state,
        
        success: true,
      };

    case ADD_EXPERIENCE_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case UPDATE_EXPERIENCE_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case DELETE_EXPERIENCE_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export default ExperienceReducer;
