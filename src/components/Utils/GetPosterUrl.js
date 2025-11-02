
const imgUrlSize = 'w500'; // убрал слеш в начале
const imgUrlTemplate = 'https://image.tmdb.org/t/p/';

export const getPosterUrl = (posterPath, size = imgUrlSize) => {
   if (!posterPath) return '/placeholder.jpg';
   return `${imgUrlTemplate}${size}${posterPath}`;
};