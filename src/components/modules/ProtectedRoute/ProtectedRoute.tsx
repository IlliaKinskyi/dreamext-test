import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ isAuth, children }: { isAuth: boolean; children: ReactNode }) => {
  if (!isAuth) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
};
