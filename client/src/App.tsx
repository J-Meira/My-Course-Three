import { useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import {
  CssBaseline,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';

import { Header, Loading, SnackContainer } from './Components';

import { useAppDispatch, useAppSelector } from './Redux/Hooks';
import { getBasket } from './Redux/Slices';

export const App = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.system);

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const initApp = useCallback(() => {
    dispatch(getBasket());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackContainer>
        <Header />
        <Paper
          sx={{
            padding: '6rem 0',
            overflowY: 'auto',
            overflowX: 'hidden',
            backgroundColor: isDarkMode ? '#191919' : '#f0f0f7',
            minHeight: '100vh',
          }}
          square
        >
          <Container>
            <Outlet />
          </Container>
        </Paper>
        <Loading />
      </SnackContainer>
    </ThemeProvider>
  );
};
