import axios from 'axios';
import { Endpoints } from '../../constants/api';
import { TFormProductsItem } from './types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addProduct, removeProduct, updateProduct } from './formProductsSlice';

export const addFormProduct = createAsyncThunk(
  'formProducts/addProduct',
  async ({ product }: { product: TFormProductsItem }, { dispatch }) => {
    const { data } = await axios.post(Endpoints.PRODUCTS, {
      title: product.title,
      price: product.price,
      description: product.description,
      image: '',
      category: 'AddedProducts',
    });

    dispatch(addProduct(product));
    return data;
  },
);

export const updateFormProduct = createAsyncThunk(
  'formProducts/updateFormProduct',
  async (updatedProduct: TFormProductsItem, { dispatch }) => {
    const { data } = await axios.put(`${Endpoints.PRODUCTS}/${updatedProduct.id}`, {
      title: updatedProduct.title,
      price: updatedProduct.price,
      description: updatedProduct.description,
      image: '',
      category: 'UpdatedProducts',
    });
    dispatch(updateProduct(updatedProduct));
    return data;
  },
);

export const deleteFormProduct = createAsyncThunk(
  'formProducts/deleteProduct',
  async (id: string | number, { dispatch }) => {
    const { data } = await axios.delete(`${Endpoints.PRODUCTS}/${id}`);
    dispatch(removeProduct(id));
    return data;
  },
);
