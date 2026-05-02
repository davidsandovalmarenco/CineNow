import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, RefreshControl, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useReservations } from '../hooks/useReservations';
import { ReservationData } from '../services/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { findRecentMovieByReservation, RECENT_MOVIES } from '../data/recentMovies';
import { APP_NAME, DEFAULT_ROOM, formatReservationStatus } from '../config/locale';
import { RemoteImage } from '../components/RemoteImage';

export const ReservationsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { avatarUri } = useProfile();
  const { reservations, isLoading, fetchReservations } = useReservations();
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const loadData = useCallback(() => {
    if (user?.uid) {
      fetchReservations(user.uid);
    }
  }, [fetchReservations, user?.uid]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const activeReservations = reservations.filter(r => r.status === 'active');
  const pastReservations = reservations.filter(r => r.status === 'used' || r.status === 'cancelled');

  const formatMockDate = (createdAtSeconds?: number) => {
    if (!createdAtSeconds) return 'Próximamente';
    const d = new Date(createdAtSeconds * 1000);
    return d.toLocaleDateString('es-NI', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const getReservationPoster = (item: ReservationData, fallback = RECENT_MOVIES.superman.posterUrl) =>
    findRecentMovieByReservation(item.movieId, item.movieTitle)?.posterUrl || item.moviePosterUrl || fallback;

  const getReservationPosterAsset = (item: ReservationData) =>
    findRecentMovieByReservation(item.movieId, item.movieTitle)?.posterAsset;

  const getReservationTitle = (item: ReservationData, fallback = 'Película CineNow') =>
    item.movieTitle || findRecentMovieByReservation(item.movieId)?.title || fallback;

  const renderActiveCard = (item: ReservationData) => (
    <View key={item.id} style={styles.activeCard}>
      <View style={styles.activePosterWrapper}>
        <RemoteImage 
          uri={getReservationPoster(item)} 
          assetSource={getReservationPosterAsset(item)}
          fallbackLabel={getReservationTitle(item)}
          style={styles.poster} 
        />
      </View>
      <View style={styles.activeContent}>
        <View>
          <View style={styles.cardHeader}>
            <Text style={[typography.h3, styles.movieTitle]} numberOfLines={1}>
              {getReservationTitle(item)}
            </Text>
            <Text style={[typography.labelCaps, styles.activeBadge]}>{formatReservationStatus(item.status)}</Text>
          </View>
          <View style={styles.metaContainer}>
            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={16} color={colors.secondary} />
              <Text style={styles.metaText}>{formatMockDate((item.createdAt as any)?.seconds)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="time-outline" size={16} color={colors.secondary} />
              <Text style={styles.metaText}>{item.showtimeLabel || '19:30'} - {item.room || DEFAULT_ROOM}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="tablet-landscape-outline" size={16} color={colors.secondary} />
              <Text style={styles.metaText}>Butacas: {item.seats.join(', ')}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="videocam-outline" size={16} color={colors.secondary} />
              <Text style={styles.metaText}>{item.movieFormat || 'IMAX 3D'}</Text>
            </View>
          </View>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity 
            style={styles.viewTicketBtn}
            onPress={() => navigation.navigate('Confirmation', { ticket: item })}
            activeOpacity={0.8}
          >
            <Ionicons name="qr-code-outline" size={18} color={colors.onPrimaryContainer} />
            <Text style={styles.viewTicketText}>Ver boleto</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderPastCard = (item: ReservationData) => (
    <View key={item.id} style={styles.pastCard}>
      <View style={styles.pastPosterWrapper}>
        <RemoteImage 
          uri={getReservationPoster(item, RECENT_MOVIES.jurassic.posterUrl)} 
          assetSource={getReservationPosterAsset(item)}
          fallbackUri={RECENT_MOVIES.jurassic.posterUrl}
          fallbackLabel={getReservationTitle(item, item.movieId)}
          style={styles.poster} 
        />
      </View>
      <View style={styles.pastContent}>
        <Text style={[typography.bodyLg, styles.pastTitle]} numberOfLines={1}>
          {getReservationTitle(item, item.movieId)}
        </Text>
        <Text style={[typography.bodyMd, styles.pastMeta]}>
          {formatMockDate((item.createdAt as any)?.seconds)} - {item.seats?.length || 0} butacas
        </Text>
      </View>
      <View>
        <Text style={[typography.labelCaps, styles.usedBadge]}>{formatReservationStatus(item.status)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <BlurView intensity={80} tint="dark" style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <Ionicons name="film" size={24} color={colors.primaryContainer} />
              <Text style={[typography.h2, styles.logoText, { fontSize: 20 }]}>{APP_NAME}</Text>
            </View>
            <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ProfileTab')} activeOpacity={0.8}>
              <Image source={{ uri: avatarUri }} style={styles.profileImg} />
            </TouchableOpacity>
          </View>
      </BlurView>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 90 }]}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primaryContainer} />
        }
      >
        <View style={styles.titleSection}>
          <Text style={[typography.h1, styles.pageTitle]}>Mis reservas</Text>
          <Text style={[typography.bodyMd, styles.pageSubtitle]}>Administra tus boletos de Centro Plaza Chinandega</Text>
        </View>

        {isLoading && !refreshing && (
          <ActivityIndicator size="large" color={colors.primaryContainer} style={{ marginTop: spacing.xl }} />
        )}

        {!isLoading && reservations.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="ticket-outline" size={48} color={colors.secondary} />
            <Text style={styles.emptyText}>No tienes reservas aún.</Text>
          </View>
        )}

        {activeReservations.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={[typography.h2, styles.sectionTitle]}>Próximas funciones</Text>
              <View style={styles.countBadge}>
                <Text style={[typography.labelCaps, styles.countText]}>{activeReservations.length} ACTIVAS</Text>
              </View>
            </View>
            {activeReservations.map(renderActiveCard)}
          </View>
        )}

        {pastReservations.length > 0 && (
          <View style={styles.section}>
            <Text style={[typography.h2, styles.sectionTitle, { marginBottom: spacing.md }]}>Historial</Text>
            <View style={styles.pastList}>
              {pastReservations.map(renderPastCard)}
            </View>
            <TouchableOpacity style={styles.loadMoreBtn} activeOpacity={0.8}>
              <Text style={styles.loadMoreText}>Ver más historial</Text>
            </TouchableOpacity>
          </View>
        )}

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
    height: 64,
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
  scrollContent: {
    paddingHorizontal: spacing.containerMargin,
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  pageTitle: {
    color: '#fff',
  },
  pageSubtitle: {
    color: colors.secondary, // text-zinc-500
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxxl,
    opacity: 0.5,
  },
  emptyText: {
    color: colors.secondary,
    fontFamily: 'Inter',
    fontSize: 16,
    marginTop: spacing.md,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: '#fff',
  },
  countBadge: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  countText: {
    color: colors.onPrimaryContainer,
  },
  activeCard: {
    backgroundColor: 'rgba(28, 28, 28, 0.6)', // glass-panel
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: spacing.md,
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  activePosterWrapper: {
    width: 96,
    height: 144, // h-36
    borderRadius: borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: colors.surfaceContainer,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  activeContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  movieTitle: {
    color: '#fff',
    flex: 1,
    marginRight: spacing.sm,
  },
  activeBadge: {
    color: colors.primaryContainer, // text-red-600
  },
  metaContainer: {
    marginTop: spacing.xs,
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    color: colors.secondary, // zinc-400
    fontFamily: 'Inter',
    fontSize: 14,
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  viewTicketBtn: {
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
  },
  viewTicketText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
  },
  pastList: {
    gap: spacing.sm,
  },
  pastCard: {
    backgroundColor: 'rgba(28, 28, 28, 0.4)',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    opacity: 0.7,
  },
  pastPosterWrapper: {
    width: 56, // w-14
    height: 80, // h-20
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  pastContent: {
    flex: 1,
  },
  pastTitle: {
    color: '#fff',
    fontWeight: '600',
    marginBottom: 2,
  },
  pastMeta: {
    color: colors.secondary, // text-zinc-500
  },
  usedBadge: {
    color: colors.secondary,
  },
  loadMoreBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  loadMoreText: {
    color: colors.secondary,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
  },
});
