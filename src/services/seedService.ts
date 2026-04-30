import { collection, serverTimestamp, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { RECENT_MOVIE_LIST } from '../data/recentMovies';

const MOVIES = RECENT_MOVIE_LIST.map((movie, index) => ({
  id: movie.id,
  title: movie.title,
  genre: movie.genre,
  duration: movie.duration,
  rating: movie.rating,
  classification: movie.classification,
  synopsis: movie.synopsis,
  posterUrl: movie.posterUrl,
  bannerUrl: movie.posterUrl,
  status: index < 8 ? 'now_showing' : index < 10 ? 'popular' : 'coming_soon',
}));

const SNACKS = [
  { id: 'combo-individual', name: 'Combo Individual', price: 12.50, description: 'Popcorn Mediana + Soda 500ml', imageUrl: 'https://images.unsplash.com/photo-1572177191856-3cde6403ec1b?q=80&w=200&auto=format&fit=crop', available: true },
  { id: 'combo-pareja', name: 'Combo Pareja', price: 22.00, description: 'Popcorn Grande + 2 Sodas 500ml + Nachos', imageUrl: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=200&auto=format&fit=crop', available: true },
  { id: 'hot-dog-premium', name: 'Hot Dog Premium', price: 8.50, description: 'Salchicha de res con salsas especiales', imageUrl: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88?q=80&w=200&auto=format&fit=crop', available: true },
];

export const seedService = {
  async seedAll() {
    console.log('Starting seed...');
    
    for (const movie of MOVIES) {
      const { id, ...movieData } = movie;
      await setDoc(doc(db, 'movies', id), {
        ...movieData,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });
    }

    for (const snack of SNACKS) {
      const { id, ...snackData } = snack;
      await setDoc(doc(db, 'snacks', id), {
        ...snackData,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      }, { merge: true });
    }

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
