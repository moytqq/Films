import React, { useEffect, useState } from 'react';
import { FilterProvider } from '../components/FilterContext/FilterContext';
import { Box, Container, IconButton, Typography } from '@mui/material';
import Header from '../components/Header/header';
import MovieByIdService from '../API/MovieByIdService';
import { useNavigate, useParams } from 'react-router-dom';
import { getPosterUrl } from '../components/Utils/GetPosterUrl';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { movieRuntimeInHours } from '../components/Utils/MovieRuntimeInHours';

const FilmDetailsPage = () => {

   const [movieInfo, setMovieInfo] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const { movieId } = useParams();

   useEffect(() => {
      const fetchMovieById = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await MovieByIdService.getMovieById(movieId);
            console.log(response);
            setMovieInfo(response || []);
         }
         catch (err) {
            setError('Ошибка при загрузке фильма');
            console.error('Fetch error:', err);
         }
         finally {
            setLoading(false);
         }
      };

      fetchMovieById(movieId);
   }, [movieId]);

   const navigate = useNavigate();

   const handleBackButtonClick = () => {
      navigate(`/FilterPage`);
   };

   if (loading) return <Typography>Загрузка...</Typography>;
   if (error) return <Typography color="error">{error}</Typography>;
   if (!movieInfo) return <Typography>Фильм не найден</Typography>;

   return (
       <FilterProvider>
          <Container
              maxWidth="xl"
              sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

             <Header>
             </Header>

             <Box
                 sx={{
                    display      : 'flex',
                    flexDirection: 'row',
                    gap          : '1rem',
                 }}>
                <Box
                    component="img"
                    src={getPosterUrl(movieInfo.poster_path, 'w500')}
                    sx={{
                       width    : 300,
                       height   : 450,
                       objectFit: 'cover',
                    }}
                >
                </Box>
                {movieInfo && (
                    <Box
                        sx={{
                           display      : 'flex',
                           flexDirection: 'column',
                           gap          : '1rem',
                           minWidth     : '75%',
                        }}>
                       <Box
                           sx={{
                              display      : 'flex',
                              flexDirection: 'row',
                              gap          : '1rem',
                           }}>
                          <Typography
                              variant="h3">
                             {movieInfo.title}
                          </Typography>
                          <IconButton>
                             <StarIcon
                                 fontSize="large"
                             ></StarIcon>
                          </IconButton>
                       </Box>
                       <IconButton sx={{ alignSelf: 'flex-start' }}>
                          <ArrowBackIcon
                              fontSize="large"
                              onClick={handleBackButtonClick}>
                          </ArrowBackIcon>
                       </IconButton>
                       <Box
                           sx={{
                              display      : 'flex',
                              flexDirection: 'column',
                              gap          : '0.5rem',
                              maxHeight    : '20%',
                              flexWrap     : 'wrap',
                              maxWidth     : '30%',
                           }}>
                          {movieInfo.credits.cast.map((actor) => (
                              <Typography key={actor.id}>{actor.name}</Typography>
                          ))}
                       </Box>
                       <Box
                           sx={{
                              display      : 'flex',
                              flexDirection: 'column',
                              gap          : '0.5rem',
                              maxHeight    : '20%',
                              minWidth     : '90%',
                              maxWidth     : '90%',
                           }}
                       >
                          <Typography variant="h4">Детали</Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                             <Box sx={{
                                display       : 'flex',
                                flexDirection : 'column',
                                gap           : '0.5rem',
                                justifyContent: 'space-between',
                             }}>
                                <Typography variant="subtitle1">Дата выпуска:</Typography>
                                <Typography variant="subtitle1">Страна:</Typography>
                                <Typography variant="subtitle1">Жанр:</Typography>
                                <Typography variant="subtitle1">Режиссер:</Typography>
                                <Typography variant="subtitle1">Сценарий:</Typography>
                                <Typography variant="subtitle1">Бюджет:</Typography>
                                <Typography variant="subtitle1">Зрители:</Typography>
                                <Typography variant="subtitle1">Продолжительность:</Typography>
                             </Box>
                             <Box sx={{
                                display       : 'flex',
                                flexDirection : 'column',
                                gap           : '0.5rem',
                                justifyContent: 'space-between',
                             }}>
                                <Typography variant="subtitle1">{movieInfo.release_date}</Typography>
                                <Typography variant="subtitle1">{movieInfo.origin_country[0]}</Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                                   {movieInfo.genres.map((genre) =>
                                       (<Typography key={genre.id} variant="subtitle1">{genre.name},</Typography>))}
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                                   {movieInfo.credits.crew
                                       .filter(crewMember => crewMember.known_for_department === 'Directing')
                                       .slice(0, 5)
                                       .map((director, index, array) => (
                                           <Typography key={director.id} variant="subtitle1">
                                              {director.name}{index < array.length - 1
                                                              ? ','
                                                              : ''}
                                           </Typography>
                                       ))
                                   }
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
                                   {movieInfo.credits.crew
                                       .filter(crewMember => crewMember.known_for_department === 'Writing')
                                       .slice(0, 5)
                                       .map((writer, index, array) => (
                                           <Typography key={writer.id} variant="subtitle1">
                                              {writer.name}{index < array.length - 1
                                                            ? ','
                                                            : ''}
                                           </Typography>
                                       ))
                                   }
                                </Box>
                                <Typography variant="subtitle1">{movieInfo.budget}</Typography>
                                <Typography variant="subtitle1">-----</Typography>
                                <Typography variant="subtitle1">{movieRuntimeInHours(movieInfo.runtime)}</Typography>
                             </Box>
                          </Box>
                       </Box>
                    </Box>
                )}

             </Box>
          </Container>
       </FilterProvider>
   );
};

export default FilmDetailsPage;