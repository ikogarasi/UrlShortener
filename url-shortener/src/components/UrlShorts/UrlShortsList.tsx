import {
  useDeleteUrlMutation,
  useGetAllUrlsQuery,
} from '../../api/shortUrlApi';
import { shortUrlApiUrl } from '../../app/clients';
import { useAppSelector } from '../../app/hooks';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ShortUrlEntity } from '../../app/apiClients/ShortUrlClient';
import { DeleteOutlined, InfoOutlined } from '@mui/icons-material';
import styles from './UrlShorts.module.less';
import { useNavigate } from 'react-router-dom';
import { ConfirmDialog } from '../ConfirmDialog/ConfirmDialog';
import {
  DELETE_MODAL_DESCRIPTION,
  DELETE_MODAL_TITLE,
} from 'src/resources/urlShortsList/deleteModal';
import { useState } from 'react';

export const UrlShortsList = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number>(0);
  const [deleteUrl] = useDeleteUrlMutation();
  const { data: urlsData = [] } = useGetAllUrlsQuery();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const renderRemoveButton = (urlId: number, createdById: number) => {
    if (user.isAuthenticated) {
      console.log('am outside');
      console.log(
        `${user.userData.userId} === ${createdById} ${
          user.userData.userId === createdById
        }`
      );
      console.log(user.userData.role === 'ADMIN');
      if (
        user.userData.userId == createdById ||
        user.userData.role === 'ADMIN'
      ) {
        console.log('am inside');
        return (
          <Button
            variant="contained"
            color="error"
            onClick={() => onDeleteBtnClick(urlId)}
            aria-label="Delete"
          >
            <DeleteOutlined />
          </Button>
        );
      }
    }
  };

  const onDeleteBtnClick = (id: number) => {
    setIdToDelete(id);
    setOpenModal(true);
  };

  return (
    <div className={styles.section}>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        title={DELETE_MODAL_TITLE}
        description={DELETE_MODAL_DESCRIPTION}
        color="warning"
        onClickDelegate={deleteUrl}
        delegateParameter={idToDelete}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Url</TableCell>
              <TableCell align="center">Shorted Url</TableCell>
              {user.isAuthenticated ? (
                <TableCell align="right">Actions</TableCell>
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {urlsData?.map((it: ShortUrlEntity) => (
              <TableRow key={it.urlId}>
                <TableCell>{it.url}</TableCell>
                <TableCell align="center">{`${shortUrlApiUrl}/${it.shortedUrl}`}</TableCell>
                {user.isAuthenticated ? (
                  <TableCell align="right">
                    <Box>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => navigate(`/UrlInfo/${it.urlId}`)}
                        aria-label="Info"
                      >
                        <InfoOutlined />
                      </Button>{' '}
                      {renderRemoveButton(it.urlId, it.createdById)}
                    </Box>
                  </TableCell>
                ) : null}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
