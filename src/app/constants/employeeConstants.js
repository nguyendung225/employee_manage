
export const GENDER = [{value: 0, name:"male" }, { value:1, name:"female" }, {value: 2,name: "other" }];

export const STATUS_EMPLOYEE = {
  ADD: "1,2,4,5",
};
export const SUBMIT_PROFILE_STATUS = [
  { value: 0, name:"save" },
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

export const ACTION_EMPLOYEE={
  VIEW:'2,3',
  EDIT:'1,4,5',
  DELETE:'1',
  NOTIFY:'4,5'
}


export const TAB_EMPLOYEE = 0;
export const TAB_CERTIFICATE = 1;
export const TAB_FAMILY = 2;

// export const TAB_CV=0
// export const TAB_PROFILE=1
// export const TAB_CERTIFICATE_= 3;

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
  { id: 1, name: "Nhân viên" },
  { id: 2, name: "Trưởng phòng" },
  { id: 3, name: "Phó phòng" },
  { id: 4, name: "Giám đốc" },
  { id: 5, name: "Phó giám đốc" },
  { id: 6, name: "Trưởng nhóm Fontend" },
  { id: 7, name: "Trưởng nhóm Backend" },
  { id: 8, name: "Trưởng nhóm BA" },
  { id: 9, name: "Trưởng nhóm Tester" },
];

export const PROPOSAL = [
  { id: 1, name: "Đào tạo" },
  { id: 2, name: "Quy trình" },
  { id: 3, name: "Thời gian" },
  { id: 4, name: "Kế hạch" },
];

