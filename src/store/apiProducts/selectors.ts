import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TApiProductsItem } from './types';

export const selectApiProductsData = (state: RootState) => state.apiProducts;

export const selectApiProducts = (state: RootState) => state.apiProducts.items;

export const selectApiProductsFiltered = createSelector(
  [
    selectApiProducts,
    (selectApiProducts, numberProducts: number, sortBy: string, showPublished: boolean) =>
      numberProducts,
    (selectApiProducts, numberProducts: number, sortBy: string, showPublished: boolean) => sortBy,
    (selectApiProducts, numberProducts: number, sortBy: string, showPublished: boolean) =>
      showPublished,
  ],
  (products: TApiProductsItem[], numberProducts, sortBy, showPublished) => {
    const filteredProducts = [...products].sort((a, b) => {
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

    return filteredProducts;
  },
);
