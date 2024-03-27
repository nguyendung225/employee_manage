import ConstantList from "app/appConfig";
const { default: axios } = require("axios");
const API_PATH_PROPOSAL = ConstantList.API_ENPOINT+"/proposal" ;

export const getProposalListByEmployee = (id) => {
  return () => axios.get(API_PATH_PROPOSAL +"?employeeId="+id );
};

export const getProposalListByLeader = () => {
  return () => axios.get(API_PATH_PROPOSAL +"/current-leader" );
};


export const addProposalByEmployee = (payload) => {
  const {id,data}=payload
  return () => axios.post(API_PATH_PROPOSAL+"?employeeId="+id, data );
};


export const updateProposalByEmployee = (id, data) => {
  return () => axios.put(API_PATH_PROPOSAL +'/'+ id, data);
};
export const deleteProposalByEmployee = (id) => {
  return () => axios.delete(API_PATH_PROPOSAL +'/'+ id);
};
