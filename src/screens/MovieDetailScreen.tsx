import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';

const MOCK_MOVIE_DETAIL = {
  title: 'El Legado de las Sombras',
  duration: '2h 45min',
  rating: '4.9 (2.4k)',
  genre: 'Ciencia Ficción',
  backdropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDAM7IP4qpMfMDXjQkDe_x4RArQFst_xvZhXTDKFjdrGL7ONUxhY-_cNtGa_0mFwONrQc_67TFgnZdwvGXOHRJfebss_kNWZ2nU-U2KQUUHSnVzajVv6Q71kNWIPsaCHVbLvH_QXVPmTyHBihOOyJK9GxDJqFqSEXuraqUzA7PWU2HedT46ei-C33rjoNouJO-G6Vl3u2OeaXqko2u-7F4WStrrd7Grn-uTy3ZEEFGfC9pEkdaThinics9ISB-8ldg5ZSbtnkNyMpw',
  synopsis: 'En un futuro distópico donde la luz es el recurso más valioso, un ex-ingeniero de sistemas descubre un secreto enterrado en las profundidades de la infraestructura de la ciudad que podría cambiar el destino de la humanidad para siempre. Acompaña a nuestros protagonistas en una carrera contra el tiempo mientras navegan por traiciones corporativas y dilemas morales en la película más aclamada de la temporada.',
  cast: [
    { id: '1', name: 'Julian Drake', role: 'Protagonista', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDHn9udIE_nbyOxVXx487ZH_D6p1kXTy-W5t0mmg7_zmaq86XwUBhtcPztEUsl0Vw4V1081xpcfLOVHo7kxD-qgSmCWqSn0z7lemY_Ps6hRkaDzqoDnJZH_D3ihdjUkVRZkrB5p1q_BW50OnbFoYrUB3gLlMORVIsMZGB_ZoRNq1d0Fx3ntwk3MCB-cOmGfSGvT1LF47ZrmeQ5gq-ljoql-AUKJqNwREEuXjYOMWRC0TAmrf6dj4rECa4z-3bBvqiC7uzqLPp7WKA' },
    { id: '2', name: 'Elena Mars', role: 'Antagonista', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDA3TLaFfYZIQAF_jpiUWIp7kFe-vBCjTee1vR36QsyHf3cavoYNq23CTulybbaRGKBbr5XvWXvVsi1tGWRbKSsNFKGUNPBdzL1dqMVE3q0eyIlrxorRYTbTQEkx3lpCxZO6E6fJBNl6XtEaKaemx-7zKU8BDKXe2DhSn6X_EE0JMY_nvVXanXB_5aVrJZ8K7NwxGtj_S0hptuoJjoQPm9KKMdzvF8NFrbW9diH-FF2xBxKrAZFz3FeRY56r5mY2oOLrpsgvIn2hNk' },
    { id: '3', name: 'Robert Smith', role: 'Secundario', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuACPdbot-_sfPEWvN_3V25aopM9xz8sFxilyyxvwHlXH_Sn6OUuZpHbRKHy1s3oOpW-Dc3hEuc7kAPdyORB35Rr2PHMF_rCmjPAJORNgm9dFhqPr93FFX58c9HbkB3S3FcQWNVqhc09_hc9vcFiXeF_yR8Q-fpTzo7FCnIKm7mzsPwwR83MMnGaA740wWir9fT-Z1ALivaxwkfM_AC2Gg--Hb40zqGjfn8aQuTwFliFHSQMmigovAAqUUP3W5ZhFLnBRwE-CCS_N20' },
    { id: '4', name: 'Aria Luna', role: 'Secundario', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8JPWu4eQqKFRKN2_eYR8bBO8yE3evCxph-dyJ2FKfsmC3wI_47iZ70KgDADgibmSWClSWTa3k9ldKcddQQnA3ciMGpLaY_0KcIi5P3BUxvrGEfFMT-CEN54L0N3mUhKI1vHDZwxsRD5pu6j4oJhLMCyKBk-njgJDAY8EeuVdywDqnHaiU00ikkayyOSPU1-8Cq_BIdcLYbELeChSxYc8XD5L4VGCkZByDKuVXMH1pNEMxlxE_zvoHr8KbWGE7kNlTx9IwJWAObso' }
  ],
  formats: [
    { id: 'f1', name: '4DX', icon: 'water-outline', active: false },
    { id: 'f2', name: 'IMAX 3D', icon: 'videocam-outline', active: true },
    { id: 'f3', name: 'Dolby Atmos', icon: 'volume-high-outline', active: false },
  ]
};

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 530;

export const MovieDetailScreen = ({ navigation }: any) => {

  const handleSchedulePress = () => {
    navigation.navigate('Schedule');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Hero */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: MOCK_MOVIE_DETAIL.backdropUrl }} style={styles.heroImage} />
          <LinearGradient
            colors={['transparent', 'rgba(13, 13, 13, 0.4)', '#0D0D0D']}
            locations={[0, 0.6, 1]}
            style={styles.gradient}
          />
          
          <TouchableOpacity 
            style={styles.backButton} 
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

            <Text style={[typography.h1, styles.title]}>{MOCK_MOVIE_DETAIL.title}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={18} color={colors.primaryContainer} />
                <Text style={styles.metaText}>{MOCK_MOVIE_DETAIL.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="star" size={18} color={colors.primaryContainer} />
                <Text style={styles.metaText}>{MOCK_MOVIE_DETAIL.rating}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="planet-outline" size={18} color={colors.primaryContainer} />
                <Text style={styles.metaText}>{MOCK_MOVIE_DETAIL.genre}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Synopsis */}
        <View style={styles.section}>
          <Text style={[typography.h2, styles.sectionTitle]}>Sinopsis</Text>
          <Text style={[typography.bodyLg, styles.synopsisText]}>
            {MOCK_MOVIE_DETAIL.synopsis}
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
            {MOCK_MOVIE_DETAIL.cast.map((actor) => (
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
            {MOCK_MOVIE_DETAIL.formats.map((format) => (
              <BlurView 
                key={format.id} 
                intensity={20} 
                tint="dark" 
                style={[
                  styles.formatCard, 
                  format.active && styles.formatCardActive
                ]}
              >
                <Ionicons 
                  name={format.icon as any} 
                  size={24} 
                  color={format.active ? colors.primaryContainer : colors.onSurface} 
                />
                <Text style={[
                  typography.button, 
                  styles.formatText,
                  format.active && styles.formatTextActive
                ]}>
                  {format.name}
                </Text>
              </BlurView>
            ))}
          </ScrollView>
        </View>

      </ScrollView>

      {/* Sticky Bottom CTA */}
      <BlurView intensity={40} tint="dark" style={styles.bottomCta}>
        <SafeAreaView>
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
        </SafeAreaView>
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
    top: 50, // rough safe area
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
    paddingBottom: Platform.OS === 'ios' ? 0 : spacing.md, // SafeAreaView handles iOS bottom padding
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
