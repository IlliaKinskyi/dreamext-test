import { createSlice } from '@reduxjs/toolkit';
import { authStatus, TAuthState } from './types';
import { login } from './asyncActions';
import { getDataFromSessionStorage } from '../../utils/common';

const initialState: TAuthState = {
  token: '',
  isAuth: getDataFromSessionStorage(),
  status: authStatus.LOADING,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuth = false;
      state.token = '';
      state.status = authStatus.LOADING;
      sessionStorage.removeItem('auth');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.token = '';
        state.isAuth = false;
        state.status = authStatus.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuth = true;
        state.status = authStatus.SUCCESS;
      })
      .addCase(login.rejected, (state) => {
        state.token = '';
        state.isAuth = false;
        state.status = authStatus.ERROR;
        alert('Помилка загрузки продуктів');
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
