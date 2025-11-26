import React, { useContext } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {
   useDispatchFilterOptions,
   useFilterOptions,
} from '../FilterContext/FilterContext';

const Selector = () => {

   //const safeSortBy = sortBy || '';
   const safeSortBy = useFilterOptions().sortBy || '';
   const dispatch = useDispatchFilterOptions();

   return (
       <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Сортировать по</InputLabel>
          <Select
              value={safeSortBy}
              variant='outlined'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Сортировать по"
              onChange={(event, newValue)=>{dispatch({type: 'SORT_CHANGE', value: newValue})}}
          >
             <MenuItem value='popularity'>Популярность</MenuItem>
             <MenuItem value='vote_average'>Оценка</MenuItem>
          </Select>
       </FormControl>
   );
};

export default Selector;