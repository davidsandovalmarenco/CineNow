import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { MovieCard } from '../components/MovieCard';
import { RemoteImage } from '../components/RemoteImage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RECENT_MOVIE_LIST, RECENT_MOVIES } from '../data/recentMovies';
import { APP_NAME, CINEMA_LOCATION } from '../config/locale';
import { useProfile } from '../hooks/useProfile';

const HERO_MOVIE = {
  ...RECENT_MOVIES.michael,
  description: RECENT_MOVIES.michael.synopsis,
  imageUrl: RECENT_MOVIES.michael.posterUrl,
};

const ESTRENOS = [
  {
    ...RECENT_MOVIES.apex,
    rating: 7.7,
  },
  {
    ...RECENT_MOVIES.projectHailMary,
    rating: 8.8,
  },
  {
    ...RECENT_MOVIES.mandalorianGrogu,
    rating: 8.6,
  },
  {
    ...RECENT_MOVIES.catInTheHat,
    rating: 8.2,
  },
  {
    ...RECENT_MOVIES.moanaLiveAction,
    rating: 8.4,
  },
  {
    ...RECENT_MOVIES.mastersOfTheUniverse,
    rating: 8.3,
  },
];

const UPCOMING = [
  {
    id: RECENT_MOVIES.michael.id,
    title: RECENT_MOVIES.michael.title,
    date: 'ABRIL 2026',
    imageUrl: RECENT_MOVIES.michael.posterUrl,
    posterAsset: RECENT_MOVIES.michael.posterAsset,
  },
  {
    id: RECENT_MOVIES.apex.id,
    title: RECENT_MOVIES.apex.title,
    date: 'NETFLIX 2026',
    imageUrl: RECENT_MOVIES.apex.posterUrl,
    posterAsset: RECENT_MOVIES.apex.posterAsset,
  },
  {
    id: RECENT_MOVIES.projectHailMary.id,
    title: RECENT_MOVIES.projectHailMary.title,
    date: 'MARZO 2026',
    imageUrl: RECENT_MOVIES.projectHailMary.posterUrl,
    posterAsset: RECENT_MOVIES.projectHailMary.posterAsset,
  },
];

const IN_THEATERS = RECENT_MOVIE_LIST.slice(4).map((movie, index) => ({
  ...movie,
  description: movie.synopsis,
  tags: index % 2 === 0 ? ['4K', 'SUB'] : ['ATMOS', 'DOB'],
}));

const { width } = Dimensions.get('window');
const HERO_HEIGHT = width * 1.5; // Roughly matches the 751px height in mockup

