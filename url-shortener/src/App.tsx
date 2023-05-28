import { Route, Routes } from 'react-router-dom';
import styles from './App.module.less';
import {
  ABOUT_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
  SHORTS_PATH,
  URL_INFO_PATH,
} from './constants/routes';
import { AuthenticationPage } from './components/Authentication/AuthenticationPage';
import { About } from './components/About/About';
import AuthorizedRoute from './components/RouteWrapper/AuthorizedRoute';
import { UrlShorts } from './components/UrlShorts/UrlShorts';
import { getCookie } from './helpers/getCookie';
import { ACCESS_TOKEN } from './constants/cookies';
import { jwtParseToken } from './helpers/jwtParseToken';
import { UserData, setUser } from './api/userSlice';
import { useAppDispatch } from './app/hooks';
import { UrlShortInfo } from './components/UrlShortInfo/UrlShortInfo';
import { Layout } from './components/Layout/Layout';

export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const token = getCookie(ACCESS_TOKEN);

  if (token) {
    const userData: UserData = jwtParseToken();

    dispatch(setUser(userData));
  }
};

export const App = () => {
  useAuthentication();

  return (
    <div className={styles.main}>
      <Routes>
        <Route path={LOGIN_PATH} element={<AuthenticationPage />} />
        <Route path={REGISTER_PATH} element={<AuthenticationPage />} />
        <Route element={<Layout />}>
          <Route path={ABOUT_PATH} element={<About />} />
          <Route path={SHORTS_PATH} element={<UrlShorts />} />
          <Route element={<AuthorizedRoute />}>
            <Route path={URL_INFO_PATH} element={<UrlShortInfo />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
