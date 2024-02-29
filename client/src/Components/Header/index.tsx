import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from '@mui/material';
import {
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdShoppingCart,
} from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { handleTheme } from '../../Redux/Slices';

const midLinks = ['about', 'buggy', 'contact'];
const rightLinks = ['sign-in', 'sign-up'];

export const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.system);
  const basket = useAppSelector((state) => state.basket.current);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const isActive = (item: string) => pathname.indexOf(item) >= 0;

  const getTotalItems = (): number =>
    basket
      ? basket.items.reduce((prev, item) => {
          return (prev += item.quantity);
        }, 0)
      : 0;

  return (
    <>
      <AppBar component='nav'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant='h1'
            component={Link}
            to='/'
            sx={{
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Vite + React Client
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'flex' },
              justifyContent: 'center',
            }}
          >
            {midLinks.map((item) => (
              <Button
                key={item}
                sx={{
                  color: '#fff',
                  backgroundColor: isActive(item)
                    ? 'rgba(0,0,0,0.2)'
                    : undefined,
                }}
                component={Link}
                to={'/' + item}
              >
                {item}
              </Button>
            ))}
          </Box>
          <Box display='flex'>
            <IconButton
              color='inherit'
              aria-label='theme switch'
              edge='start'
              onClick={() => dispatch(handleTheme())}
              sx={{ mr: 2 }}
            >
              {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
            </IconButton>
            <IconButton
              color='inherit'
              aria-label='cart toggle'
              edge='start'
              component={Link}
              to='/basket'
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={getTotalItems()} color='secondary'>
                <MdShoppingCart />
              </Badge>
            </IconButton>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {rightLinks.map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: '#fff',
                    backgroundColor: isActive(item)
                      ? 'rgba(0,0,0,0.2)'
                      : undefined,
                  }}
                  component={Link}
                  to={'/' + item}
                >
                  {item}
                </Button>
              ))}
            </Box>

            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={openMenu}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MdMenu />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={anchorEl != null}
        onClose={() => setAnchorEl(null)}
      >
        {midLinks.map((item, index) => (
          <MenuItem key={`${index} - ${item}`} component={Link} to={'/' + item}>
            {item.toUpperCase()}
          </MenuItem>
        ))}
        <Divider />
        {rightLinks.map((item, index) => (
          <MenuItem key={`${index} - ${item}`} component={Link} to={'/' + item}>
            {item.toUpperCase()}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