export const HomeScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const { avatarUri } = useProfile();

  const handleMoviePress = (movie: any) => {
    navigation.navigate('MovieDetail', { movie });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* TopAppBar */}
      <BlurView intensity={80} tint="dark" style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Ionicons name="film" size={24} color={colors.primaryContainer} />
            <Text style={[typography.h2, styles.logoText, { fontSize: 20 }]}>{APP_NAME}</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ProfileTab')}>
            <Image source={{ uri: avatarUri }} style={styles.profileImg} />
          </TouchableOpacity>
        </View>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <RemoteImage uri={HERO_MOVIE.imageUrl} assetSource={HERO_MOVIE.posterAsset} fallbackLabel={HERO_MOVIE.title} style={styles.heroImage} resizeMode="cover" />
          <LinearGradient
            colors={['transparent', 'rgba(13, 13, 13, 0.8)', '#0D0D0D']}
            locations={[0, 0.7, 1]}
            style={styles.heroGradient}
          />
          
          <View style={styles.heroContent}>
            <View style={styles.badgesRow}>
              <View style={styles.badgePrimary}>
                <Text style={styles.badgeTextPrimary}>CHINANDEGA</Text>
              </View>
              <BlurView intensity={40} tint="light" style={styles.badgeSecondary}>
                <Text style={styles.badgeTextSecondary}>ESTRENO</Text>
              </BlurView>
            </View>
            
            <Text style={[typography.h1, styles.heroTitle]}>{HERO_MOVIE.title}</Text>
            <Text style={[typography.bodyMd, styles.heroDesc]}>{HERO_MOVIE.description}</Text>
            <Text style={styles.locationText}>{CINEMA_LOCATION}</Text>
            
            <View style={styles.heroActions}>
              <TouchableOpacity 
                style={styles.btnReserve} 
                onPress={() => handleMoviePress(HERO_MOVIE)}
                activeOpacity={0.8}
              >
                <Ionicons name="ticket" size={20} color={colors.onPrimaryContainer} />
                <Text style={styles.btnReserveText}>Reservar ahora</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.btnTrailer} activeOpacity={0.8}>
                <Text style={styles.btnTrailerText}>Tráiler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Estrenos */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={typography.h2}>Estrenos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
            {ESTRENOS.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie as any} 
                onPress={handleMoviePress} 
                width={176} // w-44 equivalent
              />
            ))}
          </ScrollView>
        </View>

        {/* Recientes destacados */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={typography.h2}>Recientes destacados</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScrollPadding}>
            {UPCOMING.map(movie => (
              <TouchableOpacity key={movie.id} style={styles.upcomingCard} activeOpacity={0.9}>
                <RemoteImage uri={movie.imageUrl} assetSource={movie.posterAsset} fallbackLabel={movie.title} style={styles.upcomingImage} />
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={styles.upcomingGradient}
                />
                <View style={styles.upcomingContent}>
                  <Text style={styles.upcomingDate}>{movie.date}</Text>
                  <Text style={[typography.h3, { color: '#fff' }]}>{movie.title}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* En cartelera */}
        <View style={[styles.sectionContainer, { marginBottom: spacing.xl * 2 }]}>
          <Text style={[typography.h2, { marginBottom: spacing.md, paddingHorizontal: spacing.containerMargin }]}>
            En cartelera
          </Text>
          
          <View style={{ paddingHorizontal: spacing.containerMargin, gap: spacing.md }}>
            {IN_THEATERS.map(movie => (
              <TouchableOpacity 
                key={movie.id} 
                style={styles.listCard} 
                onPress={() => handleMoviePress(movie)}
                activeOpacity={0.8}
              >
                <RemoteImage uri={movie.posterUrl} assetSource={movie.posterAsset} fallbackLabel={movie.title} style={styles.listPoster} />
                <View style={styles.listInfo}>
                  <View style={styles.listTagsRow}>
                    <Text style={styles.listTagPrimary}>{movie.tags[0]}</Text>
                    <Text style={styles.listTagSecondary}>{movie.tags[1]}</Text>
                  </View>
                  <Text style={[typography.h3, { marginBottom: 4 }]} numberOfLines={1}>{movie.title}</Text>
                  <Text style={[typography.bodyMd, { marginBottom: spacing.md }]} numberOfLines={1}>{movie.description}</Text>
                  
                  <View style={styles.listMetaRow}>
                    <Ionicons name="time-outline" size={14} color={colors.primaryContainer} />
                    <Text style={styles.listMetaText}>{movie.duration}</Text>
                    <Ionicons name="star" size={14} color={colors.primaryContainer} style={{ marginLeft: spacing.sm }} />
                    <Text style={styles.listMetaText}>{movie.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
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
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 50,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  headerContent: {
    height: 64, // h-16
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.containerMargin,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoText: {
    color: colors.primaryContainer,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    // padding added dynamically
  },
  heroContainer: {
    height: HERO_HEIGHT,
    width: '100%',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  badgePrimary: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  badgeTextPrimary: {
    color: colors.onPrimaryContainer,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  badgeSecondary: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  badgeTextSecondary: {
    color: colors.onSurface,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  heroTitle: {
    maxWidth: '90%',
  },
  heroDesc: {
    maxWidth: 320,
    marginBottom: spacing.xs,
  },
  locationText: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  heroActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.base,
  },
  btnReserve: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  btnReserveText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
  btnTrailer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
  },
  btnTrailerText: {
    color: '#fff',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
  sectionContainer: {
    marginTop: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.containerMargin,
  },
  seeAllText: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  horizontalScrollPadding: {
    paddingHorizontal: spacing.containerMargin,
  },
  upcomingCard: {
    width: 288, // w-72
    height: 160, // h-40
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginRight: spacing.md,
  },
  upcomingImage: {
    width: '100%',
    height: '100%',
  },
  upcomingGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  upcomingContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: spacing.md,
  },
  upcomingDate: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 4,
  },
  listCard: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: borderRadius.xl,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.03)',
  },
  listPoster: {
    width: 96, // w-24
    aspectRatio: 2 / 3,
    borderRadius: borderRadius.default,
  },
  listInfo: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  listTagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: 4,
  },
  listTagPrimary: {
    color: colors.primaryContainer,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  listTagSecondary: {
    color: colors.secondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  listMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listMetaText: {
    color: colors.onSurface,
    fontSize: 11,
    fontFamily: 'Inter',
    fontWeight: '600',
  },
});
