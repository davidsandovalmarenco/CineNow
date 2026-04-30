import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { movieService } from '../services/movieService';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  getMovieImage,
  normalizeReservationMovie,
  RECENT_MOVIE_LIST,
  RECENT_MOVIES,
  ReservationMovie,
} from '../data/recentMovies';

const FALLBACK_MOVIES = RECENT_MOVIE_LIST.map((movie) => normalizeReservationMovie(movie));
const CATEGORIES = ['Todos', 'Acción', 'Aventura', 'Ciencia Ficción', 'Fantasía', 'Familiar', 'Comedia', 'Horror', 'Thriller'];

const mergeMovies = (remoteMovies: ReservationMovie[]) => {
  const movieMap = new Map<string, ReservationMovie>();

  [...FALLBACK_MOVIES, ...remoteMovies].forEach((movie) => {
    const key = (movie.id || movie.title).toLowerCase();
    movieMap.set(key, movie);
  });

  return Array.from(movieMap.values());
};

export const SearchScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [allMovies, setAllMovies] = useState<ReservationMovie[]>(FALLBACK_MOVIES);
  const [filteredMovies, setFilteredMovies] = useState<ReservationMovie[]>(FALLBACK_MOVIES);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getAllMovies();
        const firebaseMovies = data.map((movie) => normalizeReservationMovie(movie));
        const nextMovies = mergeMovies(firebaseMovies);
        setAllMovies(nextMovies);
        setFilteredMovies(nextMovies);
      } catch (error) {
        console.error('Error fetching movies for search:', error);
        setAllMovies(FALLBACK_MOVIES);
        setFilteredMovies(FALLBACK_MOVIES);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const filtered = allMovies.filter(movie => {
      const titleMatch = movie.title ? movie.title.toLowerCase().includes(search.toLowerCase()) : false;
      const genreMatch = movie.genre ? movie.genre.toLowerCase().includes(search.toLowerCase()) : false;
      const matchesSearch = titleMatch || genreMatch;
      const matchesCategory = selectedCategory === 'Todos' || (movie.genre && movie.genre.includes(selectedCategory));
      return matchesSearch && matchesCategory;
    });
    setFilteredMovies(filtered);
  }, [search, selectedCategory, allMovies]);

  const handleMoviePress = (movie: ReservationMovie) => {
    navigation.navigate('MovieDetail', { movie });
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="dark" style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color={colors.secondary} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar películas, géneros..."
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={search}
                onChangeText={setSearch}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')}>
                  <Ionicons name="close-circle" size={20} color={colors.secondary} />
                </TouchableOpacity>
              )}
            </View>
          </View>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 90 }]}>
        <View style={styles.heroSection}>
          <Text style={[typography.h1, styles.heroTitle]}>Explorar cartelera</Text>
          <Text style={[typography.bodyMd, styles.heroSubtitle]}>
            Encuentra estrenos recientes, formatos premium y funciones disponibles.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.h3, styles.sectionTitle]}>Categorías</Text>
            <Text style={styles.catalogCount}>{allMovies.length} películas</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[typography.labelCaps, styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={[styles.section, { flex: 1 }]}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.h3, styles.sectionTitle]}>{selectedCategory === 'Todos' ? 'Todas las películas' : selectedCategory}</Text>
            <Text style={styles.catalogCount}>{filteredMovies.length} resultados</Text>
          </View>
          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={colors.primaryContainer} />
            </View>
          ) : (
            <FlatList
              data={filteredMovies}
              keyExtractor={(item) => item.id || Math.random().toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.resultsList}
              columnWrapperStyle={styles.columnWrapper}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="search-outline" size={48} color={colors.secondary} />
                  <Text style={[typography.bodyMd, styles.emptyText]}>No se encontraron películas</Text>
                </View>
              }
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.resultCard} 
                  onPress={() => handleMoviePress(item)}
                  activeOpacity={0.8}
                >
                  <View style={styles.resultImageContainer}>
                    <Image source={{ uri: getMovieImage(item) }} style={styles.resultPoster} />
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={[typography.bodyLg, styles.resultTitle]} numberOfLines={1}>{item.title}</Text>
                    <Text style={[typography.bodyMd, styles.resultGenre]} numberOfLines={1}>{item.genre}</Text>
                    <View style={styles.resultMetaRow}>
                      <Text style={styles.metaChip}>{item.classification || 'PG-13'}</Text>
                      <Text style={styles.resultDuration}>{item.duration}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <View style={[styles.section, { marginBottom: spacing.xl }]}>
          <Text style={[typography.h3, styles.sectionTitle]}>Búsquedas Recientes</Text>
          <View style={styles.recentList}>
            <TouchableOpacity style={styles.recentItem}>
              <Ionicons name="time-outline" size={20} color={colors.secondary} />
              <Text style={[typography.bodyMd, styles.recentText]}>{RECENT_MOVIES.superman.title}</Text>
              <Ionicons name="close" size={20} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentItem}>
              <Ionicons name="time-outline" size={20} color={colors.secondary} />
              <Text style={[typography.bodyMd, styles.recentText]}>{RECENT_MOVIES.jurassic.title}</Text>
              <Ionicons name="close" size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  header: {
    padding: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(71, 71, 70, 0.3)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  searchInput: {
    flex: 1,
    color: colors.onSurface,
    fontSize: 16,
    fontFamily: 'Inter',
    marginLeft: spacing.sm,
  },
  scrollContent: {
    // padding controlled dynamically
  },
  heroSection: {
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  heroTitle: {
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  heroSubtitle: {
    color: colors.secondary,
    maxWidth: 320,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.containerMargin,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: 0,
    flexShrink: 1,
  },
  catalogCount: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  categoriesScroll: {
    gap: spacing.sm,
  },
  categoryBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  categoryBtnActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  categoryText: {
    color: colors.secondary,
  },
  categoryTextActive: {
    color: colors.onPrimaryContainer,
  },
  resultsList: {
    gap: spacing.md,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  resultCard: {
    width: '47%',
    marginBottom: spacing.md,
  },
  resultImageContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: colors.surfaceContainer,
    marginBottom: spacing.xs,
    position: 'relative',
  },
  resultPoster: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultInfo: {
    paddingHorizontal: 2,
  },
  resultTitle: {
    color: colors.onBackground,
    marginBottom: 2,
  },
  resultGenre: {
    color: colors.onSurfaceVariant,
  },
  resultMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  metaChip: {
    overflow: 'hidden',
    color: colors.onPrimaryContainer,
    backgroundColor: colors.primaryContainer,
    borderRadius: borderRadius.sm,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '700',
  },
  resultDuration: {
    color: colors.secondary,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
  },
  recentList: {
    gap: spacing.sm,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
    gap: spacing.md,
  },
  recentText: {
    flex: 1,
    color: colors.onSurface,
  },
  centered: {
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    padding: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  emptyText: {
    color: colors.secondary,
    marginTop: spacing.md,
  },
});
