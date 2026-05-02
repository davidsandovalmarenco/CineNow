import { collection, serverTimestamp, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { RECENT_MOVIE_LIST } from '../data/recentMovies';
import { SNACK_MENU } from '../data/snacks';

const MOVIES = RECENT_MOVIE_LIST.map((movie, index) => ({
  id: movie.id,
  title: movie.title,
  genre: movie.genre,
  duration: movie.duration,
  rating: movie.rating,
  classification: movie.classification,
  synopsis: movie.synopsis,
  posterUrl: movie.posterUrl,
  imageUrl: movie.posterUrl,
  backdropUrl: movie.posterUrl,
  bannerUrl: movie.posterUrl,
  status: index < 8 ? 'now_showing' : index < 10 ? 'popular' : 'coming_soon',
}));

export const seedService = {
  async seedMovies() {
    console.log('Syncing movies...');

    for (const movie of MOVIES) {
      const { id, ...movieData } = movie;
      await setDoc(doc(db, 'movies', id), {
        ...movieData,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });
    }

    console.log('Movies synced successfully!');
  },

  async seedSnacks() {
    console.log('Syncing snacks...');

    for (const snack of SNACK_MENU) {
      const { id, ...snackData } = snack;
      await setDoc(doc(db, 'snacks', id), {
        ...snackData,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });
    }

    console.log('Snacks synced successfully!');
  },

  async seedAll() {
    console.log('Starting seed...');
    
    await this.seedMovies();
    await this.seedSnacks();

    console.log('Seed completed successfully!');
  },

  async clearDatabase() {
    // Helper to clear collections if needed during development
    const collections = ['movies', 'snacks', 'schedules', 'reservations'];
    for (const colName of collections) {
      const colRef = collection(db, colName);
      const snapshot = await getDocs(colRef);
      for (const d of snapshot.docs) {
        await deleteDoc(doc(db, colName, d.id));
      }
    }
    console.log('Database cleared!');
  }
};
