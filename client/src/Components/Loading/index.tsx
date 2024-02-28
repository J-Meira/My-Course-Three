import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { ILoadingProps } from '../../@Types';

export const Loading = ({ message = 'Loading...' }: ILoadingProps) => (
  <>
    <Paper
      square
      sx={{
        display: 'flex',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        zIndex: 9998,
        opacity: [0.9, 0.8, 0.7],
      }}
    />
    <Paper
      square
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: 'transparent',
      }}
    >
      <Box
        sx={{
          m: 1,
          position: 'relative',
          width: 120,
          height: 120,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          style={{
            width: '60px',
          }}
          src='/vite.svg'
          alt='test'
        />
        <CircularProgress
          size={118}
          sx={{
            position: 'absolute',
            zIndex: 1,
          }}
        />
      </Box>
      <Typography
        variant='caption'
        color='primary'
        sx={{
          fontSize: '1.5rem',
          fontWeight: '500',
        }}
      >
        {message.toUpperCase()}
      </Typography>
    </Paper>
  </>
);
