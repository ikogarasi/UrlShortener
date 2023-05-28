import { Button, TextField } from '@mui/material';
import styles from './UrlShorts.module.less';
import { ArrowForwardOutlined } from '@mui/icons-material';
import { FormEvent, useState } from 'react';
import { useCreateShortUrlMutation } from '../../api/shortUrlApi';
import { shortUrlApiUrl } from '../../app/clients';

export const AddNewUrl = () => {
  const [url, setUrl] = useState('');
  const [shortedUrl, setShortedUrl] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [createShortUrl] = useCreateShortUrlMutation();

  const onAddUrl = async (e: FormEvent<HTMLFormElement>) => {
    setShortedUrl('');
    e.preventDefault();

    const result = await createShortUrl({
      url: url,
    });

    if ('data' in result) {
      setShortedUrl(`${shortUrlApiUrl}/${result.data.shortedUrl}`);
    } else {
      setErrorMessage('Provided url is invalid or already shorted');
    }
  };

  return (
    <div className={styles.section}>
      <form onSubmit={onAddUrl}>
        <h1>Add new Url</h1>
        {errorMessage.length ? (
          <span className={styles.error}>{errorMessage}</span>
        ) : null}
        <TextField
          className={styles.sectionInput}
          variant="outlined"
          onChange={(e) => setUrl(e.target.value)}
          InputProps={{
            endAdornment: (
              <Button type="submit" variant="contained" sx={{ height: '100%' }}>
                <ArrowForwardOutlined />
              </Button>
            ),
          }}
        />
        {shortedUrl.length ? (
          <div className={styles.shortedUrl}>{shortedUrl}</div>
        ) : null}
      </form>
    </div>
  );
};
