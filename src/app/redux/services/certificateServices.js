import ConstantList from "app/appConfig";
const { default: axios } = require("axios");
const API_PATH_CERTIFICATES = ConstantList.API_ENPOINT+"certificate" ;

export const getCertificates = (id) => {
  return () => axios.get(API_PATH_CERTIFICATES +"?employeeId="+id );
};


export const addCertificate = (payload) => {
  const {id,data}=payload
  return () => axios.post(API_PATH_CERTIFICATES+"?employeeId="+id, data );
};


export const updateCertificate = (id, data) => {
  return () => axios.put(API_PATH_CERTIFICATES +'/'+ id, data);
};
export const deleteCertificate = (id) => {
  return () => axios.delete(API_PATH_CERTIFICATES +'/'+ id);
};
