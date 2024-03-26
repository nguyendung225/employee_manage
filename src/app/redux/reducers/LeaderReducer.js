import {
  ADD_LEADER_FAIL,
  ADD_LEADER_REQUEST,
  ADD_LEADER_SUCCESS,
  DELETE_LEADER_FAIL,
  DELETE_LEADER_REQUEST,
  DELETE_LEADER_SUCCESS,
  GET_LEADER_LIST_FAIL,
  GET_LEADER_LIST_REQUEST,
  GET_LEADER_LIST_SUCCESS,
  SET_LEADER,
  UPDATE_LEADER_FAIL,
  UPDATE_LEADER_REQUEST,
  UPDATE_LEADER_SUCCESS,
} from "../actions/LeaderActions";

const initialState = {
  leaderList: [], 
  success: false,
  totalElements: 0,

  leader: {},
};
const LeaderReducer = function (state = initialState, action) {
  switch (action.type) {
    case GET_LEADER_LIST_REQUEST:
    case UPDATE_LEADER_REQUEST:
    case ADD_LEADER_REQUEST:
    case DELETE_LEADER_REQUEST:
      return {
        ...state,
        success: false,
      };

    case GET_LEADER_LIST_FAIL:
    case ADD_LEADER_FAIL:
    case UPDATE_LEADER_FAIL:
    case DELETE_LEADER_FAIL:
      return {
        ...state,
        success: false,
      };

    case GET_LEADER_LIST_SUCCESS:
      return {
        ...state,
        leaderList: action.payload.data,
        totalElements: action.payload.totalElements,
        success: true,
      };

    case ADD_LEADER_SUCCESS:
      return {
        ...state,
        leaderList: [...state.leaderList, action.payload],
        leader: action.payload,
        success: true,
      };

    case UPDATE_LEADER_SUCCESS:
      return {
        ...state,
        leaderList: state.leaderList.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        success: true,
      };

    case DELETE_LEADER_SUCCESS:
      return {
        ...state,
        leaderList: state.leaderList.filter((item) => item.id !== action.id),
        success: true,
      };

    case SET_LEADER: {
      return {
        ...state,
        leader: action.payload,
      };
    }
    default:
      return state;
  }
};

export default LeaderReducer;
