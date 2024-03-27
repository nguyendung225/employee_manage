import {
  GENDER,
  POSITIONS,
  RELATIONSHIP,
  STATUS_EMPLOYEE,
  STATUS_PROCESS,
  SUBMIT_PROFILE_STATUS,
  TEAMS,
} from "app/constants/employeeConstants";
import { PROPOSAL, SUBMIT_PROCESS_STATUS } from "app/constants/processConstants";

import { formatCurrency, formatDate } from "utils";
export const employeesColumns = (t, action) => [
  {
    title: t("general.action"),
    field: "custom",
    render: action,
    align: "center",
    width: "10%",
  },

  { title: t("staff.code"), field: "code", align: "center" },
  { title: t("staff.name"), field: "name" },
  {
    title: t("staff.dateOfBirth"),
    align: "center",
    field: "dateOfBirth",
    render: (rowData) => formatDate(rowData.dateOfBirth),
  },
  {
    title: t("staff.gender.title"),
    field: "gender",
    align: "center",
    render: (rowData) =>
      t(`staff.gender.${GENDER.find((item) => item.value === rowData.gender)?.name}`),
  },
  {
    title: t("staff.team"),
    field: "team",
    render: (rowData) =>
      TEAMS.find((item) => item.value === rowData.team)?.name,
  },
  {
    title: t("staff.phone"),
    field: "phone",
    align: "center",
  }, 
  {
    title: t("staff.email"),
    field: "email",
  },
  {
    title: t("staff.status"),
    field: "submitProfileStatus",

    render: (rowData) =>
      t(
        `staff.submitProfileStatus.${
          SUBMIT_PROFILE_STATUS.find(
            (item) => item.value === +(rowData.submitProfileStatus)
          )?.name
        }`
      ),
  },
];

export const certificatesColoums = (t, action) => [
  {
    title: t("general.action"),
    field: "custom",
    render: action,
    align: "center",
  },

  { title: "Tên văn bằng", field: "certificateName" },
  {
    title: "Ngày cấp",
    align: "center",
    field: "issueDate",
    render: (rowData) => formatDate(rowData.issueDate),
  },
  { title: "Lĩnh vực", field: "field" },
  { title: "Nội dung", field: "content" },
];


export const familyColoums = (t,action) => [
  {
    title: t("general.action"),
    field: "custom",
    render: action,
    align: "center",
  },

  { title: t('family.name'), field: "name" },
  {
    title: t('family.dateOfBirth'),
    align: "center",
    field: "dateOfBirth",
    render: (rowData) => formatDate(rowData.dateOfBirth),
  },
  {
    title: t('family.gender'),
    field: "gender",
    render: (rowData) =>
      t(`staff.gender.${GENDER.find((item) => item.value === rowData.gender)?.name}`),
  },
  { title: t('family.phoneNumber'), field: "phoneNumber" },
  { title: "CCCD", field: "citizenIdentificationNumber" },
  {
    title: t('family.relationShip.title'),
    field: "relationShip",
    render: (rowData) =>
      t(`family.relationShip.${RELATIONSHIP.find((item) => item.value === rowData.relationShip)?.name}`),
  },
  { title: "Email", field: "email" },
  {
    title: t('family.address'),
    field: "address",
    render: (rowData) =>
      rowData.address?.length > 45
        ? rowData.address?.slice(0, 45) + "..."
        : rowData.address,
  },
];



export const salaryColoums = (t,action) => [
  {
    title: "Thao tác",
    field: "custom",
    render: action,
    align: "center",
  },
  
  {
    title: "Ngày tăng lương",
    align: "center",
    field: "startDate",
    render: (rowData) => formatDate(rowData.startDate),
  },

  { title: "Mức lương cũ", field: "oldSalary", align: "center",render:rowData=>(
    formatCurrency(rowData.oldSalary)
  ) },
  { title: "Mức lương mới", field: "newSalary", align: "center",render:rowData=>(
    formatCurrency(rowData.newSalary)
  )},
  { title: "Lý do", field: "reason",render:(rowData)=>(
    rowData.reason?.length>45?  rowData.reason?.slice(0,45)+'...':  rowData.reason ) },
  { title: "Ghi chú", field: "note",render:(rowData)=>(
    rowData.note?.length>45?  rowData.note?.slice(0,45)+'...':  rowData.note ) },
  {
    title: "Trạng thái",
    field: "salaryIncreaseStatus",
    render: (rowData) =>
    t(
      `process.processStatus.${
        SUBMIT_PROCESS_STATUS.find(
          (item) => item.value === +rowData.salaryIncreaseStatus
        )?.name
      }`
    ),
  },
];

export const promotionColoums = (action) => [
  {
    title: "Thao tác",
    field: "custom",
    render: action,
    align: "center",
  },
  
  {
    title: "Ngày thăng chức",
    align: "center",
    field: "promotionDay",
    render: (rowData) => formatDate(rowData.promotionDay),
  },

  {
    title: "Vị trí cũ",
    field: "currentPosition",
    render: (rowData) =>
      POSITIONS.find((item) => item.id === rowData.currentPosition)?.name,
  },
  {
    title: "Vị trí mới",
    field: "newPosition",
    render: (rowData) =>
      POSITIONS.find((item) => item.id === rowData.newPosition)?.name,
  },
 
  { title: "Ghi chú", field: "note",render:(rowData)=>(
    rowData.note?.length>45?  rowData.note?.slice(0,45)+'...':  rowData?.note ) },
  {
    title: "Trạng thái",
    field: "processStatus",
    render: (rowData) => SUBMIT_PROCESS_STATUS.find(item=>item.value===+rowData.processStatus)?.name,
  },
];

export const proposalColoums = (action) => [
  {
    title: "Thao tác",
    field: "custom",
    render: action,
    align: "center",
  }, 
  
  {
    title: "Ngày đề xuất",
    field: "proposalDate",
    align: "center",
    render: (rowData) => formatDate(rowData.proposalDate),
  },
  
  {
    title: "Loại đề xuất",
    field: "type",
      align: "center",
    render: (rowData) =>
      PROPOSAL.find((item) => item.id === rowData.type)?.name,
  },
  { title: "Ghi chú", field: "note",render:(rowData)=>(
    rowData.note?.length>45?  rowData.note?.slice(0,45)+'...':  rowData.note ) },
  { title: "Nội dung", field: "content",render:(rowData)=>(
    rowData?.content?.length>45?  rowData?.content?.slice(0,45)+'...':  rowData?.content ) },
  { title: "Mô tả", field: "detailedDescription",render:(rowData)=>(
    rowData.detailedDescription?.length>45?  rowData.detailedDescription?.slice(0,45)+'...':  rowData.detailedDescription ) }, 
  {
    title: "Trạng thái",
    field: "proposalStatus",
    render: (rowData) => SUBMIT_PROCESS_STATUS.find(item=>item.value===+rowData.proposalStatus)?.name,
  },
];
