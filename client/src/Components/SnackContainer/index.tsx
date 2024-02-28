import { IconButton } from '@mui/material';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import { MdClose } from 'react-icons/md';

import { ISnackProviderProps } from '../../@Types';

export const SnackContainer = ({ children }: ISnackProviderProps) => (
  <SnackbarProvider
    anchorOrigin={{
      horizontal: 'right',
      vertical: 'bottom',
    }}
    autoHideDuration={3000}
    maxSnack={3}
    action={(snackbarId) => (
      <IconButton
        color='inherit'
        aria-label='close snack'
        edge='start'
        onClick={() => closeSnackbar(snackbarId)}
      >
        <MdClose />
      </IconButton>
    )}
  >
    {children}
  </SnackbarProvider>
);
