import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { movieService } from '../services/movieService';
import { MovieData } from '../services/types';
import { BlurView } from 'expo-blur';

const CATEGORIES = ['Todos', 'Acción', 'Drama', 'Comedia', 'Terror', 'Sci-Fi', 'Animación'];

export const SearchScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [allMovies, setAllMovies] = useState<MovieData[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<MovieData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await movieService.getAllMovies();
        setAllMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error('Error fetching movies for search:', error);
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

  const handleMoviePress = (movieId: string) => {
    navigation.navigate('HomeTab', {
      screen: 'MovieDetail',
      params: { movieId }
    });
  };

  return (
    <View style={styles.container}>
      <BlurView intensity={80} tint="dark" style={styles.headerContainer}>
        <SafeAreaView>
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
        </SafeAreaView>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={[typography.h3, styles.sectionTitle]}>Categorías</Text>
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
          <Text style={[typography.h3, styles.sectionTitle]}>Resultados para "{selectedCategory}"</Text>
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
                  onPress={() => handleMoviePress(item.id || '')}
                  activeOpacity={0.8}
                >
                  <View style={styles.resultImageContainer}>
                    <Image source={{ uri: item.posterUrl }} style={styles.resultPoster} />
                    <View style={styles.ratingBadge}>
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  </View>
                  <View style={styles.resultInfo}>
                    <Text style={[typography.bodyLg, styles.resultTitle]} numberOfLines={1}>{item.title}</Text>
                    <Text style={[typography.bodyMd, styles.resultGenre]}>{item.genre ? item.genre.split(' ')[0] : ''}</Text>
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
              <Text style={[typography.bodyMd, styles.recentText]}>Avatar: The Way of Water</Text>
              <Ionicons name="close" size={20} color={colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentItem}>
              <Ionicons name="time-outline" size={20} color={colors.secondary} />
              <Text style={[typography.bodyMd, styles.recentText]}>The Batman</Text>
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
    paddingTop: spacing.sm,
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
    paddingBottom: 100, // Space for bottom tab
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.containerMargin,
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: spacing.md,
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
