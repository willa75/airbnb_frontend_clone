import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const ProtectedRoutes = () => {
  const { isAuthenticated } =  useAuth();

  return (
    isAuthenticated ? <Outlet/> : <Navigate to="/register"/>
  );
};

export default ProtectedRoutes;
