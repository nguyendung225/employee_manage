import { GENDER, SUBMIT_PROFILE_STATUS, TEAMS } from "app/constants/employeeConstants";

import { formatDate } from "utils";
export const employeesColumns = (t,action) =>{
    
  return [
 
    {
      title: t('general.action'),
      field: "custom",
      render: action, 
      align: "center",
      width: "10%",
    },
    
    { title: t('staff.code'), field: "code",  align: "center", },
    { title: t('staff.name'), field: "name" },
    {
      title: t('staff.dateOfBirth'),
      align: "center",
      field: "dateOfBirth",
      render: (rowData) => formatDate(rowData.dateOfBirth),
    },
    {
      title: t('staff.gender'),
      field: "gender",
      align: "center",
      render: (rowData) =>
        (GENDER.find((item) => item.value === rowData.gender)?.name),
    },
    {
      title: t('staff.team'),
      field: "team",
      render: (rowData) =>
        (TEAMS.find((item) => item.value === rowData.team)?.name),
    },
    {
      title: t('staff.phone'),
      field: "phone",
      align: "center",
    },
    {
      title: t('staff.email'),
      field: "email",
    },
    {
      title: t('staff.status'),
      field: "submitProfileStatus", 
   
      render: (rowData) => t(`staff.submitProfileStatus.${SUBMIT_PROFILE_STATUS.find(item=>item.value===parseInt(rowData.submitProfileStatus))?.name}`)
       
    },
  ]};