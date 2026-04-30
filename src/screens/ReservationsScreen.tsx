import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, RefreshControl, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useAuth } from '../hooks/useAuth';
import { useReservations } from '../hooks/useReservations';
import { ReservationData } from '../services/types';

export const ReservationsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const { reservations, isLoading, fetchReservations } = useReservations();
  const [refreshing, setRefreshing] = useState(false);

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

  // Helper to format date mock (since we didn't store full schedule dates in the quick mockup)
  const formatMockDate = (createdAtSeconds?: number) => {
    if (!createdAtSeconds) return 'Próximamente';
    const d = new Date(createdAtSeconds * 1000);
    return d.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const renderActiveCard = (item: ReservationData) => (
    <View key={item.id} style={styles.activeCard}>
      <View style={styles.activePosterWrapper}>
        <Image 
          // Using a mock poster for now since we didn't populate movies collection in this flow yet
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiOwmGY366APgoqfZBqHVRkgsEt770852of4ifU5DLQ6sW2qq141mStouFsAuUf4IKj5pQGfVe3VX-7TaAcm7ZwnbMmFL5Xx5k_7vwYDy1WIS1UgRo4xK-dVgBS796FNx2W757YF4rtXewgfKRCuC4JlqzjPOgCPHKlt8K9d1HqdPHC43-NbZj8KkYE0Yoyc1tuokmFl39gqj80ytINYmnUv9-MV2WpHTtaTPk2EGORxAJHWyxrqymjNvxid6GX532omjxJcL3r-I' }} 
          style={styles.poster} 
        />
      </View>
      <View style={styles.activeContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.movieTitle} numberOfLines={1}>
            {item.movieId === 'hero' ? 'Dune: Part Two' : (item.movieTitle || 'Película CineNow')}
          </Text>
          <Text style={styles.activeBadge}>{item.status.toUpperCase()}</Text>
        </View>
        <View style={styles.metaContainer}>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}>{formatMockDate((item.createdAt as any)?.seconds)}</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}>19:30 • Sala 4</Text>
          </View>
          <View style={styles.metaRow}>
            <Ionicons name="tablet-landscape-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.metaText}>Butacas: {item.seats.join(', ')}</Text>
          </View>
        </View>
        <View style={styles.btnRow}>
          <TouchableOpacity 
            style={styles.viewTicketBtn}
            onPress={() => navigation.navigate('TicketDetail', { ticket: item })}
          >
            <Ionicons name="qr-code-outline" size={16} color={colors.text} />
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
        <Text style={styles.pastTitle} numberOfLines={1}>{item.movieId === 'hero' ? 'The Batman' : item.movieId}</Text>
        <Text style={styles.pastMeta}>{formatMockDate((item.createdAt as any)?.seconds)} • {item.seats?.length || 0} Seats</Text>
      </View>
      <View>
        <Text style={styles.usedBadge}>{item.status.toUpperCase()}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="film" size={24} color={colors.primary} />
          <Text style={styles.headerTitle}>CineNow</Text>
        </View>
        <View style={styles.profileBtn}>
          <Ionicons name="person" size={16} color={colors.textSecondary} />
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>My Bookings</Text>
          <Text style={styles.pageSubtitle}>Manage your cinema experiences</Text>
        </View>

        {isLoading && !refreshing && (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: spacing.xl }} />
        )}

        {!isLoading && reservations.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="ticket-outline" size={48} color={colors.textSecondary} />
            <Text style={styles.emptyText}>No tienes reservas aún.</Text>
          </View>
        )}

        {activeReservations.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming</Text>
              <View style={styles.countBadge}>
                <Text style={styles.countText}>{activeReservations.length} ACTIVE</Text>
              </View>
            </View>
            {activeReservations.map(renderActiveCard)}
          </View>
        )}

        {pastReservations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Past Visits</Text>
            <View style={styles.pastList}>
              {pastReservations.map(renderPastCard)}
            </View>
            <View style={styles.loadMoreBtn}>
              <Text style={styles.loadMoreText}>Load More History</Text>
            </View>
          </View>
        )}

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerLeft: {
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: spacing.m,
    paddingBottom: spacing.xxl,
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  pageTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xxxl,
    opacity: 0.5,
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: spacing.m,
  },
  section: {
    marginBottom: spacing.xxl,
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
    marginBottom: spacing.m, // Only used when no flex header
  },
  countBadge: {
    backgroundColor: 'rgba(229,9,20,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  activeCard: {
    backgroundColor: 'rgba(28, 28, 28, 0.6)',
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: spacing.m,
    flexDirection: 'row',
    gap: spacing.m,
    marginBottom: spacing.m,
  },
  activePosterWrapper: {
    width: 96,
    height: 144,
    borderRadius: borderRadius.m,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
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
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    marginRight: spacing.s,
  },
  activeBadge: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
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
    color: colors.textSecondary,
    fontSize: 14,
  },
  btnRow: {
    flexDirection: 'row',
    marginTop: spacing.s,
  },
  viewTicketBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.m,
    paddingVertical: 8,
    borderRadius: borderRadius.m,
  },
  viewTicketText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  pastList: {
    gap: spacing.s,
  },
  pastCard: {
    backgroundColor: 'rgba(28, 28, 28, 0.4)',
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    padding: spacing.s,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
    opacity: 0.7,
  },
  pastPosterWrapper: {
    width: 56,
    height: 80,
    borderRadius: borderRadius.s,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  pastContent: {
    flex: 1,
  },
  pastTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  pastMeta: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  usedBadge: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loadMoreBtn: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: borderRadius.m,
    paddingVertical: spacing.m,
    alignItems: 'center',
    marginTop: spacing.l,
  },
  loadMoreText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
