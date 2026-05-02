import { ImageSourcePropType } from 'react-native';

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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Superman_%282025_film%29_poster.jpg/500px-Superman_%282025_film%29_poster.jpg',
    posterAsset: require('../../assets/posters/superman-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a5/Jurassic_World_Rebirth_poster.jpg/500px-Jurassic_World_Rebirth_poster.jpg',
    posterAsset: require('../../assets/posters/jurassic-world-rebirth-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1f/Mission_Impossible_%E2%80%93_The_Final_Reckoning_Poster.jpg/500px-Mission_Impossible_%E2%80%93_The_Final_Reckoning_Poster.jpg',
    posterAsset: require('../../assets/posters/mission-impossible-final-reckoning-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/The_Fantastic_Four_First_Steps_poster.jpg/500px-The_Fantastic_Four_First_Steps_poster.jpg',
    posterAsset: require('../../assets/posters/fantastic-four-first-steps-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/80/How_To_Train_Your_Dragon_2025_Poster.jpg',
    posterAsset: require('../../assets/posters/how-to-train-your-dragon-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Lilo_%26_Stitch_2025_Theatrical_Poster.jpg/500px-Lilo_%26_Stitch_2025_Theatrical_Poster.jpg',
    posterAsset: require('../../assets/posters/lilo-stitch-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/A_Minecraft_Movie_poster.jpg/500px-A_Minecraft_Movie_poster.jpg',
    posterAsset: require('../../assets/posters/a-minecraft-movie-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/F1_%282025_film%29.png/500px-F1_%282025_film%29.png',
    posterAsset: require('../../assets/posters/f1-the-movie-2025.png') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/Thunderbolts%2A_poster.jpg/500px-Thunderbolts%2A_poster.jpg',
    posterAsset: require('../../assets/posters/thunderbolts-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Sinners_%282025_film%29_poster.jpg/500px-Sinners_%282025_film%29_poster.jpg',
    posterAsset: require('../../assets/posters/sinners-2025.jpg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Weapons_film_2025.jpeg/500px-Weapons_film_2025.jpeg',
    posterAsset: require('../../assets/posters/weapons-2025.jpeg') as ImageSourcePropType,
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
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/Black_Phone_2_poster.jpg/500px-Black_Phone_2_poster.jpg',
    posterAsset: require('../../assets/posters/black-phone-2-2025.jpg') as ImageSourcePropType,
    synopsis:
      'El terror vuelve a sonar cuando viejos traumas y nuevas llamadas conectan a los sobrevivientes con una amenaza que parecía enterrada.',
    cast: [
      { id: 'black-phone-cast-1', name: 'Mason Thames', role: 'Finney Blake', image: avatarUrl('Mason Thames') },
      { id: 'black-phone-cast-2', name: 'Madeleine McGraw', role: 'Gwen Blake', image: avatarUrl('Madeleine McGraw') },
      { id: 'black-phone-cast-3', name: 'Ethan Hawke', role: 'The Grabber', image: avatarUrl('Ethan Hawke') },
      { id: 'black-phone-cast-4', name: 'Jeremy Davies', role: 'Terrence Blake', image: avatarUrl('Jeremy Davies') },
    ],
  },
  michael: {
    id: 'michael-2026',
    title: 'Michael',
    genre: 'Biografia - Drama',
    duration: '2h 7m',
    rating: 4.4,
    classification: 'PG-13',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Michael_%282026_film_poster%29.png/500px-Michael_%282026_film_poster%29.png',
    posterAsset: require('../../assets/posters/michael-2026.png') as ImageSourcePropType,
    synopsis:
      'Pelicula biografica sobre Michael Jackson, desde sus inicios con los Jackson 5 hasta su ascenso como una de las mayores estrellas del pop.',
    cast: [
      { id: 'michael-cast-1', name: 'Jaafar Jackson', role: 'Michael Jackson', image: avatarUrl('Jaafar Jackson') },
      { id: 'michael-cast-2', name: 'Colman Domingo', role: 'Joe Jackson', image: avatarUrl('Colman Domingo') },
      { id: 'michael-cast-3', name: 'Nia Long', role: 'Katherine Jackson', image: avatarUrl('Nia Long') },
      { id: 'michael-cast-4', name: 'Miles Teller', role: 'John Branca', image: avatarUrl('Miles Teller') },
    ],
  },
  apex: {
    id: 'apex-2026',
    title: 'Apex',
    genre: 'Accion - Suspenso',
    duration: '1h 35m',
    rating: 4.1,
    classification: 'R',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/Apex_poster.jpg/500px-Apex_poster.jpg',
    posterAsset: require('../../assets/posters/apex-2026.jpg') as ImageSourcePropType,
    synopsis:
      'Una mujer en duelo se interna en la naturaleza australiana y queda atrapada en un juego mortal contra un cazador implacable.',
    cast: [
      { id: 'apex-cast-1', name: 'Charlize Theron', role: 'Sasha', image: avatarUrl('Charlize Theron') },
      { id: 'apex-cast-2', name: 'Taron Egerton', role: 'Ben', image: avatarUrl('Taron Egerton') },
      { id: 'apex-cast-3', name: 'Eric Bana', role: 'Tommy', image: avatarUrl('Eric Bana') },
      { id: 'apex-cast-4', name: 'Caitlin Stasey', role: 'Leah', image: avatarUrl('Caitlin Stasey') },
    ],
  },
  avatar3: {
    id: 'avatar-fire-and-ash-2025',
    title: 'Avatar: Fire and Ash',
    genre: 'Ciencia Ficción - Aventura',
    duration: '3h 12m',
    rating: 4.8,
    classification: 'PG-13',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Avatar_Fire_and_Ash_poster.jpeg/500px-Avatar_Fire_and_Ash_poster.jpeg',
    posterAsset: require('../../assets/posters/avatar-fire-and-ash-2025.jpeg') as ImageSourcePropType,
    synopsis:
      'Jake Sully y Neytiri se enfrentan a la tribu de la ceniza, una facción de Na\'vi que muestra el lado oscuro de Pandora mientras la guerra continúa.',
    cast: [
      { id: 'avatar3-cast-1', name: 'Sam Worthington', role: 'Jake Sully', image: avatarUrl('Sam Worthington') },
      { id: 'avatar3-cast-2', name: 'Zoe Saldaña', role: 'Neytiri', image: avatarUrl('Zoe Saldaña') },
      { id: 'avatar3-cast-3', name: 'Oona Chaplin', role: 'Varang', image: avatarUrl('Oona Chaplin') },
      { id: 'avatar3-cast-4', name: 'Sigourney Weaver', role: 'Kiri', image: avatarUrl('Sigourney Weaver') },
    ],
  },
  avengersDoomsday: {
    id: 'avengers-doomsday-2026',
    title: 'Avengers: Doomsday',
    genre: 'Acción - Superhéroes',
    duration: '2h 45m',
    rating: 4.9,
    classification: 'PG-13',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ee/Avengers_Doomsday_poster.jpg/500px-Avengers_Doomsday_poster.jpg',
    posterAsset: require('../../assets/posters/avengers-doomsday-2026.jpg') as ImageSourcePropType,
    synopsis:
      'Una nueva amenaza multiversal emerge. Los Vengadores restantes deben unirse para enfrentar al Dr. Doom, cuyo poder desafía la realidad misma.',
    cast: [
      { id: 'avengers-cast-1', name: 'Robert Downey Jr.', role: 'Victor Von Doom', image: avatarUrl('Robert Downey Jr.') },
      { id: 'avengers-cast-2', name: 'Pedro Pascal', role: 'Reed Richards', image: avatarUrl('Pedro Pascal') },
      { id: 'avengers-cast-3', name: 'Benedict Cumberbatch', role: 'Doctor Strange', image: avatarUrl('Benedict Cumberbatch') },
      { id: 'avengers-cast-4', name: 'Tom Holland', role: 'Spider-Man', image: avatarUrl('Tom Holland') },
    ],
  },
  spiderVerse3: {
    id: 'spider-man-beyond-2026',
    title: 'Spider-Man: Beyond the Spider-Verse',
    genre: 'Animación - Acción',
    duration: '2h 20m',
    rating: 4.9,
    classification: 'PG',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Spider-Man_Beyond_the_Spider-Verse_logo.jpg/500px-Spider-Man_Beyond_the_Spider-Verse_logo.jpg',
    posterAsset: require('../../assets/posters/spider-man-beyond-2026.jpg') as ImageSourcePropType,
    synopsis:
      'Miles Morales está atrapado en un universo alternativo donde él es el Prowler. Gwen Stacy lidera un equipo para salvarlo antes de que el multiverso colapse.',
    cast: [
      { id: 'spider-cast-1', name: 'Shameik Moore', role: 'Miles Morales', image: avatarUrl('Shameik Moore') },
      { id: 'spider-cast-2', name: 'Hailee Steinfeld', role: 'Gwen Stacy', image: avatarUrl('Hailee Steinfeld') },
      { id: 'spider-cast-3', name: 'Oscar Isaac', role: 'Miguel O\'Hara', image: avatarUrl('Oscar Isaac') },
      { id: 'spider-cast-4', name: 'Jake Johnson', role: 'Peter B. Parker', image: avatarUrl('Jake Johnson') },
    ],
  },
  toyStory5: {
    id: 'toy-story-5-2026',
    title: 'Toy Story 5',
    genre: 'Animacion - Familiar',
    duration: '1h 45m',
    rating: 4.8,
    classification: 'PG',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Toy_Story_5_poster.jpg/500px-Toy_Story_5_poster.jpg',
    posterAsset: require('../../assets/posters/toy-story-5-2026.jpg') as ImageSourcePropType,
    synopsis:
      'Woody, Buzz, Jessie y el resto de los juguetes enfrentan una amenaza tecnologica que cambia las reglas del tiempo de juego.',
    cast: [
      { id: 'toy-story-5-cast-1', name: 'Tom Hanks', role: 'Woody', image: avatarUrl('Tom Hanks') },
      { id: 'toy-story-5-cast-2', name: 'Tim Allen', role: 'Buzz Lightyear', image: avatarUrl('Tim Allen') },
      { id: 'toy-story-5-cast-3', name: 'Joan Cusack', role: 'Jessie', image: avatarUrl('Joan Cusack') },
      { id: 'toy-story-5-cast-4', name: "Conan O'Brien", role: 'Smarty Pants', image: avatarUrl("Conan O'Brien") },
    ],
  },
  projectHailMary: {
    id: 'project-hail-mary-2026',
    title: 'Project Hail Mary',
    genre: 'Ciencia ficcion - Aventura',
    duration: '2h 10m',
    rating: 4.7,
    classification: 'PG-13',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Project_Hail_Mary_poster.jpg/500px-Project_Hail_Mary_poster.jpg',
    posterAsset: require('../../assets/posters/project-hail-mary-2026.jpg') as ImageSourcePropType,
    synopsis:
      'Un profesor despierta solo en una nave espacial y debe recordar su mision para salvar a la Tierra de una crisis solar.',
    cast: [
      { id: 'project-hail-mary-cast-1', name: 'Ryan Gosling', role: 'Ryland Grace', image: avatarUrl('Ryan Gosling') },
      { id: 'project-hail-mary-cast-2', name: 'Sandra Huller', role: 'Eva Stratt', image: avatarUrl('Sandra Huller') },
      { id: 'project-hail-mary-cast-3', name: 'Milana Vayntrub', role: 'Olesya Ilyukhina', image: avatarUrl('Milana Vayntrub') },
      { id: 'project-hail-mary-cast-4', name: 'Ken Leung', role: 'Yao Li-Jie', image: avatarUrl('Ken Leung') },
    ],
  },
  mandalorianGrogu: {
    id: 'mandalorian-grogu-2026',
    title: 'The Mandalorian and Grogu',
    genre: 'Aventura - Ciencia ficcion',
    duration: '1h 55m',
    rating: 4.6,
    classification: 'PG-13',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/The_Mandalorian_and_Grogu_poster.jpg/500px-The_Mandalorian_and_Grogu_poster.jpg',
    posterAsset: require('../../assets/posters/mandalorian-grogu-2026.jpg') as ImageSourcePropType,
    synopsis:
      'Din Djarin y Grogu regresan a una nueva mision galactica donde su vinculo se convierte en su mayor fuerza.',
    cast: [
      { id: 'mandalorian-grogu-cast-1', name: 'Pedro Pascal', role: 'Din Djarin / The Mandalorian', image: avatarUrl('Pedro Pascal') },
      { id: 'mandalorian-grogu-cast-2', name: 'Sigourney Weaver', role: 'TBA', image: avatarUrl('Sigourney Weaver') },
      { id: 'mandalorian-grogu-cast-3', name: 'Jeremy Allen White', role: 'Rotta the Hutt', image: avatarUrl('Jeremy Allen White') },
      { id: 'mandalorian-grogu-cast-4', name: 'Steve Blum', role: 'Zeb', image: avatarUrl('Steve Blum') },
    ],
  },
  catInTheHat: {
    id: 'cat-in-the-hat-2026',
    title: 'The Cat in the Hat',
    genre: 'Animacion - Comedia',
    duration: '1h 35m',
    rating: 4.3,
    classification: 'PG',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/The_Cat_in_the_Hat_%28teaser_poster%2C_2026%29.png/500px-The_Cat_in_the_Hat_%28teaser_poster%2C_2026%29.png',
    posterAsset: require('../../assets/posters/cat-in-the-hat-2026.png') as ImageSourcePropType,
    synopsis:
      'El Gato del Sombrero lleva a dos hermanos a una aventura imaginativa mientras intenta demostrar que todavia puede inspirar alegria.',
    cast: [
      { id: 'cat-hat-cast-1', name: 'Bill Hader', role: 'The Cat in the Hat', image: avatarUrl('Bill Hader') },
      { id: 'cat-hat-cast-2', name: 'Xochitl Gomez', role: 'Gabby', image: avatarUrl('Xochitl Gomez') },
      { id: 'cat-hat-cast-3', name: 'Quinta Brunson', role: 'Sherri', image: avatarUrl('Quinta Brunson') },
      { id: 'cat-hat-cast-4', name: 'Matt Berry', role: 'The Fish', image: avatarUrl('Matt Berry') },
    ],
  },
  moanaLiveAction: {
    id: 'moana-2026',
    title: 'Moana',
    genre: 'Aventura - Familiar',
    duration: '1h 55m',
    rating: 4.5,
    classification: 'PG',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c1/Moana_%282026_film%29_poster.jpg/500px-Moana_%282026_film%29_poster.jpg',
    posterAsset: require('../../assets/posters/moana-2026.jpg') as ImageSourcePropType,
    synopsis:
      'Moana escucha el llamado del oceano y se embarca junto a Maui para salvar a su pueblo de una antigua maldicion.',
    cast: [
      { id: 'moana-2026-cast-1', name: "Catherine Laga'aia", role: 'Moana', image: avatarUrl("Catherine Laga'aia") },
      { id: 'moana-2026-cast-2', name: 'Dwayne Johnson', role: 'Maui', image: avatarUrl('Dwayne Johnson') },
      { id: 'moana-2026-cast-3', name: 'Rena Owen', role: 'Gramma Tala', image: avatarUrl('Rena Owen') },
      { id: 'moana-2026-cast-4', name: 'John Tui', role: 'Chief Tui', image: avatarUrl('John Tui') },
    ],
  },
  returnToSilentHill: {
    id: 'return-to-silent-hill-2026',
    title: 'Return to Silent Hill',
    genre: 'Terror - Misterio',
    duration: '1h 36m',
    rating: 4.2,
    classification: 'R',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Return_to_Silent_Hill_poster.jpg/500px-Return_to_Silent_Hill_poster.jpg',
    posterAsset: require('../../assets/posters/return-to-silent-hill-2026.jpg') as ImageSourcePropType,
    synopsis:
      'James vuelve a Silent Hill siguiendo una carta misteriosa y encuentra un pueblo deformado por pesadillas que ponen en duda su cordura.',
    cast: [
      { id: 'silent-hill-cast-1', name: 'Jeremy Irvine', role: 'James Sunderland', image: avatarUrl('Jeremy Irvine') },
      { id: 'silent-hill-cast-2', name: 'Hannah Emily Anderson', role: 'Mary / Maria', image: avatarUrl('Hannah Emily Anderson') },
      { id: 'silent-hill-cast-3', name: 'Evie Templeton', role: 'Laura', image: avatarUrl('Evie Templeton') },
      { id: 'silent-hill-cast-4', name: 'Pearse Egan', role: 'Eddie Dombrowski', image: avatarUrl('Pearse Egan') },
    ],
  },
  mastersOfTheUniverse: {
    id: 'masters-of-the-universe-2026',
    title: 'Masters of the Universe',
    genre: 'Fantasia - Accion',
    duration: '2h 05m',
    rating: 4.4,
    classification: 'PG-13',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/09/Masters_of_the_Universe_2026_poster.jpeg/500px-Masters_of_the_Universe_2026_poster.jpeg',
    posterAsset: require('../../assets/posters/masters-of-the-universe-2026.jpeg') as ImageSourcePropType,
    synopsis:
      'El principe Adam descubre su destino como He-Man y debe defender Eternia frente al poder oscuro de Skeletor.',
    cast: [
      { id: 'masters-cast-1', name: 'Nicholas Galitzine', role: 'Prince Adam / He-Man', image: avatarUrl('Nicholas Galitzine') },
      { id: 'masters-cast-2', name: 'Camila Mendes', role: 'Teela', image: avatarUrl('Camila Mendes') },
      { id: 'masters-cast-3', name: 'Alison Brie', role: 'Evil-Lyn', image: avatarUrl('Alison Brie') },
      { id: 'masters-cast-4', name: 'Jared Leto', role: 'Skeletor', image: avatarUrl('Jared Leto') },
    ],
  },
};

export const RECENT_MOVIE_LIST = [
  RECENT_MOVIES.michael,
  RECENT_MOVIES.apex,
  RECENT_MOVIES.toyStory5,
  RECENT_MOVIES.projectHailMary,
  RECENT_MOVIES.mandalorianGrogu,
  RECENT_MOVIES.catInTheHat,
  RECENT_MOVIES.moanaLiveAction,
  RECENT_MOVIES.returnToSilentHill,
  RECENT_MOVIES.mastersOfTheUniverse,
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
  RECENT_MOVIES.avatar3,
  RECENT_MOVIES.avengersDoomsday,
  RECENT_MOVIES.spiderVerse3,
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
  posterAsset?: ImageSourcePropType;
  imageUrl?: string;
  backdropUrl?: string;
  cast?: CastMember[];
};

export const getMovieImage = (movie: ReservationMovie) =>
  movie.posterUrl || movie.imageUrl || movie.backdropUrl || RECENT_MOVIES.superman.posterUrl;

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
    posterUrl: fallback.posterUrl || movie?.posterUrl || movie?.imageUrl || movie?.backdropUrl,
    imageUrl: fallback.posterUrl || movie?.posterUrl || movie?.imageUrl || movie?.backdropUrl,
    backdropUrl: fallback.posterUrl || movie?.posterUrl || movie?.imageUrl || movie?.backdropUrl,
    posterAsset: movie?.posterAsset || fallback.posterAsset,
    cast: movie?.cast?.length ? movie.cast : fallback.cast,
  };
};
