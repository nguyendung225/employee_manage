import {
  GENDER,
  RELATIONSHIP,
  SUBMIT_PROFILE_STATUS,
  TEAMS,
} from "app/constants/employeeConstants";

import { formatDate } from "utils";
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
            (item) => item.value === parseInt(rowData.submitProfileStatus)
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
