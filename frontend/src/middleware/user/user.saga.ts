
import { createAction } from "@reduxjs/toolkit";
import { userSliceName, setToken, setUser, clearUser } from "@app/store/user/user.slice";
import type { AxiosResponse } from "axios";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { http } from "@shared/lib";
import type { IResponseLogin, IResponseRegisterUser } from "./user.types";
import type { UserState } from "@app/store/user/user.types";

export const postLoginUserAction = createAction<IResponseLogin>(`${userSliceName}/login`);
export const postRegisterUserAction = createAction<IResponseRegisterUser>(`${userSliceName}/register`);
export const getUserAction = createAction(`${userSliceName}/get`);
export const logoutUserAction = createAction(`${userSliceName}/logout`);

export function* loginUserSaga({ payload }: { payload: IResponseLogin }) {
  try {
    const response: AxiosResponse<{ token: string }> = yield call(() => 
      http.post('/auth/login', {
        email: payload.email,
        password: payload.password
      })
    )
    
    yield put(setToken(response.data.token))
    localStorage.setItem("token", response.data.token)
    yield put(getUserAction())

  } catch (e) {
    console.log(e)
  }
}

export function* getUserSaga() {
  try {
    const tokenFromStore: string | null = yield select((state: any) => state.user.token);
    const token = tokenFromStore || localStorage.getItem('token');
    
    if (!token) {
      console.log('No token found');
      return;
    }

    if (!tokenFromStore && token) {
      yield put(setToken(token));
    }

    const response: AxiosResponse<UserState> = yield call(() => 
      http.get('/users/me')
    )

    yield put(setUser(response.data))

  } catch (e: any) {
    console.error('Get user error:', e);
    if (e.response?.status === 401) {
      localStorage.removeItem('token');
      yield put(clearUser());
    }
  }
}

export function* userSaga() {
  yield takeEvery(postLoginUserAction, loginUserSaga);
  yield takeEvery(getUserAction, getUserSaga);
}