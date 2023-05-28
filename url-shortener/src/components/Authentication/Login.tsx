import { useNavigate } from 'react-router-dom';
import { REGISTER_PATH, SHORTS_PATH } from '../../constants/routes';
import styles from './Authentication.module.less';
import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useAuthenticateUserMutation } from '../../api/accountApi';
import { AuthViewModel } from '../../app/apiClients/AccountClient';
import { LOGIN_ERROR_MESSAGE } from '../../resources/authentication/login';
import { useAppDispatch } from '../../app/hooks';
import { setUser } from '../../api/userSlice';
import { jwtParseToken } from '../../helpers/jwtParseToken';
import { ACCESS_TOKEN } from '../../constants/cookies';
import { setCookies } from '../../helpers/setCookies';

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [authenticateUser] = useAuthenticateUserMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowErrorMessage(false);

    const authCredentials: AuthViewModel = {
      email: email,
      password: password,
    };

    try {
      const token: string = await authenticateUser(authCredentials).unwrap();

      const expires = new Date();
      expires.setTime(expires.getTime() + 1);

      setCookies(ACCESS_TOKEN, token, 1);
      const userData = jwtParseToken();

      dispatch(setUser(userData));

      navigate(SHORTS_PATH);
    } catch {
      setShowErrorMessage(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formTitle}>
        <h2>Sign in</h2>
        {showErrorMessage ? (
          <span className={styles.error}>{LOGIN_ERROR_MESSAGE}</span>
        ) : null}
      </div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          className={styles.formInput}
          label="Email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={styles.formInput}
          label="Password"
          type="password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.formButton}>
        <Button type="submit" variant="contained">
          Log in
        </Button>
      </div>
      <div className={styles.formLabel}>
        <span>Don't have an account? </span>
        <span onClick={() => navigate(REGISTER_PATH)} className={styles.link}>
          Sign up
        </span>
      </div>
    </form>
  );
};
