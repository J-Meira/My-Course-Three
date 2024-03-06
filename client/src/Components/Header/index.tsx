import { useEffect, useState } from 'react';
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
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
} from '@mui/material';
import {
  MdDarkMode,
  MdLightMode,
  MdMenu,
  MdPerson,
  MdShoppingCart,
} from 'react-icons/md';

import { useAppDispatch, useAppSelector } from '../../Redux/Hooks';
import { clearBasket, handleTheme, signOut } from '../../Redux/Slices';

const midLinks = [
  { link: '/about', label: 'about' },
  { link: '/buggy', label: 'buggy' },
  { link: '/contact', label: 'contact' },
];

const rightLinks = [
  { link: '/sign-in', label: 'sign in' },
  { link: '/sign-up', label: 'sign up' },
];

export const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const matches = useMediaQuery('(max-width:599px)');
  const { isDarkMode } = useAppSelector((state) => state.system);
  const basket = useAppSelector((state) => state.basket.current);
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    setAnchorEl(null);
    setIsOpen(false);
    dispatch(clearBasket());
    dispatch(signOut());
  };
  const openMenu = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);

  const isActive = (item: string) => pathname.indexOf(item) >= 0;

  const getTotalItems = (): number =>
    basket
      ? basket.items.reduce((prev, item) => {
          return (prev += item.quantity);
        }, 0)
      : 0;

  useEffect(() => {
    if (isOpen && !matches) setIsOpen(false);
  }, [matches, isOpen]);

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
                key={item.link}
                sx={{
                  color: '#fff',
                  backgroundColor: isActive(item.link)
                    ? 'rgba(0,0,0,0.2)'
                    : undefined,
                }}
                component={Link}
                to={item.link}
              >
                {item.label}
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
              {user ? (
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={openMenu}
                  display='flex'
                  alignItems='center'
                >
                  <Avatar sx={{ mr: 1 }}>
                    <MdPerson />
                  </Avatar>
                  <Typography>{user.email}</Typography>
                </Box>
              ) : (
                rightLinks.map((item) => (
                  <Button
                    key={item.link}
                    sx={{
                      color: '#fff',
                      backgroundColor: isActive(item.link)
                        ? 'rgba(0,0,0,0.2)'
                        : undefined,
                    }}
                    component={Link}
                    to={item.link}
                  >
                    {item.label}
                  </Button>
                ))
              )}
            </Box>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={() => setIsOpen(true)}
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
        <MenuItem component={Link} to='/profile'>
          Profile
        </MenuItem>
        <MenuItem component={Link} to='/my-orders'>
          My Orders
        </MenuItem>
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </Menu>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <Box
          sx={{ width: 250 }}
          role='presentation'
          onClick={() => setIsOpen(false)}
        >
          <List>
            {midLinks.map((item) => (
              <ListItem key={'m' + item.link} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemText
                    color='inherit'
                    primary={item.label.toUpperCase()}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to='/profile'>
                    <ListItemText color='inherit' primary='Profile' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to='/my-orders'>
                    <ListItemText color='inherit' primary='My Orders' />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleSignOut}>
                    <ListItemText color='inherit' primary='Sign out' />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              rightLinks.map((item) => (
                <ListItem key={'r' + item.link} disablePadding>
                  <ListItemButton component={Link} to={item.link}>
                    <ListItemText
                      color='inherit'
                      primary={item.label.toUpperCase()}
                    />
                  </ListItemButton>
                </ListItem>
              ))
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
