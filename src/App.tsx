import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import axios from 'axios';
import { API_BASE_URL } from './constants/api';
import ProductPage from './pages/ProductPage/ProductPage';
import { NAV_URL } from './components/modules/Content/global';
import ProductCreationPage from './pages/ProductCreationPage/ProductCreationPage';

function App() {
  axios.defaults.baseURL = API_BASE_URL;

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<HomePage />} />
        <Route path={`${NAV_URL.PRODUCT_PAGE}`} element={<ProductsPage />} />
        <Route path={`${NAV_URL.PRODUCT}:id`} element={<ProductPage />} />
        <Route path={`${NAV_URL.ADD_PROTUDCT}`} element={<ProductCreationPage />} />
        <Route path='*' element={<Navigate to='' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
