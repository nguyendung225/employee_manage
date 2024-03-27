import ConstantList from "app/appConfig";
const { default: axios } = require("axios");
const API_PATH_SALARY = ConstantList.API_ENPOINT+"/salary-increase" ;

export const getSalaryListByEmployee = (id) => {
  return () => axios.get(API_PATH_SALARY +"?employeeId="+id );
};

export const getSalaryListByLeader = () => {
  return () => axios.get(API_PATH_SALARY +"/current-leader" );
};


export const addSalaryByEmployee = (payload) => {
  const {id,data}=payload
    console.log(data)
  return () => axios.post(API_PATH_SALARY+"?employeeId="+id, data );
};


export const updateSalaryByEmployee = (id, data) => {
  return () => axios.put(API_PATH_SALARY +'/'+ id, data);
};
export const deleteSalaryByEmployee = (id) => {
  return () => axios.delete(API_PATH_SALARY +'/'+ id);
};
