import { RootState } from '../store';

export const selectFormProductsData = (state: RootState) => state.formProducts;
export const selectFormProduct = (id: number) => (state: RootState) =>
  state.formProducts.items.find((item) => id === item.id);
