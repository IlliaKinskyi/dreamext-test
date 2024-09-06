import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIdType, formStatus, TFormProductsItem, TFormProductsState } from './types';
import { TProductCreationSchema } from '../../validations/productCreationSchema';
import { getDataFromLocalStorage } from '../../utils/common';
import { addFormProduct, deleteFormProduct, updateFormProduct } from './asyncActions';

const initialState: TFormProductsState = {
  items: getDataFromLocalStorage(),
  status: formStatus.LOADING,
};
const formProductsSlice = createSlice({
  name: 'apiProducts',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<TProductCreationSchema>) {
      let newItem: TFormProductsItem = {
        id: state.items.length + 1000000,
        title: action.payload.title,
        price: action.payload.price,
        description: action.payload.description,
        published: action.payload.published,
        created: new Date().toString(),
      };

      state.items.push(newItem);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    removeProduct(state, action: PayloadAction<TIdType>) {
      state.items = state.items.filter((item) => item.id != action.payload);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    updateProduct(state, action: PayloadAction<TFormProductsItem>) {
      let updatedProduct: TFormProductsItem = {
        id: action.payload.id,
        title: action.payload.title,
        price: action.payload.price,
        description: action.payload.description,
        published: action.payload.published,
        created: action.payload.created,
      };

      state.items = state.items.filter((item) => item.id !== updatedProduct.id);
      state.items.push(updatedProduct);

      localStorage.setItem('products', JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addFormProduct.pending, (state) => {
        state.status = formStatus.LOADING;
        state.items = [];
      })
      .addCase(addFormProduct.fulfilled, (state) => {
        state.status = formStatus.SUCCESS;
      })
      .addCase(addFormProduct.rejected, (state) => {
        state.status = formStatus.ERROR;
        state.items = [];
        alert('Помилка додавання продукта');
      })
      .addCase(updateFormProduct.pending, (state) => {
        state.status = formStatus.LOADING;
      })
      .addCase(updateFormProduct.fulfilled, (state) => {
        state.status = formStatus.SUCCESS;
      })
      .addCase(updateFormProduct.rejected, (state) => {
        state.status = formStatus.ERROR;
        alert('Помилка редагування продукта');
      })
      .addCase(deleteFormProduct.pending, (state) => {
        state.status = formStatus.LOADING;
      })
      .addCase(deleteFormProduct.fulfilled, (state) => {
        state.status = formStatus.SUCCESS;
      })
      .addCase(deleteFormProduct.rejected, (state) => {
        state.status = formStatus.ERROR;
        alert('Помилка видалення продукта');
      });
  },
});

export const { addProduct, removeProduct, updateProduct } = formProductsSlice.actions;

export default formProductsSlice.reducer;
