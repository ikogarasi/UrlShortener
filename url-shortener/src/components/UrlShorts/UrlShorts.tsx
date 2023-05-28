import { useAppSelector } from '../../app/hooks';
import { AddNewUrl } from './AddNewUrl';
import styles from './UrlShorts.module.less';
import { UrlShortsList } from './UrlShortsList';

export const UrlShorts = () => {
  const user = useAppSelector((state) => state.user);

  return (
    <div className={styles.main}>
      {user.isAuthenticated ? <AddNewUrl /> : null}
      <UrlShortsList />
    </div>
  );
};
