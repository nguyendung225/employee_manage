import ConstantList from "app/appConfig";
const { default: axios } = require("axios");
const API_PATH_LEADERS = ConstantList.API_ENPOINT+"leader/" ;

export const getLeaders = () => {
  return () => axios.get(API_PATH_LEADERS  );
};


export const addLeader = (payload) => {
  return () => axios.post(API_PATH_LEADERS, payload);
};


export const updateLeader = (id, data) => {
  return () => axios.put(API_PATH_LEADERS + id, data);
};
export const deleteLeader = (id) => {
  return () => axios.delete(API_PATH_LEADERS + id);
};
