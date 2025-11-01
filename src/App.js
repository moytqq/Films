import {
   AppBar,
   Box,
   Button, Card, CardContent, CardHeader,
   Container,
   createTheme, FormControl, Grid,
   IconButton, InputLabel, MenuItem,
   Paper,
   Select,
   Toolbar,
   Typography,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import Header from './components/Header/header';
import Selector from './components/Selecter/Selector';
import AutocompleteMy from './components/Autocomplete/AutocompleteMy';
import FilterContainer from './components/FilterContainer/FilterContainer';
import StarIcon from '@mui/icons-material/Star';
import GridContainer from './components/GridContainer/GridContainer';
import { FilterContext, FilterDispatchContext, FilterProvider } from './components/FilterContext/FilterContext';
import React from 'react';

function App () {
   return (
       <FilterProvider>
          <Container
              maxWidth="xl"
              sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

             <Header></Header>

             <Box
                 sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>

                <FilterContainer></FilterContainer>

                <GridContainer></GridContainer>

             </Box>
          </Container>
       </FilterProvider>
   );
}

export default App;
