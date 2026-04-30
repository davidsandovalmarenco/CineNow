import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, RefreshControl, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAuth } from '../hooks/useAuth';
import { useReservations } from '../hooks/useReservations';
import { ReservationData } from '../services/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const ReservationsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { reservations, isLoading, fetchReservations } = useReservations();
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const loadData = () => {
    if (user?.uid) {
      fetchReservations(user.uid);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [user])
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
    return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const renderActiveCard = (item: ReservationData) => (
    <View key={item.id} style={styles.activeCard}>
      <View style={styles.activePosterWrapper}>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiOwmGY366APgoqfZBqHVRkgsEt770852of4ifU5DLQ6sW2qq141mStouFsAuUf4IKj5pQGfVe3VX-7TaAcm7ZwnbMmFL5Xx5k_7vwYDy1WIS1UgRo4xK-dVgBS796FNx2W757YF4rtXewgfKRCuC4JlqzjPOgCPHKlt8K9d1HqdPHC43-NbZj8KkYE0Yoyc1tuokmFl39gqj80ytINYmnUv9-MV2WpHTtaTPk2EGORxAJHWyxrqymjNvxid6GX532omjxJcL3r-I' }} 
          style={styles.poster} 
        />
      </View>
      <View style={styles.activeContent}>
        <View>
          <View style={styles.cardHeader}>
            <Text style={[typography.h3, styles.movieTitle]} numberOfLines={1}>
              {item.movieId === 'hero' ? 'Dune: Part Two' : (item.movieTitle || 'Película CineNow')}
            </Text>
            <Text style={[typography.labelCaps, styles.activeBadge]}>{item.status.toUpperCase()}</Text>
          </View>
          <View style={styles.metaContainer}>
            <View style={styles.metaRow}>
              <Ionicons name="calendar-outline" size={16} color={colors.secondary} />
              <Text style={styles.metaText}>{formatMockDate((item.createdAt as any)?.seconds)}</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="time-outline" size={16} color={colors.secondary} />
              <Text style={styles.metaText}>19:30 • Sala 4</Text>
            </View>
            <View style={styles.metaRow}>
              <Ionicons name="tablet-landscape-outline" size={16} color={colors.secondary} />
              <Text style={styles.metaText}>Butacas: {item.seats.join(', ')}</Text>
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
            <Text style={styles.viewTicketText}>View Ticket</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderPastCard = (item: ReservationData) => (
    <View key={item.id} style={styles.pastCard}>
      <View style={styles.pastPosterWrapper}>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbnkm_-U3Dggc9Ir2VlNhPRdVnhE9dZegTkHxrgeNanV81UkU3bPrrQYJUHLpmhHhu8UV1MXs61fW9wPEQODsKDVEDLhS7qs4xXza6gvPQ5AUMK-nA1UhSUCiidQPavT4WVB0O4GirlZfZ4NRuKzTmQ8f2ERhAulpdfROaIhMbOwwxY2J_uezUP-1RZWIqtFZOKLKnONdCS9XLj0r35Zlrm8rj8Wc5C6-hT9Xtv2QV7Hmc47yd8Pl0ydlpAyOxPgkKyrVhZQXrtMk' }} 
          style={styles.poster} 
        />
      </View>
      <View style={styles.pastContent}>
        <Text style={[typography.bodyLg, styles.pastTitle]} numberOfLines={1}>
          {item.movieId === 'hero' ? 'The Batman' : item.movieId}
        </Text>
        <Text style={[typography.bodyMd, styles.pastMeta]}>
          {formatMockDate((item.createdAt as any)?.seconds)} • {item.seats?.length || 0} Seats
        </Text>
      </View>
      <View>
        <Text style={[typography.labelCaps, styles.usedBadge]}>{item.status.toUpperCase()}</Text>
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
              <Text style={[typography.h2, styles.logoText, { fontSize: 20 }]}>CineNow</Text>
            </View>
            <View style={styles.profileBtn}>
              <Image 
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXDempXFfJ0PB5o4oVOqjnCO2fKREH3lMHCiIVmyEHNLYpOWpwjTSbwN1et3bQg900uyNiVII6F3O4tCDQIvxIHcTLWTQfvtdPrE7j_-U-OxUtMosDjGr9m9IpHU--0XVER6OEuX4836l1U6KtlYcGTPejfrA00x3CMDZpOk088z6MguESD1CU6r0CdD2RUAfHBOKEtuzILCE_ubmtetrsLXxCY6tUZbWmGoGLnLfSTB9XGOTuTVwx43Gx-TSddSNkwNOx3HWgeG8' }} 
                style={styles.profileImg}
              />
            </View>
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
          <Text style={[typography.h1, styles.pageTitle]}>My Bookings</Text>
          <Text style={[typography.bodyMd, styles.pageSubtitle]}>Manage your cinema experiences</Text>
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
              <Text style={[typography.h2, styles.sectionTitle]}>Upcoming</Text>
              <View style={styles.countBadge}>
                <Text style={[typography.labelCaps, styles.countText]}>{activeReservations.length} ACTIVE</Text>
              </View>
            </View>
            {activeReservations.map(renderActiveCard)}
          </View>
        )}

        {pastReservations.length > 0 && (
          <View style={styles.section}>
            <Text style={[typography.h2, styles.sectionTitle, { marginBottom: spacing.md }]}>Past Visits</Text>
            <View style={styles.pastList}>
              {pastReservations.map(renderPastCard)}
            </View>
            <TouchableOpacity style={styles.loadMoreBtn} activeOpacity={0.8}>
              <Text style={styles.loadMoreText}>Load More History</Text>
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
    width: 32,
    height: 32,
    borderRadius: 16,
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
