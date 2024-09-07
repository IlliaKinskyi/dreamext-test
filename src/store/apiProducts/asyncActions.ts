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
  async ({ numberProducts, sortBy }: { numberProducts: number; sortBy: string }) => {
    const { data }: { data: TApiProductsItem[] } = await axios.get(
      `${Endpoints.LIMIT_PRODUCTS}${numberProducts}`,
    ); // fakestoreapi може отримувати тільки один параметр запиту. Фільтрувати може тільки за назвою. Тому отримуємо необхідну кількість товарів і фільтруємо тут. При використанні реального API відправляли би у цьому запиті всі параметри фільтрів.

    const filteredData = data.sort((a, b) => {
      if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      } else return a.price - b.price;
    });

    return filteredData;
  },
);
