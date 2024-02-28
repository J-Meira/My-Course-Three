import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageTitle } from '../../Components';

export const ServerErrorPage = () => {
  const { state } = useLocation();
  const [title, setTitle] = useState('Server error');
  const [body, setBody] = useState('Internal Server Error');

  useEffect(() => {
    if (state?.error) {
      setTitle(state.error.title);
      if (state.error.detail) setBody(state.error.detail);
    }
  }, [state]);

  return (
    <>
      <PageTitle title={title} />
      <Typography variant='body1'>{body}</Typography>
    </>
  );
};
