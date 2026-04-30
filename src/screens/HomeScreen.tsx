import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useMovies } from '../hooks/useMovies';
import { MovieCard, Movie } from '../components/MovieCard';

export const HomeScreen = ({ navigation }: any) => {
  const { movies, fetchAllMovies, isLoading } = useMovies();

  useEffect(() => {
    fetchAllMovies();
  }, []);

  const handleMoviePress = (movie: any) => {
    navigation.navigate('MovieDetail', { movieId: movie.id });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Ionicons name="film" size={24} color={colors.primary} />
        <Text style={styles.headerTitle}>CineNow</Text>
      </View>
      <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ProfileTab')}>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4hJZVmd5HnlS1UNp7P-Sth4b--grJxAB1L09UWN7Ay3vZLB6a962sCmUw0csTsIYvEYG7nIYy-A3p7uZ5GqsORD2JopGnu0SqWQovUmT4xVtSjxbDY-VdqZ07bVNp0UBnnwFC7rVBDjaOUOYP8WlrW01tJ_mCQwfp4_bb85NJicyiKMwTFRZLx8vd82IyKTXvIGQr2xwnFoYt33sWHl7O5BEMyZWpz6CTo9_mQoNSzsVXynBAfBxJ7sLP8TN9gfiswoF13qeUMJI' }} 
          style={styles.profileImg} 
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <ImageBackground
            source={{ uri: movies[0]?.posterUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBm6TTIVRqH5yhnnqUG01VM2EJGK-qrwWBj1INNMZU3jwqgfXZvF_8HsJXPISunI55WykKZLXxAe823jGxc60nhGNJMOYjyw916WEYmYOamSZ_xys1zWCEa8rLZK9WqiqhI-P2oiesUzLgSqNBEFSOit1Tw_zUxKUuw_0r2dAhJ1Un0JOOlwYdqwE7AjUKw6LndrUcC0l-hp-l9NHvQSkCHJxe9vJkc0rZ9QLh8hznEXiLM0lk-x2inO2vJ6ITAMDZ7CpRziac8GpU' }}
            style={styles.heroImage}
            imageStyle={{ borderRadius: borderRadius.xl }}
          >
            <View style={styles.heroGradient}>
              <View style={styles.heroBadges}>
                <View style={styles.badgePrimary}><Text style={styles.badgePrimaryText}>IMAX</Text></View>
                <View style={styles.badgeSecondary}><Text style={styles.badgeSecondaryText}>ESTRENO</Text></View>
              </View>
              <Text style={styles.heroTitle}>{movies[0]?.title || 'Marea Galáctica: El Origen'}</Text>
              <Text style={styles.heroDesc} numberOfLines={2}>
                {movies[0]?.synopsis || 'Una odisea visual que desafía los límites del tiempo y el espacio en una experiencia cinematográfica sin precedentes.'}
              </Text>
              
              <View style={styles.heroActions}>
                <TouchableOpacity 
                  style={styles.btnPrimary} 
                  onPress={() => handleMoviePress(movies[0] || { id: 'hero-1' })}
                >
                  <Ionicons name="ticket-outline" size={20} color={colors.text} />
                  <Text style={styles.btnPrimaryText}>Reservar Ahora</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnOutline}>
                  <Text style={styles.btnOutlineText}>Trailer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Estrenos Carousel */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Estrenos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllBtn}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={movies}
            keyExtractor={(item) => item.id || Math.random().toString()}
            renderItem={({ item }) => (
              <MovieCard movie={item as any} onPress={handleMoviePress} />
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* En Cartelera (Vertical List) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>En cartelera</Text>
          {movies.map((movie) => (
            <TouchableOpacity 
              key={`cartelera-${movie.id}`} 
              style={styles.carteleraCard}
              onPress={() => handleMoviePress(movie)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: movie.posterUrl }} style={styles.carteleraImg} />
              <View style={styles.carteleraInfo}>
                <View style={styles.carteleraBadges}>
                  <Text style={styles.carteleraBadgeText}>4K</Text>
                  <Text style={styles.carteleraBadgeTextDim}>SUB</Text>
                </View>
                <Text style={styles.carteleraTitle} numberOfLines={1}>{movie.title}</Text>
                <Text style={styles.carteleraDesc} numberOfLines={1}>{movie.synopsis || movie.genre}</Text>
                
                <View style={styles.carteleraMeta}>
                  <Ionicons name="time-outline" size={14} color={colors.primary} />
                  <Text style={styles.carteleraMetaText}>{movie.duration}</Text>
                  <Ionicons name="star" size={14} color={colors.primary} style={{ marginLeft: spacing.s }} />
                  <Text style={styles.carteleraMetaText}>{movie.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingTop: 50, // For SafeArea roughly
    paddingBottom: spacing.s,
    backgroundColor: 'rgba(10, 10, 10, 0.9)',
    zIndex: 10,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  heroContainer: {
    padding: spacing.m,
    height: 480,
  },
  heroImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroGradient: {
    padding: spacing.m,
    backgroundColor: 'rgba(0,0,0,0.6)', // Simulated gradient
    borderBottomLeftRadius: borderRadius.xl,
    borderBottomRightRadius: borderRadius.xl,
  },
  heroBadges: {
    flexDirection: 'row',
    gap: spacing.s,
    marginBottom: spacing.s,
  },
  badgePrimary: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
  },
  badgePrimaryText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  badgeSecondary: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.s,
    paddingVertical: 4,
    borderRadius: borderRadius.round,
  },
  badgeSecondaryText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  heroDesc: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.m,
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.m,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.m,
    gap: spacing.xs,
  },
  btnPrimaryText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  btnOutline: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.m,
    justifyContent: 'center',
  },
  btnOutlineText: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.m,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  seeAllBtn: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  listContent: {
    paddingRight: spacing.m,
  },
  carteleraCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    padding: spacing.s,
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.03)',
  },
  carteleraImg: {
    width: 80,
    height: 120,
    borderRadius: borderRadius.s,
  },
  carteleraInfo: {
    flex: 1,
    marginLeft: spacing.m,
    justifyContent: 'center',
  },
  carteleraBadges: {
    flexDirection: 'row',
    gap: spacing.s,
    marginBottom: spacing.xs,
  },
  carteleraBadgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  carteleraBadgeTextDim: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  carteleraTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  carteleraDesc: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: spacing.s,
  },
  carteleraMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  carteleraMetaText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
});
