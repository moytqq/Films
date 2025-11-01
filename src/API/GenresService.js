
const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2I2Y2FmMzI1OWFhNzQwNjJlOWUyZDA5YTczYjYxNSIsIm5iZiI6MTc2MDUzNTU2NC4wNjQ5OTk4LCJzdWIiOiI2OGVmYTQwYzk4NDNkZjNmNzM0YWRlZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.CBixirfIHMraGOtp_X2i2Svv1MEBhwNqKFajQeONYic'
   }
};
export default class GenresService {
   static async getGenres(){
      let response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=ru', options);
      response = await response.json();
      // console.log(response);
      return response.genres;
   }

}