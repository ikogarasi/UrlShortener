import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { LOGIN_PATH } from '../../constants/routes';

export const AuthorizedRoute = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={LOGIN_PATH} />;
};

export default AuthorizedRoute;
