//store
import rootSaga from '@middleware/root.saga';
import createSagaMiddleware from '@redux-saga/core';

import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from './root.reducer';
const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga);
