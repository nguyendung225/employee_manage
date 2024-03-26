import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Employee = EgretLoadable({
  loader: () => import("./AddEmployee"),
});
const ViewComponent = withTranslation()(Employee);
const AddEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employee_manage/addEmployee",
    exact: true,
    component: ViewComponent,
  },
];

export default AddEmployeeRoutes;
