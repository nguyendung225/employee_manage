import { all } from "redux-saga/effects";
import { employeeSaga } from "./employeeSaga";
import { certificateSaga } from "./certificateSaga";
import { familySaga } from "./familySaga";
import { leaderSaga } from "./leaderSaga";
import { salarySaga } from "./salarySaga";
import { promotionSaga } from "./promotionSaga";
import { proposalSaga } from "./proposalSaga";
import { experienceSaga } from "./experienceSaga";
export function* rootSaga() {
  yield all([
    employeeSaga(),
    certificateSaga(),
    familySaga(),
    leaderSaga(),
    salarySaga(),
    promotionSaga(),
    proposalSaga(),
    experienceSaga(),
  ]);
}
