export const movieRuntimeInHours = (minutes) => {
   if (Math.floor(minutes / 60) === 0) {return minutes;}
   else if (Math.floor(minutes / 60) === 1) {return (' 1 ч ' + (minutes - 60) + ' мин');}
   return ('2 ч ' + (minutes - 120) + ' мин');
};