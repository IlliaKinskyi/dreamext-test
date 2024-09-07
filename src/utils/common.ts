import { TFormProductsItem } from '../store/formProducts/types';

export const getDataFromLocalStorage = () => {
  const data = localStorage.getItem('products');
  const products: TFormProductsItem[] = data ? JSON.parse(data) : [];

  return products;
};

export const getDataFromSessionStorage = () => {
  const data = sessionStorage.getItem('auth');
  const isAuth: boolean = data ? JSON.parse(data) : false;

  return isAuth;
};
