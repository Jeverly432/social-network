import { all, fork } from 'redux-saga/effects';
import { userSaga } from './user/user.saga';
import { communitySaga } from './community/community.saga';

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(communitySaga)
  ])
}