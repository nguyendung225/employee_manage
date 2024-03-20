import axios from "axios";
import ConstantList from "../appConfig";

const API_PATH_EMPLOYEES = ConstantList.API_ENPOINT + "employee/";
export const uploadImage = (data) => {
  return axios.post(API_PATH_EMPLOYEES + "upload-image", data);
};
