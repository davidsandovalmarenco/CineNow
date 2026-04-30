import { collection, getDocs, query, where, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { MovieData, ScheduleData } from './types';

export const movieService = {
  async getMoviesByStatus(status: MovieData['status']): Promise<MovieData[]> {
    const moviesRef = collection(db, 'movies');
    const q = query(moviesRef, where('status', '==', status));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as MovieData));
  },

  async getAllMovies(): Promise<MovieData[]> {
    const moviesRef = collection(db, 'movies');
    const snapshot = await getDocs(moviesRef);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as MovieData));
  },

  async getMovieById(movieId: string): Promise<MovieData | null> {
    const movieRef = doc(db, 'movies', movieId);
    const snap = await getDoc(movieRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as MovieData;
    }
    return null;
  },

  async getMovieSchedules(movieId: string): Promise<ScheduleData[]> {
    const schedulesRef = collection(db, 'schedules');
    const q = query(schedulesRef, where('movieId', '==', movieId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as ScheduleData));
  }
};
