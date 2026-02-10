
import { createAction } from "@reduxjs/toolkit";
import { userSliceName, setToken, setUser, clearUser } from "@app/store/user/user.slice";
import type { AxiosResponse } from "axios";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { http } from "@shared/lib";
import type { IResponseLogin, IResponseRegisterUser } from "./user.types";
import type { IUserState } from "@app/store/user/user.types";
import { setIsLoading, setError, setIsOpen } from "@app/store/auth/auth.slice";
import { getCommunitiesAction } from "@middleware/community/community.saga";

export const postLoginUserAction = createAction<IResponseLogin>(`${userSliceName}/login`);
export const postRegisterUserAction = createAction<IResponseRegisterUser>(`${userSliceName}/register`);
export const getUserAction = createAction(`${userSliceName}/get`);
export const logoutUserAction = createAction(`${userSliceName}/logout`);

export function* loginUserSaga({ payload }: { payload: IResponseLogin }) {
  try {
    yield put(setIsLoading(true))
    const response: AxiosResponse<{ token: string }> = yield call(() =>
      http.post('/auth/login', {
        email: payload.email,
        password: payload.password
      })
    )

    yield put(setToken(response.data.token))
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("tokenTimestamp", Date.now().toString())
    if (response.data.token) {
      yield put(setIsOpen(false))
      yield put(getCommunitiesAction())
    }
    yield put(getUserAction())
    yield put(setError(null))
    yield put(setIsLoading(false))
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || "An error occurred during login"
    yield put(setError(errorMessage))
    yield put(setIsLoading(false))
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

    const tokenTimestamp = localStorage.getItem('tokenTimestamp');
    if (tokenTimestamp) {
      const tokenAge = Date.now() - parseInt(tokenTimestamp, 10);
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (tokenAge > twentyFourHours) {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimestamp');
        yield put(clearUser());
        return;
      }
    }

    if (!tokenFromStore && token) {
      yield put(setToken(token));
    }

    const response: AxiosResponse<IUserState> = yield call(() =>
      http.get('/users/me')
    )

    yield put(setUser(response.data))

  } catch (e: any) {
    console.error('Get user error:', e);
    if (e.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('tokenTimestamp');
      yield put(clearUser());
    }
  }
}

export function* signUpUserSaga({ payload }: { payload: IResponseRegisterUser }) {
  try {
    yield put(setIsLoading(true))
    const response: AxiosResponse<{ message: string }> = yield call(() =>
      http.post('/auth/registration', {
        email: payload.email,
        password: payload.password,
        userName: payload.userName
      })
    )

    yield put(setError(null))
    yield put(setIsLoading(false))
    
    yield put(postLoginUserAction({
      email: payload.email,
      password: payload.password
    }))
  } catch (e: any) {
    const errorMessage = e.response?.data?.message || e.response?.data?.errors?.[0]?.msg || "An error occurred during registration"
    yield put(setError(errorMessage))
    yield put(setIsLoading(false))
  }
}

export function* userSaga() {
  yield takeEvery(postLoginUserAction, loginUserSaga);
  yield takeEvery(postRegisterUserAction, signUpUserSaga);
  yield takeEvery(getUserAction, getUserSaga);
}