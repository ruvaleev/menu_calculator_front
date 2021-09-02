import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosBackendInstance from '../shared/axiosBackendInstance';

/* eslint-disable no-unused-expressions, no-param-reassign */

const initialState = {
  isAuthenticated: false, isLoading: false, isError: false, error: null,
};

export const signIn = createAsyncThunk(
  'authentications/signIn',
  async (data) => {
    await axiosBackendInstance.post(
      '/auth', qs.stringify({
        user: {
          email: data.email,
          password: data.password,
        },
      }),
    )
      .then((res) => {
        AsyncStorage.setItem('AccessToken', res.data.access_token);
        res
      })
      .catch((error) => Promise.reject(new Error(error.response.data.code)));
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
    [signIn.fulfilled]: () => ({
      ...initialState,
      isAuthenticated: true,
    }),
    [signIn.rejected]: (state, action) => {
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
