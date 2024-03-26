import ConstantList from "./appConfig";
import { authRoles } from "./auth/authRoles";
export const navigations = [
  {
    name: "Dashboard.dashboard",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "dashboard/analytics",
    isVisible:true,
  }
    
  ,{
    name: "Dashboard.manage",
    isVisible:true,
    icon: "engineering",
    role: authRoles.user,
    children: [
      {
        name: "Dashboard.employee_manage.add",
        isVisible:true,
        path: ConstantList.ROOT_PATH + "employee_manage/addEmployee",
        icon: "keyboard_arrow_right",
        role:authRoles.user
      },
      {
        name: "Dashboard.employee_manage.title",
        isVisible:true,
        path: ConstantList.ROOT_PATH + "employee_manage/manageEmployee",
        icon: "keyboard_arrow_right"
      },
      {
        name: "Dashboard.employee_manage.end",
        isVisible:true,
        path: ConstantList.ROOT_PATH + "employee_manage/manageEmployee",
        icon: "keyboard_arrow_right"
      },
    ]
  },
  {
    name: "Dashboard.leader.title",
    isVisible: true,
    icon: "engineering",
    role: authRoles.manage,
    children: [
      {
        name: "Dashboard.leader.pending",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "leader/leadershipPending",
      },
      {
        name: "Dashboard.leader.approved",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "leader/leadershipApproved", 
      },
    ],
  },
 
];
