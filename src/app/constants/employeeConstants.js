export const GENDER = [
  { value: 0, name: "male" },
  { value: 1, name: "female" },
  { value: 2, name: "other" },
];

export const STATUS_EMPLOYEE = {
  ADD: "1,2,4,5",
  PENDING: "2,6",
  MANAGE: "3,6,8,9",
  END:'0,7',
};
export const SUBMIT_PROFILE_STATUS = [
  { value: 0, name: "save" },
  { value: 1, name: "createNew" },
  { value: 2, name: "pending" },
  { value: 3, name: "approved" },
  { value: 4, name: "additionalRequest" },
  { value: 5, name: "reject" },
  { value: 6, name: "pendingEnd" },
  { value: 7, name: "approvedEnd" },
  { value: 8, name: "additionalRequestEnd" },
  { value: 9, name: "rejectEnd" },
];
export const TEAMS = [ 
  { value: 0, name: "Frontend" },
  { value: 1, name: "Backend" },
  { value: 2, name: "BA" },
  { value: 3, name: "Tester" },
];

export const ACTION_EMPLOYEE = {
  VIEW: "2,3,5,6",
  EDIT: "1,4,5,3,8,9",
  DELETE: "1",
  NOTIFY: "4,5",
  PENDING_END: "6",
  END:'7'
};

export const TAB_EMPLOYEE = 0;
export const TAB_CERTIFICATE = 1;
export const TAB_FAMILY = 2;

export const TAB_CV = 0;
export const TAB_PERSONAL_BACKGROUND = 1;
export const TAB_CERTIFICATE_INFO = 2;

export const TAB_PENDING_REGISTER = 0;
export const TAB_PENDING_SALARY = 1;
export const TAB_PENDING_PROMOTION = 2;
export const TAB_PENDING_PROPOSAL = 3;

export const TAB_SALARY = 0;
export const TAB_PROMOTION = 1;
export const TAB_PROPOSAL = 2;

export const RELATIONSHIP = [
  {
    value: 0,
    name: "father",
  },
  {
    value: 1,
    name: "mother",
  },
  {
    value: 2,
    name: "olderBrother",
  },
  {
    value: 3,
    name: "youngerBrother",
  },
  {
    value: 4,
    name: "olderSister",
  },
  {
    value: 5,
    name: "youngerSister",
  },
  {
    value: 6,
    name: "grandFather",
  },
  {
    value: 7,
    name: "grandma",
  },
  {
    value: 8,
    name: "wife/husband",
  },
  {
    value: 9,
    name: "other",
  },
];

export const POSITIONS = [
  { id: 1, name: "staff" },
  { id: 2, name: "generalinchief" },
  { id: 3, name: "deputyDepartment" },
  { id: 4, name: "manager" },
  { id: 5, name: "viceDirector" },
  { id: 6, name: "leaderFontend" },
  { id: 7, name: "LeaderBackend" },
  { id: 8, name: "LeaderBA" },
  { id: 9, name: "LeaderTester" },
];

export const ACTION_PROCESS = {
  VIEW: "1,2,3,4,5",
  EDIT: "1,4,5",
  DELETE: "1",
  NOTIFY: "4,5",
};

export const PROPOSAL = [
  { id: 1, name: "train" },
  { id: 2, name: "procedure" },
  { id: 3, name: "time" },
  { id: 4, name: "plan" },
];

export const SUBMIT_PROCESS_STATUS = [
  { value: 1, name: "createNew" },
  { value: 2, name: "pending" },
  { value: 3, name: "approved" },
  { value: 4, name: "additionalRequest" },
  { value: 5, name: "reject" },
];
