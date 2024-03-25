import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./views/home/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import ConstantList from "./appConfig";
import AddEmployeeRoutes from "./views/Employee/AddEmployee/AddEmployeeRoutes";
import LeadershipPendingRoutes from "./views/Leader/LeadershipPending/LeadershipPendingRoutes";

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />,
  },
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />,
  },
];

const routes = [
  ...homeRoutes,
  ...sessionRoutes,
  ...dashboardRoutes,
  ...AddEmployeeRoutes,
  ...LeadershipPendingRoutes,
  ...errorRoute,
];

export default routes;
