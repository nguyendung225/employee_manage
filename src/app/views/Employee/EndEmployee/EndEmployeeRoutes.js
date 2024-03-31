import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const EndEmployee = EgretLoadable({
  loader: () => import("./EndEmployee"),
});
const ViewComponent = withTranslation()(EndEmployee);
const EndEmployeeRoutes = [
  {
    path: ConstantList.ROOT_PATH + "employee_manage/endEmployee",
    exact: true,
    component: ViewComponent,
  },
];

export default EndEmployeeRoutes;
