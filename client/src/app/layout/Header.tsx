import { useState } from 'react';
import {
  AppBar,
  Badge,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import HomePage from '../../features/home/HomePage';
import { ShoppingCart } from '@mui/icons-material';
import { useStoreContext } from '../context/StoreContext';

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contact' },
];

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
];

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const navStyles = {
  color: 'inherit',
  textDecoration: 'none',
  Typography: 'h6',
  '&:hover': {
    color: 'grey.500',
  },
  '&.active': {
    color: 'text.secondary',
  },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useStoreContext();
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <AppBar position='static' sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' component={NavLink} to='/' sx={navStyles}>
            Tom-Store
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        {/* Collapsed Menu Button (on iPads and small devices) */}
        <IconButton
          color='inherit'
          aria-label='menu'
          onClick={handleDrawerOpen}
          edge='end'
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' }, // Show on small devices
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Navigation Links (on desktop) */}
        <List
          sx={{
            display: { xs: 'none', sm: 'none', md: 'flex' }, // Show on desktop
            alignItems: 'center', // To align vertically
          }}
        >
          {midLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        {/* Right-side Menu (on desktop) */}
        <Box display='flex' alignItems='center'>
          {/* Shopping Cart Button (on both mobile and desktop) */}
          <IconButton
            component={Link}
            to='/basket'
            size='small'
            edge='start'
            color='inherit'
            sx={{
              mr: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex' }, // Show on desktop
              alignItems: 'center', // To align vertically
            }}
          >
            {rightLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
        {/* Drawer */}
        <Drawer anchor='right' open={drawerOpen} onClose={handleDrawerClose}>
          <List>
            {midLinks.map(({ title, path }) => (
              <ListItem
                key={path}
                component={NavLink}
                to={path}
                onClick={handleDrawerClose}
                sx={{ ...navStyles, textDecoration: 'none', color: 'inherit' }}
              >
                <ListItemText primary={title.toUpperCase()} />
              </ListItem>
            ))}
            {rightLinks.map(({ title, path }) => (
              <ListItem
                key={path}
                component={NavLink}
                to={path}
                onClick={handleDrawerClose}
                sx={{ ...navStyles, textDecoration: 'none', color: 'inherit' }}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
