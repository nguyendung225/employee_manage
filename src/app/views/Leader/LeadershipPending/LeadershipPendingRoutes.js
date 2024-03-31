import { EgretLoadable } from "egret";
import ConstantList from "../../../appConfig";
import { useTranslation, withTranslation, Trans } from "react-i18next";
const Employee = EgretLoadable({
  loader: () => import("./LeadershipPending"),
});
const ViewComponent = withTranslation()(Employee);
const LeadershipPendingRoutes = [
  {
    path: ConstantList.ROOT_PATH + "leader/leadershipPending",
    exact: true,
    component: ViewComponent,
  },
];

export default LeadershipPendingRoutes;
 
