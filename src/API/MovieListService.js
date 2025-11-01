const options = {
   method : 'GET',
   headers: {
      accept       : 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2I2Y2FmMzI1OWFhNzQwNjJlOWUyZDA5YTczYjYxNSIsIm5iZiI6MTc2MDUzNTU2NC4wNjQ5OTk4LCJzdWIiOiI2OGVmYTQwYzk4NDNkZjNmNzM0YWRlZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CBixirfIHMraGOtp_X2i2Svv1MEBhwNqKFajQeONYic',
   },
};
export default class MovieListService {
   static async getMovieList (type, page) {
      let response;
      switch (type) {
         case 'popular': {
            response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ru-RU&page=${page}`, options);
            break;
         }
         case 'topRated': {
            response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=ru-RU&page=${page}`, options);
            break;
         }
         default: {return 'unknown type'; }
      }
      response = await response.json();
      // console.log('fetch MovieList: ', response);
      return response;
   }

}