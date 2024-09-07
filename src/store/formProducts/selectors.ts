import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TFormProductsItem } from './types';

export const selectFormProducts = (state: RootState) => state.formProducts.items;

export const selectFormProductsFiltered = createSelector(
  [
    selectFormProducts,
    (selectFormProducts, numberProducts: number, sortBy: string, showPublished: boolean) =>
      numberProducts,
    (selectFormProducts, numberProducts: number, sortBy: string, showPublished: boolean) => sortBy,
    (selectFormProducts, numberProducts: number, sortBy: string, showPublished: boolean) =>
      showPublished,
  ],
  (products: TFormProductsItem[], numberProducts, sortBy, showPublished) => {
    const filteredProducts = [...products]
      .filter((item) => item.published === showPublished)
      .sort((a, b) => {
        if (sortBy === 'price-desc') {
          return parseFloat(b.price) - parseFloat(a.price);
        }
        if (sortBy === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        if (sortBy === 'title-desc') {
          return b.title.localeCompare(a.title);
        } else return parseFloat(a.price) - parseFloat(b.price);
      })
      .slice(0, numberProducts);

    return filteredProducts;
  },
);

export const selectFormProduct = (id: number) => (state: RootState) =>
  state.formProducts.items.find((item) => id === item.id);
