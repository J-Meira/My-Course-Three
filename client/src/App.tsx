import { Header, SnackContainer } from './Components';
import {
  CssBaseline,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const localTheme = localStorage.getItem('V_D_R') || 'false';

export const App = () => {
  const [isDark, setIsDark] = useState(JSON.parse(localTheme));

  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
    },
  });

  const handleTheme = () => {
    setIsDark(!isDark);
    localStorage.setItem('V_D_R', JSON.stringify(!isDark));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackContainer>
        <Header isDark={isDark} themeToggle={handleTheme} />
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
      </SnackContainer>
    </ThemeProvider>
  );
};
