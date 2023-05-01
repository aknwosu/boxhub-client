import React, { useState } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import './App.css';
import MenuIcon from '@mui/icons-material/Menu';

import OrdersList, { OrdersInterface } from './components/OrdersList';
import Filters from './components/Filters';
import {
  Box,
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  Alert,
} from '@mui/material';
const apiURL = process.env.REACT_APP_API

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = React.useState<OrdersInterface[]>([]);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [error, setError] = useState('')

  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (filters: string = '') => {
    try {
      const { data } = await axios.get(`${apiURL}/api/orders?${filters}`);

      setData(data);
      setLoading(false);
      if (error) setError('')
    } catch (error) {
      setError("An error occurred, please try again")
      setLoading(false)
    }
  };
  const drawerWidth = 240;

  const handleFilterChange = (filters) => {
    fetchOrders(querystring.stringify(filters));
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            BoxHub Orders
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Filters onFilterChange={handleFilterChange} />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          <Filters onFilterChange={handleFilterChange} />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {error && <Alert severity="error">{error}</Alert>}
        {loading && 'loading...'}
        {!loading && !error && <OrdersList orders={data} fetchOrders={fetchOrders} />}
      </Box>
    </Box>
  );
}

export default App;
