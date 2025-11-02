import {
   Box,
   Container,
} from '@mui/material';

import React from 'react';
import { FilterProvider } from '../components/FilterContext/FilterContext';
import Header from '../components/Header/header';
import FilterContainer from '../components/FilterContainer/FilterContainer';
import GridContainer from '../components/GridContainer/GridContainer';

function FilterPage () {

   return (
       <FilterProvider>
          <Container
              maxWidth="xl"
              sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

             <Header>
             </Header>

             <Box
                 sx={{ display: 'flex', flexDirection: 'row', gap: '2rem' }}>

                <FilterContainer></FilterContainer>

                <GridContainer></GridContainer>

             </Box>
          </Container>
       </FilterProvider>
   );
}

export default FilterPage;
