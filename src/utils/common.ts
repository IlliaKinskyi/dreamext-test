import { TFormProductsItem } from '../store/formProducts/types';

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem('products');
  const products: TFormProductsItem[] = data ? JSON.parse(data) : [];

  return products;
};
