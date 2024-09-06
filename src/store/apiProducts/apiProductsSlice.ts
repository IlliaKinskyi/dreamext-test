import { createSlice } from '@reduxjs/toolkit';
import { apiStatus, TApiProductsState } from './types';
import { getAllProducts, getLimitProducts } from './asyncActions';

const initialState: TApiProductsState = {
  items: [],
  status: apiStatus.LOADING,
};
const apiProductsSlice = createSlice({
  name: 'apiProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = apiStatus.LOADING;
        state.items = [];
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = apiStatus.SUCCESS;
      })
      .addCase(getAllProducts.rejected, (state) => {
        state.status = apiStatus.ERROR;
        state.items = [];
        alert('Помилка загрузки продуктів');
      })
      .addCase(getLimitProducts.pending, (state) => {
        state.status = apiStatus.LOADING;
        state.items = [];
      })
      .addCase(getLimitProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = apiStatus.SUCCESS;
      })
      .addCase(getLimitProducts.rejected, (state) => {
        state.status = apiStatus.ERROR;
        state.items = [];
        alert('Помилка загрузки продуктів');
      });
  },
});

export default apiProductsSlice.reducer;
