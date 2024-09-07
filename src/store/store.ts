import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import apiProductsReducer from './apiProducts/apiProductsSlice';
import formProductsReducer from './formProducts/formProductsSlice';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    apiProducts: apiProductsReducer,
    formProducts: formProductsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
