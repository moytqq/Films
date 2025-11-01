import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Pagination, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Selector from '../Selecter/Selector';
import GenresService from '../../API/GenresService';
import MovieListService from '../../API/MovieListService';
import { useFilterOptions } from '../FilterContext/FilterContext';

const GridContainer = () => {

   const [movieList, setMovieList] = React.useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const safeSortBy = useFilterOptions().sortBy || '';
   const [currPage, setCurrPage] = useState(1);
   const [totalPagesCount, setTotalPagesCount] = useState(0);

   const imgUrlSize = 'w500'; // убрал слеш в начале
   const imgUrlTemplate = 'https://image.tmdb.org/t/p/';

   useEffect(() => {
      const fetchMovieList = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await MovieListService.getMovieList(safeSortBy, currPage);
            console.log(response);
            setMovieList(response.results || []);
            setTotalPagesCount(response.total_pages > 500
                               ? 500
                               : response.total_pages);
         }
         catch (err) {
            setError('Ошибка при загрузке фильмов');
            console.error('Fetch error:', err);
         }
         finally {
            setLoading(false);
         }
      };

      fetchMovieList();
   }, [safeSortBy, currPage]);

   const getPosterUrl = (posterPath, size = imgUrlSize) => {
      if (!posterPath) return '/placeholder.jpg';
      return `${imgUrlTemplate}${size}${posterPath}`;
   };

   if (loading) return <Typography>Загрузка...</Typography>;
   if (error) return <Typography color="error">{error}</Typography>;

   const handlePageChange = (event, value) => {
      setCurrPage(value);
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   return (
       <Box sx={{
          display       : 'flex',
          flexDirection : 'column',
          gap           : 1,
          justifyContent: 'space-evenly',
          alignItems    : 'center',
       }}>
          <Pagination
              sx={{ justifyContent: 'space-between', alignItems: 'center' }}
              page={currPage}
              boundaryCount={6}
              size={'large'}
              count={totalPagesCount}
              onChange={handlePageChange}
          ></Pagination>

          <Grid container spacing={2} rowSpacing={2} columnSpacing={0} gap="1rem"
                sx={{ justifyContent: 'space-evenly' }}>
             {movieList.map((movie) => (
                 <Grid key={movie.id} sx={{ maxWidth: '23%', minWidth: '23%' }}> {/* Добавь 'item' */}
                    <Card sx={{
                       maxWidth      : '100%',
                       height        : '100%',
                       display       : 'flex',
                       flexDirection : 'column',
                       justifyContent: 'space-between',
                    }}>
                       <CardMedia
                           component="img"
                           height="300"
                           image={getPosterUrl(movie.poster_path, 'w500')}
                           alt={movie.original_title}
                           sx={{ objectFit: 'cover' }}
                           onError={(e) => {
                              // Запасное изображение если постер не загрузился
                              e.target.src = '/placeholder.jpg';
                           }}
                       />

                       <CardHeader
                           title={movie.original_title}
                           action={
                              <IconButton>
                                 <StarIcon/>
                              </IconButton>
                           }
                       />
                       <CardContent sx={{mt:'auto'}}>
                          <Typography variant="body1" color="textSecondary" component="p">
                             Средняя оценка: {movie.vote_average}
                          </Typography>
                       </CardContent>
                    </Card>
                 </Grid>
             ))}
          </Grid>
       </Box>
   );
};

export default GridContainer;