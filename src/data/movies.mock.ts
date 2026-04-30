import { Movie } from '../components/MovieCard';

export const MOCK_MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Oppenheimer',
    genre: 'Biografía, Drama, Historia',
    duration: '180 min',
    rating: 8.5,
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    synopsis: 'La historia del científico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica.'
  },
  {
    id: '2',
    title: 'Spider-Man: Across the Spider-Verse',
    genre: 'Animación, Acción, Aventura',
    duration: '140 min',
    rating: 7.8,
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    synopsis: 'Miles Morales es catapultado a través del Multiverso, donde se encuentra con un equipo de Spider-Personas encargadas de proteger su propia existencia.'
  },
  {
    id: '3',
    title: 'Dune: Part Two',
    genre: 'Ciencia Ficción, Aventura',
    duration: '166 min',
    rating: 9.2,
    posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2TGbi205E.jpg',
    synopsis: 'Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyerun a su familia.'
  }
];
