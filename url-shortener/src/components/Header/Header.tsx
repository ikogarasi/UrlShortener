import { NavLink } from 'react-router-dom';
import styles from './Header.module.less';
import { ABOUT_PATH, LOGIN_PATH, SHORTS_PATH } from '../../constants/routes';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { cleanUser } from '../../api/userSlice';

export const Header = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const onLogOutClick = () => {
    dispatch(cleanUser());
    setTimeout(window.location.reload.bind(window.location), 500);
  };

  return (
    <nav className={styles.header}>
      <div className={styles.headerLeft}>
        <ul className={styles.headerNavigation}>
          <li>
            <NavLink className={styles.link} to={ABOUT_PATH}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to={SHORTS_PATH}>
              Short URL
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.headerRight}>
        <ul className={styles.headerNavigation}>
          {!user.isAuthenticated ? (
            <li>
              <NavLink className={styles.link} to={LOGIN_PATH}>
                Sign in
              </NavLink>
            </li>
          ) : (
            <>
              <li>Hello, {user.userData.userName}!</li>
              {user.userData.role === 'ADMIN' ? (
                <li className={styles.adminLabel}>ADMIN</li>
              ) : null}
              <li>
                <span className={styles.link} onClick={() => onLogOutClick()}>
                  Log out
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
