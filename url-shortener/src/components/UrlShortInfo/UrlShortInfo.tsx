import { useParams } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../api/accountApi';
import { useGetUrlByIdQuery } from '../../api/shortUrlApi';
import styles from './UrlShortInfo.module.less';

export const UrlShortInfo = () => {
  const { urlId } = useParams();
  const { data, isFetching } = useGetUrlByIdQuery(parseInt(urlId as string));
  const { data: userData } = useGetUserByIdQuery(data ? data.createdById : -1, {
    skip: !data || isFetching,
  });

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <h2>Url information</h2>
        <table>
          <tbody>
            <tr>
              <td>Url</td>
              <td>{data?.url}</td>
            </tr>
            <tr>
              <td>Short url pattern</td>
              <td>{data?.shortedUrl}</td>
            </tr>
            <tr>
              <td>Date of creation</td>
              <td>{data?.createdDate.toString()}</td>
            </tr>
            <tr>
              <td>Created by</td>
              <td>{userData?.userName}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
