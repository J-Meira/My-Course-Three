import { Header } from './Components';
import {
  CssBaseline,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export const App = () => {
  const [isDark, setIsDark] = useState(false);
  const palleteType = isDark ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: palleteType,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header isDark={isDark} themeToggle={() => setIsDark(!isDark)} />
      <Paper
        sx={{
          padding: '6rem 0',
          overflowY: 'auto',
          overflowX: 'hidden',
          backgroundColor: isDark ? '#191919' : '#f0f0f7',
          minHeight: '100vh',
        }}
      >
        <Container>
          <Outlet />
        </Container>
      </Paper>
    </ThemeProvider>
  );
};
