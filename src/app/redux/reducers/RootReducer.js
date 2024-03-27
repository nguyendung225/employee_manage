import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";
import LayoutReducer from "./LayoutReducer";
import ScrumBoardReducer from "./ScrumBoardReducer";
import NotificationReducer from "./NotificationReducer";
import EcommerceReducer from "./EcommerceReducer";
import EmployeeReducer from "./EmployeeReducer";
import certificateReducer from "./CertificateReducer";
import familyReducer from "./FamilyReducer";
import LeaderReducer from "./LeaderReducer";
import salaryReducer from "./SalaryReducer";
import promotionReducer from "./PromotionReducer";
import proposalReducer from "./ProposalReducer";


const RootReducer = combineReducers({
  login: LoginReducer,
  user: UserReducer,
  layout: LayoutReducer,
  scrumboard: ScrumBoardReducer,
  notification: NotificationReducer,
  ecommerce: EcommerceReducer,

  employee:EmployeeReducer,
  certificate:certificateReducer,
  family:familyReducer,
  leader:LeaderReducer,
  salary:salaryReducer,
  promotion:promotionReducer,
  proposal:proposalReducer,
  
});

export default RootReducer;
