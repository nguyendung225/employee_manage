
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