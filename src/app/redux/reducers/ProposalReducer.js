import {
  ADD_PROPOSAL_BY_EMPLOYEE_FAIL,
  ADD_PROPOSAL_BY_EMPLOYEE_REQUEST,
  ADD_PROPOSAL_BY_EMPLOYEE_SUCCESS,
  DELETE_PROPOSAL_BY_EMPLOYEE_FAIL,
  DELETE_PROPOSAL_BY_EMPLOYEE_REQUEST,
  DELETE_PROPOSAL_BY_EMPLOYEE_SUCCESS,
  GET_PROPOSAL_LIST_BY_EMPLOYEE_SUCCESS,
  GET_PROPOSAL_LIST_BY_LEADER_SUCCESS,
  UPDATE_PROPOSAL_BY_EMPLOYEE_FAIL,
  UPDATE_PROPOSAL_BY_EMPLOYEE_REQUEST,
  UPDATE_PROPOSAL_BY_EMPLOYEE_SUCCESS,
} from "../actions/ProposalActions";

const initialState = {
  proposalListByEmployee: [],
  proposalListByLeader: [],
  success: false,
  totalElements: 0,

  proposal: {},
};
const proposalReducer = function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROPOSAL_BY_EMPLOYEE_REQUEST:
    case ADD_PROPOSAL_BY_EMPLOYEE_REQUEST:
    case DELETE_PROPOSAL_BY_EMPLOYEE_REQUEST:
      return {
        ...state,
        success: false,
      };

    case ADD_PROPOSAL_BY_EMPLOYEE_FAIL:
    case UPDATE_PROPOSAL_BY_EMPLOYEE_FAIL:
    case DELETE_PROPOSAL_BY_EMPLOYEE_FAIL:
      return {
        ...state,
        success: false,
      };

    case GET_PROPOSAL_LIST_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        proposalListByEmployee: [...action.payload],
        success: true,
      };

    case GET_PROPOSAL_LIST_BY_LEADER_SUCCESS:
      return {
        ...state,
        proposalListByLeader: [...action.payload],
        success: true,
      };

    case ADD_PROPOSAL_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case UPDATE_PROPOSAL_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,

        success: true,
      };

    case DELETE_PROPOSAL_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        success: true,
      };

    default:
      return state;
  }
};

export default proposalReducer;
