const options = {
   method : 'GET',
   headers: {
      accept       : 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2I2Y2FmMzI1OWFhNzQwNjJlOWUyZDA5YTczYjYxNSIsIm5iZiI6MTc2MDUzNTU2NC4wNjQ5OTk4LCJzdWIiOiI2OGVmYTQwYzk4NDNkZjNmNzM0YWRlZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CBixirfIHMraGOtp_X2i2Svv1MEBhwNqKFajQeONYic',
   },
};
//https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ru-R&page=1&primary_release_date.gte=2000-01-01&primary_release_date.lte=2000-01-01&sort_by=popularity.desc&vote_count.gte=1000&with_genres=
export default class MovieListService {
   static async getMovieList (page, sortBy, years, genres, include_adult = true, include_video = false, language = 'ru-R',vote_count_gte= 1000){
      let response;
      const initialValue = '';
      let genresForUrl = genres.reduce((acc, item) => acc + item.id + '%2C', initialValue);
      console.log(`https://api.themoviedb.org/3/discover/movie?include_adult=${include_adult}&include_video=${include_video}&language=${language}&page=${page}&primary_release_date.gte=${years[0]}-01-01&primary_release_date.lte=${years[1]}-01-01&sort_by=${sortBy}.desc&vote_count.gte=${vote_count_gte}&with_genres=${genresForUrl}`)
      response = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=${include_adult}&include_video=${include_video}&language=${language}&page=${page}&primary_release_date.gte=${years[0]}-01-01&primary_release_date.lte=${years[1]}-12-31&sort_by=${sortBy}.desc&vote_count.gte=${vote_count_gte}&with_genres=${genresForUrl}`,
          options);
      response = await response.json();
      return response;
   }

}