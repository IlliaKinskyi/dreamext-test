import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import axios from 'axios';
import { API_BASE_URL } from './constants/api';
import ProductPage from './pages/ProductPage/ProductPage';
import { NAV_URL } from './components/modules/Content/global';
import ProductCreationPage from './pages/ProductCreationPage/ProductCreationPage';
import SecretPage from './pages/SecretPage/SecretPage';
import { useSelector } from 'react-redux';
import { selectAuthData } from './store/auth/selectors';
import { ProtectedRoute } from './components/modules/ProtectedRoute/ProtectedRoute';

function App() {
  const { isAuth } = useSelector(selectAuthData);
  const navigate = useNavigate();
  axios.defaults.baseURL = API_BASE_URL;

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<HomePage />} />
        <Route path={`${NAV_URL.PRODUCT_PAGE}`} element={<ProductsPage />} />
        <Route path={`${NAV_URL.PRODUCT}:id`} element={<ProductPage />} />
        <Route path={`${NAV_URL.ADD_PROTUDCT}`} element={<ProductCreationPage />} />
        <Route path={`${NAV_URL.ADD_PROTUDCT}`} element={<ProductCreationPage />} />
        <Route
          path={`${NAV_URL.SECRET}`}
          element={
            <ProtectedRoute isAuth={isAuth}>
              <SecretPage />{' '}
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<Navigate to='' replace />} />
      </Route>
    </Routes>
  );
}

export default App;
