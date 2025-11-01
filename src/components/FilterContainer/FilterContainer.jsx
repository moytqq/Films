import React from 'react';
import { Box, Paper } from '@mui/material';
import FilterHeader from '../FilterHeader/FilterHeader';
import Selector from '../Selecter/Selector';
import RangeSlider from '../Slider/Slider';
import AutocompleteMy from '../Autocomplete/AutocompleteMy';
import { useFilterOptions } from '../FilterContext/FilterContext';

const FilterContainer = () => {

   const filterOptions = useFilterOptions();

   console.log('Состояние filterOptions: ', filterOptions);

   return (
       <Paper elevation="4" sx={{
          maxWidth     : '30%',
          width        : '100%',
          padding      : '2rem',
          display      : 'flex',
          flexDirection: 'column',
          gap          : '2rem',
       }}>
          <FilterHeader></FilterHeader>

          <Selector></Selector>

          <RangeSlider sx={{mt:2}}></RangeSlider>
          <AutocompleteMy></AutocompleteMy>
       </Paper>

   );
};

export default FilterContainer;