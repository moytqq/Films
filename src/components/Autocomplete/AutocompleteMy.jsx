import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useDispatchFilterOptions, useFilterOptions } from '../FilterContext/FilterContext';
import GenresService from '../../API/GenresService';
import { useEffect } from 'react';

export default function AutocompleteMy () {

   const [genres, setGenres] = React.useState([]);
   const chosenGenres = useFilterOptions().genres;
   const dispatch = useDispatchFilterOptions();

   async function fetchGenres () {
      const genres = await GenresService.getGenres();
      setGenres(genres);
   }

   useEffect(() => {
      fetchGenres()
   },[])

   return (
       <Autocomplete
           multiple
           id="tags-standard"
           options={genres}
           getOptionLabel={(option) => option.name}
           value={chosenGenres}
           onChange={(event, newValue) => dispatch({ type: 'GENRES_CHANGE', value: newValue })}
           renderInput={(params) => (
               <TextField
                   {...params}
                   variant="standard"
                   label="Жанры"
                   placeholder="Жанры"
               />
           )}
       />
   );
}

