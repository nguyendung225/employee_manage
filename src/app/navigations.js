import ConstantList from "./appConfig";
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
    children: [
      {
        name: "Dashboard.employee_manage.add",
        isVisible:true,
        path: ConstantList.ROOT_PATH + "employee_manage/addEmployee",
        icon: "keyboard_arrow_right"
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
  }
];
