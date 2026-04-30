export type CastMember = {
  id: string;
  name: string;
  role: string;
  image: string;
};

const avatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1f1f1f&color=ffffff&bold=true&size=128`;

export const RECENT_MOVIES = {
  superman: {
    id: 'superman-2025',
    title: 'Superman',
    genre: 'Acción - Aventura',
    duration: '2h 09m',
    rating: 4.7,
    classification: 'PG-13',
    posterUrl: 'https://image.tmdb.org/t/p/original/ombsmhYUqR4qqOLOxAyr5V8hbyv.jpg',
    synopsis:
      'El nuevo Hombre de Acero busca reconciliar su herencia kryptoniana con su vida humana mientras protege un mundo que todavía aprende a confiar en él.',
    cast: [
      { id: 'superman-cast-1', name: 'David Corenswet', role: 'Clark Kent / Superman', image: avatarUrl('David Corenswet') },
      { id: 'superman-cast-2', name: 'Rachel Brosnahan', role: 'Lois Lane', image: avatarUrl('Rachel Brosnahan') },
      { id: 'superman-cast-3', name: 'Nicholas Hoult', role: 'Lex Luthor', image: avatarUrl('Nicholas Hoult') },
      { id: 'superman-cast-4', name: 'Edi Gathegi', role: 'Mr. Terrific', image: avatarUrl('Edi Gathegi') },
    ],
  },
  jurassic: {
    id: 'jurassic-world-rebirth-2025',
    title: 'Jurassic World Rebirth',
    genre: 'Acción - Ciencia ficción',
    duration: '2h 13m',
    rating: 4.5,
    classification: 'PG-13',
    posterUrl: 'https://image.tmdb.org/t/p/original/1RICxzeoNCAO5NpcRMIgg1XT6fm.jpg',
    synopsis:
      'Una nueva expedición entra en territorio prohibido para recuperar material genético capaz de cambiar el futuro de la medicina.',
    cast: [
      { id: 'jurassic-cast-1', name: 'Scarlett Johansson', role: 'Zora Bennett', image: avatarUrl('Scarlett Johansson') },
      { id: 'jurassic-cast-2', name: 'Mahershala Ali', role: 'Duncan Kincaid', image: avatarUrl('Mahershala Ali') },
      { id: 'jurassic-cast-3', name: 'Jonathan Bailey', role: 'Dr. Henry Loomis', image: avatarUrl('Jonathan Bailey') },
      { id: 'jurassic-cast-4', name: 'Rupert Friend', role: 'Martin Krebs', image: avatarUrl('Rupert Friend') },
    ],
  },
  missionImpossible: {
    id: 'mission-impossible-final-reckoning-2025',
    title: 'Mission: Impossible - The Final Reckoning',
    genre: 'Acción - Suspenso',
    duration: '2h 49m',
    rating: 4.6,
    classification: 'PG-13',
    posterUrl: 'https://image.tmdb.org/t/p/original/z53D72EAOxGRqdr7KXXWp9dJiDe.jpg',
    synopsis:
      'Ethan Hunt enfrenta una misión límite donde cada decisión puede definir el destino de sus aliados y del mundo entero.',
    cast: [
      { id: 'mission-cast-1', name: 'Tom Cruise', role: 'Ethan Hunt', image: avatarUrl('Tom Cruise') },
      { id: 'mission-cast-2', name: 'Hayley Atwell', role: 'Grace', image: avatarUrl('Hayley Atwell') },
      { id: 'mission-cast-3', name: 'Ving Rhames', role: 'Luther Stickell', image: avatarUrl('Ving Rhames') },
      { id: 'mission-cast-4', name: 'Simon Pegg', role: 'Benji Dunn', image: avatarUrl('Simon Pegg') },
    ],
  },
  fantasticFour: {
    id: 'fantastic-four-first-steps-2025',
    title: 'The Fantastic 4: First Steps',
    genre: 'Ciencia ficción - Aventura',
    duration: '1h 55m',
    rating: 4.4,
    classification: 'PG-13',
    posterUrl: 'https://image.tmdb.org/t/p/original/x26MtUlwtWD26d0G0FXcppxCJio.jpg',
    synopsis:
      'La primera familia de Marvel equilibra sus lazos personales con una amenaza cósmica que pone a prueba el futuro de la Tierra.',
    cast: [
      { id: 'fantastic-cast-1', name: 'Pedro Pascal', role: 'Reed Richards', image: avatarUrl('Pedro Pascal') },
      { id: 'fantastic-cast-2', name: 'Vanessa Kirby', role: 'Sue Storm', image: avatarUrl('Vanessa Kirby') },
      { id: 'fantastic-cast-3', name: 'Joseph Quinn', role: 'Johnny Storm', image: avatarUrl('Joseph Quinn') },
      { id: 'fantastic-cast-4', name: 'Ebon Moss-Bachrach', role: 'Ben Grimm', image: avatarUrl('Ebon Moss-Bachrach') },
    ],
  },
  dragon: {
    id: 'how-to-train-your-dragon-2025',
    title: 'How to Train Your Dragon',
    genre: 'Fantasía - Familiar',
    duration: '2h 05m',
    rating: 4.6,
    classification: 'PG',
    posterUrl: 'https://image.tmdb.org/t/p/original/q5pXRYTycaeW6dEgsCrd4mYPmxM.jpg',
    synopsis:
      'Hipo rompe con la tradición de Berk al formar un vínculo imposible con Chimuelo, revelando una nueva forma de entender a los dragones.',
    cast: [
      { id: 'dragon-cast-1', name: 'Mason Thames', role: 'Hiccup', image: avatarUrl('Mason Thames') },
      { id: 'dragon-cast-2', name: 'Nico Parker', role: 'Astrid', image: avatarUrl('Nico Parker') },
      { id: 'dragon-cast-3', name: 'Gerard Butler', role: 'Stoick', image: avatarUrl('Gerard Butler') },
      { id: 'dragon-cast-4', name: 'Nick Frost', role: 'Gobber', image: avatarUrl('Nick Frost') },
    ],
  },
  liloStitch: {
    id: 'lilo-stitch-2025',
    title: 'Lilo & Stitch',
    genre: 'Familiar - Comedia',
    duration: '1h 48m',
    rating: 4.3,
    classification: 'PG',
    posterUrl: 'https://image.tmdb.org/t/p/original/tUae3mefrDVTgm5mRzqWnZK6fOP.jpg',
    synopsis:
      'Una niña hawaiana solitaria y un pequeño alienígena fugitivo descubren juntos el verdadero significado de la familia.',
    cast: [
      { id: 'lilo-cast-1', name: 'Maia Kealoha', role: 'Lilo Pelekai', image: avatarUrl('Maia Kealoha') },
      { id: 'lilo-cast-2', name: 'Sydney Agudong', role: 'Nani Pelekai', image: avatarUrl('Sydney Agudong') },
      { id: 'lilo-cast-3', name: 'Zach Galifianakis', role: 'Jumba', image: avatarUrl('Zach Galifianakis') },
      { id: 'lilo-cast-4', name: 'Billy Magnussen', role: 'Pleakley', image: avatarUrl('Billy Magnussen') },
    ],
  },
  minecraft: {
    id: 'a-minecraft-movie-2025',
    title: 'A Minecraft Movie',
    genre: 'Aventura - Familiar',
    duration: '1h 41m',
    rating: 4.2,
    classification: 'PG',
    posterUrl: 'https://image.tmdb.org/t/p/original/yFHHfHcUgGAxziP1C3lLt0q2T4s.jpg',
    synopsis:
      'Un grupo de inadaptados entra en un mundo cúbico lleno de imaginación, criaturas y desafíos donde construir es la única forma de sobrevivir.',
    cast: [
      { id: 'minecraft-cast-1', name: 'Jason Momoa', role: 'Garrett Garrison', image: avatarUrl('Jason Momoa') },
      { id: 'minecraft-cast-2', name: 'Jack Black', role: 'Steve', image: avatarUrl('Jack Black') },
      { id: 'minecraft-cast-3', name: 'Emma Myers', role: 'Natalie', image: avatarUrl('Emma Myers') },
      { id: 'minecraft-cast-4', name: 'Danielle Brooks', role: 'Dawn', image: avatarUrl('Danielle Brooks') },
    ],
  },
  f1: {
    id: 'f1-the-movie-2025',
    title: 'F1: The Movie',
    genre: 'Acción - Drama',
    duration: '2h 36m',
    rating: 4.6,
    classification: 'PG-13',
    posterUrl: 'https://image.tmdb.org/t/p/original/9PXZIUsSDh4alB80jheWX4fhZmy.jpg',
    synopsis:
      'Un piloto veterano regresa a la Fórmula 1 para guiar a una joven promesa y perseguir una última oportunidad de gloria en la pista.',
    cast: [
      { id: 'f1-cast-1', name: 'Brad Pitt', role: 'Sonny Hayes', image: avatarUrl('Brad Pitt') },
      { id: 'f1-cast-2', name: 'Damson Idris', role: 'Joshua Pearce', image: avatarUrl('Damson Idris') },
      { id: 'f1-cast-3', name: 'Kerry Condon', role: 'Kate McKenna', image: avatarUrl('Kerry Condon') },
      { id: 'f1-cast-4', name: 'Javier Bardem', role: 'Ruben Cervantes', image: avatarUrl('Javier Bardem') },
    ],
  },
  thunderbolts: {
    id: 'thunderbolts-2025',
    title: 'Thunderbolts*',
    genre: 'Acción - Aventura',
    duration: '2h 06m',
    rating: 4.3,
    classification: 'PG-13',
    posterUrl: 'https://image.tmdb.org/t/p/original/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg',
    synopsis:
      'Un equipo de antihéroes se ve obligado a colaborar en una misión peligrosa que podría convertirlos en algo parecido a una familia.',
    cast: [
      { id: 'thunderbolts-cast-1', name: 'Florence Pugh', role: 'Yelena Belova', image: avatarUrl('Florence Pugh') },
      { id: 'thunderbolts-cast-2', name: 'Sebastian Stan', role: 'Bucky Barnes', image: avatarUrl('Sebastian Stan') },
      { id: 'thunderbolts-cast-3', name: 'David Harbour', role: 'Red Guardian', image: avatarUrl('David Harbour') },
      { id: 'thunderbolts-cast-4', name: 'Wyatt Russell', role: 'John Walker', image: avatarUrl('Wyatt Russell') },
    ],
  },
  sinners: {
    id: 'sinners-2025',
    title: 'Sinners',
    genre: 'Terror - Suspenso',
    duration: '2h 18m',
    rating: 4.8,
    classification: 'R',
    posterUrl: 'https://image.tmdb.org/t/p/original/jYfMTSiFFK7ffbY2lay4zyvTkEk.jpg',
    synopsis:
      'Dos hermanos regresan a su pueblo buscando empezar de nuevo, pero descubren que un mal más oscuro los espera en casa.',
    cast: [
      { id: 'sinners-cast-1', name: 'Michael B. Jordan', role: 'Smoke / Stack', image: avatarUrl('Michael B Jordan') },
      { id: 'sinners-cast-2', name: 'Hailee Steinfeld', role: 'Mary', image: avatarUrl('Hailee Steinfeld') },
      { id: 'sinners-cast-3', name: 'Miles Caton', role: 'Sammie', image: avatarUrl('Miles Caton') },
      { id: 'sinners-cast-4', name: "Jack O'Connell", role: 'Remmick', image: avatarUrl("Jack O'Connell") },
    ],
  },
  weapons: {
    id: 'weapons-2025',
    title: 'Weapons',
    genre: 'Terror - Misterio',
    duration: '2h 08m',
    rating: 4.4,
    classification: 'R',
    posterUrl: 'https://image.tmdb.org/t/p/original/8psWhQftQDy51Xn1s7VwyW3OFky.jpg',
    synopsis:
      'La desaparición simultánea de un grupo de niños abre una investigación inquietante en una comunidad marcada por el miedo.',
    cast: [
      { id: 'weapons-cast-1', name: 'Josh Brolin', role: 'Archer Graff', image: avatarUrl('Josh Brolin') },
      { id: 'weapons-cast-2', name: 'Julia Garner', role: 'Justine Gandy', image: avatarUrl('Julia Garner') },
      { id: 'weapons-cast-3', name: 'Alden Ehrenreich', role: 'Paul', image: avatarUrl('Alden Ehrenreich') },
      { id: 'weapons-cast-4', name: 'Austin Abrams', role: 'James', image: avatarUrl('Austin Abrams') },
    ],
  },
  blackPhone2: {
    id: 'black-phone-2-2025',
    title: 'Black Phone 2',
    genre: 'Terror - Suspenso',
    duration: '1h 54m',
    rating: 4.1,
    classification: 'R',
    posterUrl: 'https://image.tmdb.org/t/p/original/4UfgTKIxjbSbJWOM8S5bocJ9iQr.jpg',
    synopsis:
      'El terror vuelve a sonar cuando viejos traumas y nuevas llamadas conectan a los sobrevivientes con una amenaza que parecía enterrada.',
    cast: [
      { id: 'black-phone-cast-1', name: 'Mason Thames', role: 'Finney Blake', image: avatarUrl('Mason Thames') },
      { id: 'black-phone-cast-2', name: 'Madeleine McGraw', role: 'Gwen Blake', image: avatarUrl('Madeleine McGraw') },
      { id: 'black-phone-cast-3', name: 'Ethan Hawke', role: 'The Grabber', image: avatarUrl('Ethan Hawke') },
      { id: 'black-phone-cast-4', name: 'Jeremy Davies', role: 'Terrence Blake', image: avatarUrl('Jeremy Davies') },
    ],
  },
};

export const RECENT_MOVIE_LIST = [
  RECENT_MOVIES.superman,
  RECENT_MOVIES.jurassic,
  RECENT_MOVIES.missionImpossible,
  RECENT_MOVIES.fantasticFour,
  RECENT_MOVIES.dragon,
  RECENT_MOVIES.liloStitch,
  RECENT_MOVIES.minecraft,
  RECENT_MOVIES.f1,
  RECENT_MOVIES.thunderbolts,
  RECENT_MOVIES.sinners,
  RECENT_MOVIES.weapons,
  RECENT_MOVIES.blackPhone2,
];

export const findRecentMovieByReservation = (movieId?: string, movieTitle?: string) => {
  const normalizedId = movieId?.toLowerCase();
  const normalizedTitle = movieTitle?.toLowerCase();

  return RECENT_MOVIE_LIST.find((movie) => {
    const currentId = movie.id.toLowerCase();
    const currentTitle = movie.title.toLowerCase();

    return (
      currentId === normalizedId ||
      currentTitle === normalizedTitle ||
      Boolean(normalizedTitle && currentTitle.includes(normalizedTitle)) ||
      Boolean(normalizedTitle && normalizedTitle.includes(currentTitle))
    );
  });
};

export type ReservationMovie = {
  id?: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  classification?: string;
  synopsis?: string;
  description?: string;
  posterUrl?: string;
  imageUrl?: string;
  backdropUrl?: string;
  cast?: CastMember[];
};

export const getMovieImage = (movie: ReservationMovie) =>
  movie.backdropUrl || movie.imageUrl || movie.posterUrl || RECENT_MOVIES.superman.posterUrl;

export const normalizeReservationMovie = (movie?: Partial<ReservationMovie> | null): ReservationMovie => {
  const fallback =
    findRecentMovieByReservation(movie?.id, movie?.title) || RECENT_MOVIES.superman;

  return {
    id: movie?.id || fallback.id,
    title: movie?.title || fallback.title,
    genre: movie?.genre || fallback.genre,
    duration: movie?.duration || fallback.duration,
    rating: typeof movie?.rating === 'number' ? movie.rating : fallback.rating,
    classification: movie?.classification || fallback.classification,
    synopsis: movie?.synopsis || movie?.description || fallback.synopsis,
    description: movie?.description || movie?.synopsis || fallback.synopsis,
    posterUrl: movie?.posterUrl || movie?.imageUrl || movie?.backdropUrl || fallback.posterUrl,
    imageUrl: movie?.imageUrl || movie?.posterUrl || movie?.backdropUrl || fallback.posterUrl,
    backdropUrl: movie?.backdropUrl || movie?.imageUrl || movie?.posterUrl || fallback.posterUrl,
    cast: movie?.cast?.length ? movie.cast : fallback.cast,
  };
};
