import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatchFilterOptions } from '../FilterContext/FilterContext';

const FilterHeader = () => {

   const dispatch = useDispatchFilterOptions();

   return (
       <Box
           sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography>Фильтры</Typography>
          <IconButton>
             <CloseIcon
             onClick={()=>{dispatch({type:'CLEAR_FILTERS'})}}></CloseIcon>
          </IconButton>
       </Box>
   );
};

export default FilterHeader;