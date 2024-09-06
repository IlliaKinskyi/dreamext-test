import { createAsyncThunk } from '@reduxjs/toolkit';
import { Endpoints } from '../../constants/api';
import axios from 'axios';
import { TApiProductsItem } from './types';

export const getAllProducts = createAsyncThunk('apiProducts/getAllProducts', async () => {
  const { data }: { data: TApiProductsItem[] } = await axios.get(Endpoints.PRODUCTS);
  return data;
});

export const getLimitProducts = createAsyncThunk(
  'apiProducts/getLimitProducts',
  async (number: number) => {
    const { data }: { data: TApiProductsItem[] } = await axios.get(
      `${Endpoints.LIMIT_PRODUCTS}${number}`,
    );
    return data;
  },
);
