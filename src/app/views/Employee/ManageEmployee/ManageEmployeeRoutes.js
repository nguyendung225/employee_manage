import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Employee = EgretLoadable({
  loader: () => import("./ManageEmployee"),
});
const ViewComponent = withTranslation()(Employee);
const ManageEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employee_manage/manageEmployee",
    exact: true,
    component: ViewComponent,
  },
];

export default ManageEmployeeRoutes;
