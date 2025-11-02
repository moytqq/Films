import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Pagination, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MovieListService from '../../API/MovieListService';
import { useFilterOptions } from '../FilterContext/FilterContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getPosterUrl } from '../Utils/GetPosterUrl';
import { getMovieYear } from '../Utils/GetMovieYear';

const GridContainer = () => {

   const [movieList, setMovieList] = React.useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const safeSortBy = useFilterOptions().sortBy || '';
   const [currPage, setCurrPage] = useState(1);
   const [totalPagesCount, setTotalPagesCount] = useState(0);
   const filterOptions = useFilterOptions();

   const navigate = useNavigate();

   const handleFilmClick = (filmId) => {
      navigate(`/FilmDetailsPage/${filmId}`);
   };

   getMovieYear('2025-08-20');
   console.log(filterOptions.years.labels);
   useEffect(() => {
      const fetchMovieList = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await MovieListService.getMovieList(safeSortBy, currPage);
            console.log('fetch getMovieList response: ', response.results);
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

   if (loading) return <Typography>Загрузка...</Typography>;
   if (error) return <Typography color="error">{error}</Typography>;

   const handlePageChange = (event, value) => {
      setCurrPage(value);
      window.scrollTo({ top: 0, behavior: 'smooth' });
   };

   const handleFavoriteClick = (event) => {
      event.stopPropagation();
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
             {movieList
                 .filter(movie => (getMovieYear(movie.release_date) > filterOptions.years.labels[0]) && (getMovieYear(movie.release_date) < filterOptions.years.labels[1]))
                 .map((movie) => (
                 <Grid key={movie.id} sx={{ maxWidth: '23%', minWidth: '23%' }}> {/* Добавь 'item' */}
                    <Card sx={{
                       maxWidth      : '100%',
                       height        : '100%',
                       display       : 'flex',
                       flexDirection : 'column',
                       justifyContent: 'space-between',
                       cursor        : 'pointer',
                    }}
                          onClick={() => {handleFilmClick(movie.id);}}>
                       <CardMedia
                           component="img"
                           height="300"
                           image={getPosterUrl(movie.poster_path, 'w500')}
                           alt={movie.title}
                           sx={{ objectFit: 'cover' }}
                           onError={(e) => {
                              e.target.src = '/placeholder.jpg';
                           }}
                       />

                       <CardHeader
                           title={movie.title}
                           action={
                              <IconButton
                                  onClick={handleFavoriteClick}>
                                 <StarIcon/>
                              </IconButton>
                           }
                       />
                       <CardContent
                           sx={{
                              mt       : 'auto',
                              borderTop: 'solid 0.1rem ',
                              alignSelf: 'center',
                              minWidth : '100%', p: '0',
                              pt       : '16px',
                              pb       : '16px',
                              cursor   : 'default',
                           }}
                           onClick={(event) => {event.stopPropagation();}}>
                          <Typography
                              sx={{
                                 maxWidth   : 'max-content',
                                 ml         : 2,
                                 mr         : 2,
                                 display    : 'flex',
                                 justifySelf: 'center',
                              }}
                              variant="body1"
                              color="textSecondary"
                              component="p">
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