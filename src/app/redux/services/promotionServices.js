import ConstantList from "app/appConfig";
const { default: axios } = require("axios");
const API_PATH_PROMOTION = ConstantList.API_ENPOINT+"/process" ;

export const getPromotionListByEmployee = (id) => {
  return () => axios.get(API_PATH_PROMOTION +"?employeeId="+id );
};

export const getPromotionListByLeader = () => {
  return () => axios.get(API_PATH_PROMOTION +"/current-leader" );
};

export const addPromotionByEmployee = (payload) => {
  const {id,data}=payload
  return () => axios.post(API_PATH_PROMOTION+"?employeeId="+id, data );
};


export const updatePromotionByEmployee = (id, data) => {
  return () => axios.put(API_PATH_PROMOTION +'/'+ id, data);
};
export const deletePromotionByEmployee = (id) => {
  return () => axios.delete(API_PATH_PROMOTION +'/'+ id);
};
