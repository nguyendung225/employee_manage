import ConstantList from "app/appConfig";
const { default: axios } = require("axios");
const API_PATH_EMPLOYEES = ConstantList.API_ENPOINT+"employee/" ;

export const getEmployees = (payload) => {
  return () => axios.get(API_PATH_EMPLOYEES +"search",{params:payload } );
};

export const getEmployeeById = (id) => {
  return () => axios.get(API_PATH_EMPLOYEES +id );
};


export const addEmployee = (payload) => {
  return () => axios.post(API_PATH_EMPLOYEES, payload);
};


export const updateEmployee = (id, data) => {
  return () => axios.put(API_PATH_EMPLOYEES + id, data);
};
export const deleteEmployee = (id) => {
  return () => axios.delete(API_PATH_EMPLOYEES + id);
};
