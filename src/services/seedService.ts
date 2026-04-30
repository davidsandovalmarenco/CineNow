import { collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

const MOVIES = [
  {
    title: 'Dune: Part Two',
    genre: 'Ciencia Ficción',
    duration: '2h 46min',
    rating: 4.8,
    classification: 'PG-13',
    synopsis: 'Paul Atreides se une a Chani y los Fremen en una guerra de venganza contra los conspiradores que destruyeron a su familia.',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiOwmGY366APgoqfZBqHVRkgsEt770852of4ifU5DLQ6sW2qq141mStouFsAuUf4IKj5pQGfVe3VX-7TaAcm7ZwnbMmFL5Xx5k_7vwYDy1WIS1UgRo4xK-dVgBS796FNx2W757YF4rtXewgfKRCuC4JlqzjPOgCPHKlt8K9d1HqdPHC43-NbZj8KkYE0Yoyc1tuokmFl39gqj80ytINYmnUv9-MV2WpHTtaTPk2EGORxAJHWyxrqymjNvxid6GX532omjxJcL3r-I',
    status: 'now_showing',
  },
  {
    title: 'The Batman',
    genre: 'Acción / Crimen',
    duration: '2h 56min',
    rating: 4.7,
    classification: 'R',
    synopsis: 'Cuando un asesino apunta a la élite de Gotham con una serie de maquinaciones sádicas, un rastro de pistas crípticas envía al Caballero de la Noche a una investigación.',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbnkm_-U3Dggc9Ir2VlNhPRdVnhE9dZegTkHxrgeNanV81UkU3bPrrQYJUHLpmhHhu8UV1MXs61fW9wPEQODsKDVEDLhS7qs4xXza6gvPQ5AUMK-nA1UhSUCiidQPavT4WVB0O4GirlZfZ4NRuKzTmQ8f2ERhAulpdfROaIhMbOwwxY2J_uezUP-1RZWIqtFZOKLKnONdCS9XLj0r35Zlrm8rj8Wc5C6-hT9Xtv2QV7Hmc47yd8Pl0ydlpAyOxPgkKyrVhZQXrtMk',
    status: 'now_showing',
  },
  {
    title: 'Interstellar',
    genre: 'Drama / Sci-Fi',
    duration: '2h 49min',
    rating: 4.9,
    classification: 'PG-13',
    synopsis: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.',
    posterUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBy-07fV5cuSb6GSWLYjpfwelz85nBk5KzWYIEJbxY7gCD4KbAOvrJNAvI1yriULqklHppK6K59p19M-yEGtb3aL5J8WKXPMGe3YBGPoR1bhfFXzio94zhLZifr1tEXxzoE_50nZHJfiZMFYhm8fogP1CN57UXFxbLP_4r_L8-FpGB8U9RJHw9KXCJskGFxnCaRPEQPFUFYRFjvcMD3W22D37bBUM98zY9ZGaXEiDuHeH9HCrErwfMZpTygORb6TlocUm263K8MpeQ',
    status: 'popular',
  }
];

const SNACKS = [
  { name: 'Combo Individual', price: 12.50, description: 'Popcorn Mediana + Soda 500ml', imageUrl: 'https://images.unsplash.com/photo-1572177191856-3cde6403ec1b?q=80&w=200&auto=format&fit=crop' },
  { name: 'Combo Pareja', price: 22.00, description: 'Popcorn Grande + 2 Sodas 500ml + Nachos', imageUrl: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=200&auto=format&fit=crop' },
  { name: 'Hot Dog Premium', price: 8.50, description: 'Salchicha de res con salsas especiales', imageUrl: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88?q=80&w=200&auto=format&fit=crop' },
];

export const seedService = {
  async seedAll() {
    console.log('Starting seed...');
    
    // 1. Seed Movies
    const moviesRef = collection(db, 'movies');
    for (const movie of MOVIES) {
      await addDoc(moviesRef, { ...movie, createdAt: serverTimestamp() });
    }

    // 2. Seed Snacks
    const snacksRef = collection(db, 'snacks');
    for (const snack of SNACKS) {
      await addDoc(snacksRef, { ...snack, createdAt: serverTimestamp() });
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
