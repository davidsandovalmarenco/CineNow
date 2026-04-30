import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

export const TicketDetailScreen = ({ navigation, route }: any) => {
  const { ticket } = route.params || {};

  // Mock date format
  const formatMockDate = (createdAtSeconds?: number) => {
    if (!createdAtSeconds) return '14 Oct, 19:30';
    const d = new Date(createdAtSeconds * 1000);
    return d.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' }) + ', 19:30 PM';
  };

  const movieTitle = ticket?.movieId === 'hero' ? 'Dune: Part Two' : (ticket?.movieTitle || 'Película CineNow');
  const seats = ticket?.seats?.join(', ') || 'N/A';
  const reservationCode = ticket?.reservationCode || `CR-${Math.floor(1000 + Math.random() * 9000)}-X09`;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tu Boleto</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.ticketCard}>
          {/* Top Section */}
          <View style={styles.ticketTop}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiOwmGY366APgoqfZBqHVRkgsEt770852of4ifU5DLQ6sW2qq141mStouFsAuUf4IKj5pQGfVe3VX-7TaAcm7ZwnbMmFL5Xx5k_7vwYDy1WIS1UgRo4xK-dVgBS796FNx2W757YF4rtXewgfKRCuC4JlqzjPOgCPHKlt8K9d1HqdPHC43-NbZj8KkYE0Yoyc1tuokmFl39gqj80ytINYmnUv9-MV2WpHTtaTPk2EGORxAJHWyxrqymjNvxid6GX532omjxJcL3r-I' }} 
              style={styles.poster} 
              resizeMode="cover"
            />
            <View style={styles.movieInfoOverlay}>
              <View style={styles.badgeWrapper}>
                <Text style={styles.badgeText}>IMAX LASER</Text>
              </View>
              <Text style={styles.movieTitle} numberOfLines={2}>{movieTitle}</Text>
            </View>
          </View>

          {/* Separation Line */}
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLeftHole} />
            <View style={styles.dashedLine} />
            <View style={styles.separatorRightHole} />
          </View>

          {/* Details Section */}
          <View style={styles.ticketBottom}>
            <View style={styles.detailGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>FECHA Y HORA</Text>
                <Text style={styles.detailValue}>{formatMockDate((ticket?.createdAt as any)?.seconds)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>SALA</Text>
                <Text style={styles.detailValue}>04</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>ASIENTOS</Text>
                <Text style={styles.detailValueHighlight}>{seats}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>CÓDIGO DE RESERVA</Text>
                <Text style={styles.detailValue}>{reservationCode}</Text>
              </View>
            </View>

            {/* QR Code Placeholder */}
            <View style={styles.qrContainer}>
              <Image 
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg' }} 
                style={styles.qrCode} 
              />
              <Text style={styles.qrHint}>Escanea este código en la entrada de la sala.</Text>
            </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(28,28,28,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: spacing.m,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  ticketCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#1C1C1C',
    borderRadius: borderRadius.xl,
    marginTop: spacing.xl,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  ticketTop: {
    height: 200,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  movieInfoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: spacing.l,
  },
  badgeWrapper: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: spacing.s,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  movieTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    backgroundColor: '#1C1C1C',
  },
  separatorLeftHole: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    marginLeft: -16,
    borderRightWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    marginHorizontal: 8,
  },
  separatorRightHole: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    marginRight: -16,
    borderLeftWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  ticketBottom: {
    padding: spacing.l,
    backgroundColor: '#1C1C1C',
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.l,
    marginBottom: spacing.xl,
  },
  detailItem: {
    width: '45%',
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  detailValueHighlight: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: spacing.m,
    padding: spacing.m,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: spacing.m,
    borderRadius: borderRadius.s,
    backgroundColor: colors.text, // White bg for QR readability
  },
  qrHint: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
  },
});
