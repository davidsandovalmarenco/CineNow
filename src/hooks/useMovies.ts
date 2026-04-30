import { useState, useCallback } from 'react';
import { movieService } from '../services/movieService';
import { MovieData } from '../services/types';

export const useMovies = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMoviesByStatus = useCallback(async (status: MovieData['status']) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await movieService.getMoviesByStatus(status);
      setMovies(data);
    } catch (err: any) {
      console.error(`Error fetching ${status} movies:`, err);
      setError(err.message || 'Error fetching movies');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAllMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await movieService.getAllMovies();
      setMovies(data);
    } catch (err: any) {
      console.error('Error fetching all movies:', err);
      setError(err.message || 'Error fetching movies');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMovieById = useCallback(async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await movieService.getMovieById(id);
      return data;
    } catch (err: any) {
      console.error('Error fetching movie by ID:', err);
      setError(err.message || 'Error fetching movie');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    movies,
    isLoading,
    error,
    fetchMoviesByStatus,
    fetchAllMovies,
    fetchMovieById,
  };
};
