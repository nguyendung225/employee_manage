import moment from "moment";

const { ValidatorForm } = require("react-material-ui-form-validator");

const isEmployeeIdValid = (value) => {
  const currentYearLastTwoDigits = new Date()
    .getFullYear()
    .toString()
    .slice(-2);

  const regex = new RegExp(`^NV${currentYearLastTwoDigits}(\\d{3})$`);

  return regex.test(value);
};

export const addEmployeeIdValidationRule = () => {
  ValidatorForm.addValidationRule("isEmployeeIdValid", isEmployeeIdValid);
};

export const removeEmployeeIdValidationRule = () => {
  ValidatorForm.removeValidationRule("isEmployeeIdValid");
};
const isFullNameValid = (value) => {
  const valueWithoutAccents = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
  const regex = /^[a-zA-Z\u00C0-\u024F\s]*$/;
  
  const containsNumber = /\d/.test(value); 
  return regex.test(valueWithoutAccents) && !containsNumber; 
  

};
export const addFullNameValidationRule = () => {
  ValidatorForm.addValidationRule("isFullNameValid", isFullNameValid);
};

export const removeFullNameValidationRule = () => {
  
  ValidatorForm.removeValidationRule("isFullNameValid");
};

const isPhoneNumberValid = (value) => {
  const regex = /^0\d{9}$/;

  return regex.test(value);
};

export const addPhoneValidationRule = () => {
  ValidatorForm.addValidationRule("isPhoneNumberValid", isPhoneNumberValid);
};

export const removePhoneValidationRule = () => {
  ValidatorForm.removeValidationRule("isPhoneNumberValid");
};

const isIdentityCardValidationRule = (value) => {
  const regex = /^\d{9}$|^\d{12}$/;

  return regex.test(value);
};

export const addIdentityCardValidationRule = () => {
  ValidatorForm.addValidationRule(
    "isIdentityCardValid",
    isIdentityCardValidationRule
  );
};

export const removeIdentityCardValidationRule = () => {
  ValidatorForm.removeValidationRule("isIdentityCardValid");
};

const isAgeValid = (value) => {
  if (!value) return false;

  const birthDate = new Date(value);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    return age >= 18;
  } else {
    return age - 1 >= 18;
  }
};

export const addAgeValidationRule = () => {
  ValidatorForm.addValidationRule("isAgeValid", isAgeValid);
};

export const removeAgeValidationRule = () => {
  ValidatorForm.removeValidationRule("isAgeValid");
};
const isAddressValid = (value) => {
   
   const valueWithoutAccents = value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  
   const regex = /^[a-zA-Z0-9\s,/-]+$/; 
   return regex.test(valueWithoutAccents);
};

export const addAddressValidationRule = () => {
  ValidatorForm.addValidationRule("isAddressValid", isAddressValid);
};

export const removeAddressValidationRule = () => {
  ValidatorForm.removeValidationRule("isAddressValid");
};
export const isEmailValid = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(value);
};

export const addEmailValidationRule = () => {
  ValidatorForm.addValidationRule("isEmailValid", isEmailValid);
};

export const removeEmailValidationRule = () => {
  ValidatorForm.removeValidationRule("isEmailValid");
};
