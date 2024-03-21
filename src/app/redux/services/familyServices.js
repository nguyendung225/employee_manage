import ConstantList from "app/appConfig";
const { default: axios } = require("axios");
const API_PATH_FAMILY = ConstantList.API_ENPOINT+"employee-family" ;

export const getFamilies = (id) => {
  return () => axios.get(API_PATH_FAMILY +"?employeeId="+id );
};


export const addFamily = (payload) => {
  const {id,data}=payload
  return () => axios.post(API_PATH_FAMILY+"?employeeId="+id, data );
};


export const updateFamily = (id, data) => {
  return () => axios.put(API_PATH_FAMILY +'/'+ id, data);
};
export const deleteFamily = (id) => {
  return () => axios.delete(API_PATH_FAMILY +'/'+ id);
};
