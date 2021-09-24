import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosBackendInstance from '../shared/axios/axiosBackendInstance';

/* eslint-disable no-unused-expressions, no-param-reassign */

const initialState = {
  authToken: null, isAuthenticated: false, isLoading: false, isError: false, error: null, user: null
};

export const signIn = createAsyncThunk(
  'authentications/signIn',
  async (data) => {
    const response = await axiosBackendInstance.post(
      '/auth', qs.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    )
      .catch((error) => Promise.reject(new Error(error.response.data.code)));

    return response.data;
  },
);

export const signInOmniauth = createAsyncThunk(
  'authentications/signInOmniauth',
  async (data) => {
    const response = await axiosBackendInstance.post(
      '/omniauth', qs.stringify({
        omniauth: data,
      }),
    )
      .catch((error) => Promise.reject(new Error(error.response.data.code || error.response.data.error)));

    return response.data;
  },
);

export const logOut = createAsyncThunk(
  'authentications/logOut',
  async () => {
    await axiosBackendInstance.delete('/auth')
      .then((res) => {
        AsyncStorage.removeItem('AccessToken')
        res;
      })
      .catch((error) => Promise.reject(new Error(error.response.data.code)));
  },
);

const authenticationsSlice = createSlice({
  name: 'authentications',
  initialState,
  reducers: {
    resetError(state) {
      state.isError = false;
      state.error = null;
    }
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.isLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.authToken = action.payload.access_token
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user
    },
    [signIn.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isError = true;
      state.isLoading = false;
      state.error = action.error.message;
    },
    [signInOmniauth.pending]: (state) => {
      state.isLoading = true;
    },
    [signInOmniauth.fulfilled]: (state, action) => {
      state.authToken = action.payload.access_token
      state.isAuthenticated = true;
      state.isLoading = false;
      state.user = action.payload.user
    },
    [signInOmniauth.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isError = true;
      state.isLoading = false;
      state.error = action.error.message;
    },
    [logOut.pending]: (state) => {
      state.isLoading = true;
    },
    [logOut.fulfilled]: () => initialState,
    [logOut.rejected]: (state, action) => {
      state.isAuthenticated = true;
      state.isError = true;
      state.error = action.error.message;
    },
  },
});

export const { resetError } = authenticationsSlice.actions;
export default authenticationsSlice.reducer;
