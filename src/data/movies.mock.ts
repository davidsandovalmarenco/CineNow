import { Movie } from '../components/MovieCard';
import { RECENT_MOVIE_LIST } from './recentMovies';

export const MOCK_MOVIES: Movie[] = RECENT_MOVIE_LIST.map((movie) => ({
  id: movie.id,
  title: movie.title,
  genre: movie.genre,
  duration: movie.duration,
  rating: movie.rating,
  posterUrl: movie.posterUrl,
  synopsis: movie.synopsis,
}));
