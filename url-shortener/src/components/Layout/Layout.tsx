import { Outlet, useLocation } from 'react-router-dom';
import { LOGIN_PATH, REGISTER_PATH } from '../../constants/routes';
import { Header } from '../Header/Header';

export const Layout = () => {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== LOGIN_PATH && pathname !== REGISTER_PATH ? (
        <Header />
      ) : null}
      <Outlet />
    </>
  );
};
