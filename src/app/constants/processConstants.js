export const PROPOSAL = [
  { id: 1, name: "train" },
  { id: 2, name: "procedure" },
  { id: 3, name: "time" },
  { id: 4, name: "plan" },
];

export const ACTION_PROCESS = {
  VIEW: "1,2,3,4,5",
  EDIT: "1,4,5",
  DELETE: "1",
  NOTIFY: "4,5",
};

export const SUBMIT_PROCESS_STATUS = [
  { value: 1, name: "createNew" },
  { value: 2, name: "pending" },
  { value: 3, name: "approved" },
  { value: 4, name: "additionalRequest" },
  { value: 5, name: "reject" },
];
