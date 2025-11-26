import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FilterPage from './pages/FilterPage';
import FilmDetailsPage from './pages/FilmDetailsPage';

function App() {
   return (
       <Router basename="/Movies">
          <Routes>
             <Route path="/" element={<Navigate to="/FilterPage" replace />} />
             <Route path="/FilterPage" element={<FilterPage />} />
             <Route path="/FilmDetailsPage/:movieId" element={<FilmDetailsPage />} />
          </Routes>
       </Router>
   );
}
export default App;