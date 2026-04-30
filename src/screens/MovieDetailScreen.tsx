import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useMovies } from '../hooks/useMovies';
import { Movie } from '../components/MovieCard';

export const MovieDetailScreen = ({ navigation, route }: any) => {
  const { movieId } = route.params || {};
  const { fetchMovieById, isLoading } = useMovies();
  const [movie, setMovie] = useState<Movie | any>(null);

  useEffect(() => {
    const loadMovie = async () => {
      if (movieId) {
        const data = await fetchMovieById(movieId);
        if (data) {
          setMovie(data);
        } else {
          // Fallback if not found in Firestore
          setMovie({
            id: 'fallback',
            title: 'Película no encontrada',
            genre: 'Desconocido',
            duration: '0h 0min',
            rating: '0.0',
            posterUrl: 'https://via.placeholder.com/300x450',
            synopsis: 'No pudimos encontrar los detalles de esta película en la base de datos.'
          });
        }
      }
    };
    loadMovie();
  }, [movieId]);

  if (isLoading || !movie) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Backdrop */}
        <View style={styles.heroContainer}>
          <ImageBackground source={{ uri: movie.posterUrl }} style={styles.heroImage} resizeMode="cover">
            <View style={styles.gradientOverlay} />
            
            {/* Back Button */}
            <SafeAreaView style={styles.safeAreaBtn}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
            </SafeAreaView>

            <View style={styles.heroContent}>
              <View style={styles.badgesContainer}>
                <View style={styles.badgePrimary}><Text style={styles.badgeText}>IMAX</Text></View>
                <View style={styles.badgeSecondary}><Text style={styles.badgeText}>4K ULTRA HD</Text></View>
              </View>
              
              <Text style={styles.title}>{movie.title}</Text>
              
              <View style={styles.metaContainer}>
                <View style={styles.metaItem}>
                  <Ionicons name="time-outline" size={16} color={colors.primary} />
                  <Text style={styles.metaText}>{movie.duration}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="star" size={16} color={colors.primary} />
                  <Text style={styles.metaText}>{movie.rating}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="film-outline" size={16} color={colors.primary} />
                  <Text style={styles.metaText}>{movie.genre}</Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mainContent}>
          {/* Synopsis */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sinopsis</Text>
            <Text style={styles.synopsisText}>{movie.description}</Text>
          </View>

          {/* Cast */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Reparto Principal</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>VER TODO</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.castGrid}>
              {[
                { name: 'Julian Drake', role: 'Protagonista', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDHn9udIE_nbyOxVXx487ZH_D6p1kXTy-W5t0mmg7_zmaq86XwUBhtcPztEUsl0Vw4V1081xpcfLOVHo7kxD-qgSmCWqSn0z7lemY_Ps6hRkaDzqoDnJZH_D3ihdjUkVRZkrB5p1q_BW50OnbFoYrUB3gLlMORVIsMZGB_ZoRNq1d0Fx3ntwk3MCB-cOmGfSGvT1LF47ZrmeQ5gq-ljoql-AUKJqNwREEuXjYOMWRC0TAmrf6dj4rECa4z-3bBvqiC7uzqLPp7WKA' },
                { name: 'Elena Mars', role: 'Antagonista', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA3TLaFfYZIQAF_jpiUWIp7kFe-vBCjTee1vR36QsyHf3cavoYNq23CTulybbaRGKBbr5XvWXvVsi1tGWRbKSsNFKGUNPBdzL1dqMVE3q0eyIlrxorRYTbTQEkx3lpCxZO6E6fJBNl6XtEaKaemx-7zKU8BDKXe2DhSn6X_EE0JMY_nvVXanXB_5aVrJZ8K7NwxGtj_S0hptuoJjoQPm9KKMdzvF8NFrbW9diH-FF2xBxKrAZFz3FeRY56r5mY2oOLrpsgvIn2hNk' },
                { name: 'Robert Smith', role: 'Secundario', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACPdbot-_sfPEWvN_3V25aopM9xz8sFxilyyxvwHlXH_Sn6OUuZpHbRKHy1s3oOpW-Dc3hEuc7kAPdyORB35Rr2PHMF_rCmjPAJORNgm9dFhqPr93FFX58c9HbkB3S3FcQWNVqhc09_hc9vcFiXeF_yR8Q-fpTzo7FCnIKm7mzsPwwR83MMnGaA740wWir9fT-Z1ALivaxwkfM_AC2Gg--Hb40zqGjfn8aQuTwFliFHSQMmigovAAqUUP3W5ZhFLnBRwE-CCS_N20' },
                { name: 'Aria Luna', role: 'Secundario', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8JPWu4eQqKFRKN2_eYR8bBO8yE3evCxph-dyJ2FKfsmC3wI_47iZ70KgDADgibmSWClSWTa3k9ldKcddQQnA3ciMGpLaY_0KcIi5P3BUxvrGEfFMT-CEN54L0N3mUhKI1vHDZwxsRD5pu6j4oJhLMCyKBk-njgJDAY8EeuVdywDqnHaiU00ikkayyOSPU1-8Cq_BIdcLYbELeChSxYc8XD5L4VGCkZByDKuVXMH1pNEMxlxE_zvoHr8KbWGE7kNlTx9IwJWAObso' }
              ].map((cast, idx) => (
                <View key={idx} style={styles.castCard}>
                  <Image source={{ uri: cast.img }} style={styles.castImg} />
                  <Text style={styles.castName} numberOfLines={1}>{cast.name}</Text>
                  <Text style={styles.castRole}>{cast.role}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Formats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formatos disponibles</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.formatsContainer}>
              <View style={styles.formatCard}>
                <Ionicons name="water-outline" size={24} color={colors.text} />
                <Text style={styles.formatText}>4DX</Text>
              </View>
              <View style={[styles.formatCard, styles.formatCardActive]}>
                <Ionicons name="videocam-outline" size={24} color={colors.primary} />
                <Text style={styles.formatTextActive}>IMAX 3D</Text>
              </View>
              <View style={styles.formatCard}>
                <Ionicons name="volume-high-outline" size={24} color={colors.text} />
                <Text style={styles.formatText}>Dolby Atmos</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>PRECIO DESDE</Text>
          <Text style={styles.priceValue}>$12.50</Text>
        </View>
        <TouchableOpacity 
          style={styles.ctaButton} 
          onPress={() => navigation.navigate('Schedule', { movieId: movie.id })}
        >
          <Ionicons name="ticket-outline" size={20} color={colors.text} />
          <Text style={styles.ctaText}>Ver horarios</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100, // Space for bottom CTA
  },
  heroContainer: {
    height: 500,
    width: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', // Simplified gradient
  },
  safeAreaBtn: {
    marginTop: spacing.l,
    marginLeft: spacing.m,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(28,28,28,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heroContent: {
    padding: spacing.l,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: spacing.s,
    marginBottom: spacing.m,
  },
  badgePrimary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeSecondary: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.s,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  mainContent: {
    padding: spacing.l,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.m,
  },
  synopsisText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.m,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  castGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  castCard: {
    width: '48%',
    backgroundColor: 'rgba(28,28,28,0.6)',
    borderRadius: borderRadius.m,
    padding: spacing.m,
    alignItems: 'center',
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  castImg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: spacing.s,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  castName: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
    textAlign: 'center',
  },
  castRole: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
  formatsContainer: {
    gap: spacing.m,
  },
  formatCard: {
    minWidth: 140,
    backgroundColor: 'rgba(28,28,28,0.6)',
    borderRadius: borderRadius.m,
    padding: spacing.l,
    alignItems: 'center',
    gap: spacing.s,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  formatCardActive: {
    backgroundColor: 'rgba(229,9,20,0.05)',
    borderColor: 'rgba(229,9,20,0.3)',
  },
  formatText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  formatTextActive: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(28,28,28,0.95)',
    padding: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: borderRadius.l,
    borderTopRightRadius: borderRadius.l,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  priceValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  ctaButton: {
    flex: 1.5,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    height: 56,
    borderRadius: borderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.s,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
