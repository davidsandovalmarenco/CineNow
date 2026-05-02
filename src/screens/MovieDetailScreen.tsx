import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMovieImage, normalizeReservationMovie } from '../data/recentMovies';
import { RemoteImage } from '../components/RemoteImage';

const MOVIE_DETAIL_EXTRAS = {
  formats: [
    { id: 'f1', name: '4DX', icon: 'water-outline' },
    { id: 'f2', name: 'IMAX 3D', icon: 'videocam-outline' },
    { id: 'f3', name: 'Dolby Atmos', icon: 'volume-high-outline' },
  ]
};

const HEADER_HEIGHT = 530;

export const MovieDetailScreen = ({ navigation, route }: any) => {
  const insets = useSafeAreaInsets();
  const movie = normalizeReservationMovie(route.params?.movie);
  const [selectedFormat, setSelectedFormat] = useState(MOVIE_DETAIL_EXTRAS.formats[1].name);

  const handleSchedulePress = () => {
    navigation.navigate('Schedule', { movie, selectedFormat });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Hero */}
        <View style={styles.heroContainer}>
          <RemoteImage uri={getMovieImage(movie)} assetSource={movie.posterAsset} fallbackLabel={movie.title} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(13, 13, 13, 0.4)', '#0D0D0D']}
            locations={[0, 0.6, 1]}
            style={styles.gradient}
          />
          
          <TouchableOpacity 
            style={[styles.backButton, { top: Math.max(insets.top, 20) }]} 
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}
          >
            <BlurView intensity={20} tint="dark" style={styles.backButtonBlur}>
              <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
            </BlurView>
          </TouchableOpacity>

          <View style={styles.heroContent}>
            <View style={styles.badgesRow}>
              <View style={styles.badgePrimary}>
                <Text style={styles.badgeTextPrimary}>IMAX</Text>
              </View>
              <View style={styles.badgeSecondary}>
                <Text style={styles.badgeTextSecondary}>4K ULTRA HD</Text>
              </View>
            </View>

            <Text style={[typography.h1, styles.title]}>{movie.title}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={18} color={colors.primaryContainer} />
                <Text style={styles.metaText}>{movie.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="star" size={18} color={colors.primaryContainer} />
                <Text style={styles.metaText}>{movie.rating.toFixed(1)} (2025)</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="planet-outline" size={18} color={colors.primaryContainer} />
                <Text style={styles.metaText}>{movie.genre}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Synopsis */}
        <View style={styles.section}>
          <Text style={[typography.h2, styles.sectionTitle]}>Sinopsis</Text>
          <Text style={[typography.bodyLg, styles.synopsisText]}>
            {movie.synopsis || 'Sinopsis no disponible por el momento.'}
          </Text>
        </View>

        {/* Cast */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <Text style={[typography.h2, styles.sectionTitle, { marginBottom: 0 }]}>Reparto Principal</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>VER TODO</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.castGrid}>
            {movie.cast?.map((actor) => (
              <View key={actor.id} style={styles.castCardWrapper}>
                <BlurView intensity={20} tint="dark" style={styles.castCard}>
                  <Image source={{ uri: actor.image }} style={styles.castImage} />
                  <Text style={styles.castName} numberOfLines={1}>{actor.name}</Text>
                  <Text style={styles.castRole} numberOfLines={1}>{actor.role}</Text>
                </BlurView>
              </View>
            ))}
          </View>
        </View>

        {/* Formats */}
        <View style={[styles.section, { marginBottom: spacing.xl * 2 }]}>
          <Text style={[typography.h2, styles.sectionTitle]}>Formatos disponibles</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.formatsScroll}>
            {MOVIE_DETAIL_EXTRAS.formats.map((format) => {
              const isSelected = selectedFormat === format.name;

              return (
                <TouchableOpacity
                  key={format.id}
                  activeOpacity={0.85}
                  onPress={() => setSelectedFormat(format.name)}
                >
                  <BlurView
                    intensity={20}
                    tint="dark"
                    style={[
                      styles.formatCard,
                      isSelected && styles.formatCardActive
                    ]}
                  >
                    <Ionicons
                      name={format.icon as any}
                      size={24}
                      color={isSelected ? colors.primaryContainer : colors.onSurface}
                    />
                    <Text style={[
                      typography.button,
                      styles.formatText,
                      isSelected && styles.formatTextActive
                    ]}>
                      {format.name}
                    </Text>
                  </BlurView>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

      </ScrollView>

      {/* Sticky Bottom CTA */}
      <BlurView intensity={40} tint="dark" style={[styles.bottomCta, { paddingBottom: insets.bottom }]}>
        <View style={styles.ctaContent}>
          <TouchableOpacity 
            style={styles.ctaButton}
            onPress={handleSchedulePress}
            activeOpacity={0.9}
          >
            <Ionicons name="ticket" size={20} color={colors.onPrimaryContainer} />
            <Text style={styles.ctaButtonText}>Ver horarios</Text>
          </TouchableOpacity>
        </View>
      </BlurView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  scrollContent: {
    paddingBottom: 120, // space for sticky footer
  },
  heroContainer: {
    width: '100%',
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    left: spacing.containerMargin,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  backButtonBlur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 28, 28, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.lg,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
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
    backgroundColor: colors.surfaceContainerHighest,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  badgeTextSecondary: {
    color: colors.onSurface,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  title: {
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.containerMargin,
  },
  sectionTitle: {
    color: colors.onSurface,
    marginBottom: spacing.md,
  },
  synopsisText: {
    color: colors.secondary,
    lineHeight: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  seeAllText: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  castGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -(spacing.xs / 2),
  },
  castCardWrapper: {
    width: '25%', // 4 columns
    paddingHorizontal: spacing.xs / 2,
    marginBottom: spacing.sm,
  },
  castCard: {
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    alignItems: 'center',
    backgroundColor: 'rgba(28, 28, 28, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  castImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  castName: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 11,
    color: colors.onSurface,
    textAlign: 'center',
  },
  castRole: {
    fontFamily: 'Inter',
    fontSize: 10,
    color: colors.secondary, // zinc-500 equivalent
    textAlign: 'center',
  },
  formatsScroll: {
    gap: spacing.md,
  },
  formatCard: {
    minWidth: 140,
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(28, 28, 28, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  formatCardActive: {
    backgroundColor: 'rgba(229, 9, 20, 0.05)',
    borderColor: 'rgba(229, 9, 20, 0.3)',
  },
  formatText: {
    color: colors.onSurface,
  },
  formatTextActive: {
    color: colors.primaryContainer,
  },
  bottomCta: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    backgroundColor: 'rgba(28, 28, 28, 0.6)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  ctaContent: {
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  ctaButton: {
    backgroundColor: colors.primaryContainer,
    height: 56,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  ctaButtonText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
});
