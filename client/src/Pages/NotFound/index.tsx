import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { PageTitle } from '../../Components';

export const NotFoundPage = () => {
  return (
    <>
      <PageTitle title='Not Found' />
      <Typography variant='body1'>
        Oops - we could not find what your are looking for!
      </Typography>

      <Button sx={{ mt: 2 }} component={Link} to='/' fullWidth>
        Go back to shop
      </Button>
    </>
  );
};
