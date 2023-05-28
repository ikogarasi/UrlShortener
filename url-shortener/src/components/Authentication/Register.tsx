import { Button, TextField } from '@mui/material';
import styles from './Authentication.module.less';
import { LOGIN_PATH } from '../../constants/routes';
import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import {
  CONFIRM_PASSWORD_VALIDATE_ERROR,
  EMAIL_VALIDATE_ERROR,
  PASSWORD_VALIDATE_ERROR,
  USERNAME_VALIDATE_ERROR,
} from '../../resources/authentication/register';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../constants/regex';
import { useAuthorizeUserMutation } from '../../api/accountApi';

interface ValidationErrors {
  email: boolean;
  username: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [username, setUserName] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>();
  const [register] = useAuthorizeUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validation: ValidationErrors = {
      email: false,
      username: false,
      password: false,
      confirmPassword: false,
    };

    setValidationErrors(validation);

    if (username?.length < 4) {
      validation.username = true;
    }

    if (!email.match(EMAIL_REGEX)) {
      validation.email = true;
    }

    if (!password.match(PASSWORD_REGEX)) {
      validation.password = true;
    }

    if (password !== confirmPassword) {
      validation.confirmPassword = true;
    }

    if (Object.values(validation).indexOf(true) >= 0) {
      setValidationErrors(validation);
    } else {
      await register({
        email: email,
        userName: username,
        password: password,
      });
      navigate(LOGIN_PATH);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          className={styles.formInput}
          label="Email"
          variant="standard"
          onChange={(e) => setEmail(e.target.value)}
          helperText={validationErrors?.email ? EMAIL_VALIDATE_ERROR : ''}
          error={validationErrors?.email}
        />
        <TextField
          className={styles.formInput}
          label="Username"
          variant="standard"
          onChange={(e) => setUserName(e.target.value)}
          helperText={validationErrors?.username ? USERNAME_VALIDATE_ERROR : ''}
          error={validationErrors?.username}
        />
        <TextField
          className={styles.formInput}
          label="Password"
          type="password"
          variant="standard"
          onChange={(e) => setPassword(e.target.value)}
          helperText={validationErrors?.password ? PASSWORD_VALIDATE_ERROR : ''}
          error={validationErrors?.password}
        />
        <TextField
          className={styles.formInput}
          label="Confirm Password"
          type="password"
          variant="standard"
          onChange={(e) => setConfirmPassword(e.target.value)}
          helperText={
            validationErrors?.confirmPassword
              ? CONFIRM_PASSWORD_VALIDATE_ERROR
              : ''
          }
          error={validationErrors?.confirmPassword}
        />
      </div>
      <div className={styles.formButton}>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </div>
      <div className={styles.formLabel}>
        <span>Already have an account? </span>
        <span onClick={() => navigate(LOGIN_PATH)} className={styles.link}>
          Sign in
        </span>
      </div>
    </form>
  );
};
