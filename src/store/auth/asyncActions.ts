import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Endpoints } from '../../constants/api';
import { TUser } from './types';

export const login = createAsyncThunk('auth/login', async (user: TUser) => {
  const { data } = await axios.post(Endpoints.LOGIN, user);
  sessionStorage.setItem('auth', 'true');
  return data;
});
