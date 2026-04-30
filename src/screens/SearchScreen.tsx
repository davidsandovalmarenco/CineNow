import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, FlatList, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { movieService } from '../services/movieService';
import { MovieData } from '../services/types';

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
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar películas, géneros..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity
                key={cat}
                style={[styles.categoryBtn, selectedCategory === cat && styles.categoryBtnActive]}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resultados para "{selectedCategory}"</Text>
          {loading ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          ) : (
            <FlatList
              data={filteredMovies}
              keyExtractor={(item) => item.id || Math.random().toString()}
              numColumns={2}
              contentContainerStyle={styles.resultsList}
              columnWrapperStyle={styles.columnWrapper}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons name="search-outline" size={48} color={colors.textSecondary} />
                  <Text style={styles.emptyText}>No se encontraron películas</Text>
                </View>
              }
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.resultCard} 
                  onPress={() => handleMoviePress(item.id || '')}
                >
                  <Image source={{ uri: item.posterUrl }} style={styles.resultPoster} />
                  <View style={styles.resultInfo}>
                    <Text style={styles.resultTitle} numberOfLines={1}>{item.title}</Text>
                    <View style={styles.resultMeta}>
                      <Text style={styles.resultGenre}>{item.genre ? item.genre.split(' ')[0] : ''}</Text>
                      <View style={styles.ratingRow}>
                        <Ionicons name="star" size={12} color={colors.primary} />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Búsquedas Recientes</Text>
          <View style={styles.recentList}>
            <TouchableOpacity style={styles.recentItem}>
              <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.recentText}>Avatar: The Way of Water</Text>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.recentItem}>
              <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
              <Text style={styles.recentText}>The Batman</Text>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.m,
    paddingTop: spacing.s,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    paddingHorizontal: spacing.m,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    marginLeft: spacing.s,
  },
  section: {
    marginTop: spacing.l,
    paddingHorizontal: spacing.m,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.m,
  },
  categoriesScroll: {
    gap: spacing.s,
  },
  categoryBtn: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.m,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  categoryBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  categoryTextActive: {
    color: colors.text,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.m,
  },
  resultsList: {
    paddingBottom: spacing.xxl,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  resultCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: spacing.m,
  },
  resultPoster: {
    width: '100%',
    height: 200,
  },
  resultInfo: {
    padding: spacing.s,
  },
  resultTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  resultGenre: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  recentList: {
    gap: spacing.s,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.02)',
    padding: spacing.m,
    borderRadius: borderRadius.m,
    gap: spacing.m,
  },
  recentText: {
    flex: 1,
    color: colors.textSecondary,
    fontSize: 14,
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
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: spacing.m,
  },
});
