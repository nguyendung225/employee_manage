import { all } from "redux-saga/effects";
import { employeeSaga } from "./employeeSaga";
import { certificateSaga } from "./certificateSaga";
import { familySaga } from "./familySaga";
export function* rootSaga() {
  yield all([
    employeeSaga(),
    certificateSaga(),
    familySaga()
  ]);
}
