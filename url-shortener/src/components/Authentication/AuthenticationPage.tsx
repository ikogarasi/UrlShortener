import styles from './Authentication.module.less';
import { useLocation } from 'react-router-dom';
import { Register } from './Register';
import { Login } from './Login';
import { LOGIN_PATH } from '../../constants/routes';

export interface AuthProps {
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
}

export const AuthenticationPage = () => {
  const location = useLocation();

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        {location.pathname === LOGIN_PATH ? <Login /> : <Register />}
      </div>
    </div>
  );
};
