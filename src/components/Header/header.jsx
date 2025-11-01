import React from 'react';
import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { Person } from '@mui/icons-material';

const Header = () => {
   return (
       <AppBar position="static"
               elevation='4'
               sx={{
                  backgroundColor: '#2196F3', // Зеленый фон
                  color          : '#FFFFFF', // Желтый текст
               }}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
             <Button color="inherit">
                Фильмы
             </Button>
             <IconButton color="inherit">
                <Person/>
             </IconButton>
          </Toolbar>
       </AppBar>
   );
};

export default Header;