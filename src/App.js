import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import FilterPage from './pages/FilterPage';
import FilmDetailsPage from './pages/FilmDetailsPage';

function App () {

   const router = createBrowserRouter([
      {
         path: '/',
         element:<Navigate to='/FilterPage' replace/>
      },
       {
         path   : '/FilterPage',
         element: <FilterPage/>,
      },
      {
         path   : '/FilmDetailsPage/:movieId',
         element: <FilmDetailsPage/>,
      },

   ]);

   return (
       <RouterProvider router={router}/>
   );
}

export default App;
