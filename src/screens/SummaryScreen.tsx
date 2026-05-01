import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { reservationService } from '../services/reservationService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMovieImage, normalizeReservationMovie } from '../data/recentMovies';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { APP_NAME, CINEMA_LOCATION, DEFAULT_CINEMA_ID, DEFAULT_ROOM, formatCurrency } from '../config/locale';

const SEAT_PRICE = 220;

export const SummaryScreen = ({ navigation, route }: any) => {
  const { movie: routeMovie, movieId, scheduleId, selectedFormat, showtime, seats = [], snacks = [] } = route.params || {};
  const [isConfirming, setIsConfirming] = useState(false);
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { avatarUri } = useProfile();
  const movie = normalizeReservationMovie(routeMovie);

  // Mock movie info for summary (since we only pass IDs in navigation for now, 
  // ideally we'd fetch this or pass full objects, but let's hardcode for UI replication)
  const MOCK_MOVIE = {
    title: movie.title,
    duration: movie.duration,
    genre: movie.genre,
    posterUrl: getMovieImage(movie),
    dateStr: 'Vie, 24 de mayo',
    timeStr: showtime?.time || '20:30',
    room: showtime?.room?.toUpperCase?.() || DEFAULT_ROOM.toUpperCase(),
    format: selectedFormat || showtime?.format || 'IMAX 3D'
  };

  const seatsTotal = seats.length * SEAT_PRICE;
  const snacksTotal = snacks.reduce((sum: number, snack: any) => sum + (snack.price * snack.quantity), 0);
  const grandTotal = seatsTotal + snacksTotal;
  
  // Hardcoded mockup snacks for display if none passed
  const displaySnacks = snacks.length > 0 ? snacks : [
    { id: '1', name: 'Combo individual premium', description: 'Palomitas grandes + bebida', price: 185, quantity: 1 }
  ];

  const handleConfirm = async () => {
    if (!user?.uid) {
      Alert.alert('Inicia sesión', 'Necesitas iniciar sesión para confirmar tu reserva.');
      return;
    }

    setIsConfirming(true);
    const reservationCode = `CR-${Math.floor(1000 + Math.random() * 9000)}-X09`;
    try {
      await reservationService.createReservation({
        userId: user.uid,
        movieId: movieId || movie.id || 'hero',
        movieTitle: MOCK_MOVIE.title,
        moviePosterUrl: MOCK_MOVIE.posterUrl,
        movieFormat: MOCK_MOVIE.format,
        showtimeLabel: MOCK_MOVIE.timeStr,
        room: MOCK_MOVIE.room,
        cinemaId: DEFAULT_CINEMA_ID,
        scheduleId: scheduleId || 'mockSchedule',
        seats,
        snacks: displaySnacks.map((s: any) => ({ snackId: s.id, name: s.name, quantity: s.quantity, price: s.price })),
        subtotal: grandTotal,
        total: grandTotal,
        status: 'active',
        reservationCode,
      });
      
      // Simulate network delay
      setTimeout(() => {
        setIsConfirming(false);
        navigation.navigate('Confirmation', {
          ticket: {
            movieId: movieId || movie.id || 'hero',
            movieTitle: MOCK_MOVIE.title,
            moviePosterUrl: MOCK_MOVIE.posterUrl,
            movieFormat: MOCK_MOVIE.format,
            showtimeLabel: MOCK_MOVIE.timeStr,
            room: MOCK_MOVIE.room,
            seats,
            reservationCode,
          },
        });
      }, 1000);
      
    } catch (error) {
      console.error('Error confirming reservation:', error);
      setIsConfirming(false);
      Alert.alert('Error de permisos', 'No se pudo confirmar la reserva. Verifica que sigues con sesión iniciada.');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
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

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80 }]}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtnRow}>
            <Ionicons name="arrow-back" size={20} color={colors.secondary} />
            <Text style={styles.backBtnText}>Regresar</Text>
          </TouchableOpacity>
          <Text style={[typography.h1, styles.screenTitle]}>Resumen de reserva</Text>
          <Text style={[typography.bodyMd, styles.screenSubtitle]}>Por favor, revisa los detalles de tu compra antes de confirmar.</Text>
        </View>

        {/* Movie Info */}
        <View style={styles.movieInfoRow}>
          <View style={styles.posterContainer}>
            <Image source={{ uri: MOCK_MOVIE.posterUrl }} style={styles.posterImg} />
          </View>
          <View style={styles.movieDetails}>
            <View style={styles.exclusiveBadge}>
              <Ionicons name="star" size={14} color={colors.primaryContainer} />
              <Text style={styles.exclusiveBadgeText}>ESTRENO EXCLUSIVO</Text>
            </View>
            <Text style={[typography.h2, styles.movieTitle]}>{MOCK_MOVIE.title}</Text>
            <View style={styles.movieMetaRow}>
              <Ionicons name="location-outline" size={14} color={colors.secondary} />
              <Text style={styles.movieMetaText}>{CINEMA_LOCATION}</Text>
            </View>
            <View style={styles.movieMetaRow}>
              <Ionicons name="time-outline" size={14} color={colors.secondary} />
              <Text style={styles.movieMetaText}>{MOCK_MOVIE.duration}</Text>
            </View>
            <View style={styles.movieMetaRow}>
              <Ionicons name="planet-outline" size={14} color={colors.secondary} />
              <Text style={styles.movieMetaText}>{MOCK_MOVIE.genre}</Text>
            </View>
          </View>
        </View>

        {/* Receipt Layout */}
        <View style={styles.receiptContainer}>
          <View style={styles.receiptTopLine} />
          
          <View style={styles.receiptContent}>
            {/* Session Info */}
            <View style={styles.sessionGrid}>
              <View>
                <Text style={styles.labelCaps}>FECHA Y HORA</Text>
                <Text style={[typography.h3, styles.valueText]}>{MOCK_MOVIE.dateStr}</Text>
                <Text style={styles.valueTextRed}>{MOCK_MOVIE.timeStr}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.labelCaps}>SALA</Text>
                <Text style={[typography.h3, styles.valueText]}>{MOCK_MOVIE.room}</Text>
                <Text style={styles.valueTextSecondary}>{MOCK_MOVIE.format}</Text>
              </View>
            </View>

            {/* Dashed Separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorDotLeft} />
              <View style={styles.dashedLine} />
              <View style={styles.separatorDotRight} />
            </View>

            {/* Items */}
            <View style={styles.itemsList}>
              {/* Seats Item */}
              <View style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <View style={styles.itemIconBox}>
                    <Ionicons name="easel" size={20} color={colors.secondary} />
                  </View>
                  <View>
                    <Text style={[typography.bodyLg, styles.itemName]}>Butacas seleccionadas</Text>
                    <Text style={[typography.bodyMd, styles.itemDesc]}>
                      Fila G: {seats.length > 0 ? seats.join(', ') : '12, 13, 14'}
                    </Text>
                  </View>
                </View>
                <Text style={[typography.h3, styles.itemPrice]}>{formatCurrency(seats.length > 0 ? seatsTotal : 660)}</Text>
              </View>

              {/* Snacks Items */}
              {displaySnacks.map((snack: any, index: number) => (
                <View key={index} style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <View style={styles.itemIconBox}>
                      <Ionicons name="fast-food" size={20} color={colors.secondary} />
                    </View>
                    <View>
                      <Text style={[typography.bodyLg, styles.itemName]}>{snack.name}</Text>
                      <Text style={[typography.bodyMd, styles.itemDesc]}>{snack.description}</Text>
                    </View>
                  </View>
                  <Text style={[typography.h3, styles.itemPrice]}>{formatCurrency(snack.price * snack.quantity)}</Text>
                </View>
              ))}
            </View>

            {/* Grand Total */}
            <View style={styles.grandTotalBox}>
              <View>
                <Text style={styles.labelCaps}>TOTAL A PAGAR</Text>
                <Text style={styles.taxText}>Incluye IVA (16%)</Text>
              </View>
              <Text 
                style={[typography.h2, styles.grandTotalText]} 
                numberOfLines={1} 
                adjustsFontSizeToFit
              >
                {formatCurrency(seats.length > 0 ? grandTotal : 845)}
              </Text>
            </View>

          </View>
          
          {/* Booking ID Footer */}
          <View style={styles.bookingIdFooter}>
            <Text style={styles.bookingIdText}>REF: CR-8842-X09</Text>
            <View style={styles.barcodeIcon}>
              <View style={styles.barcodeLine} />
              <View style={styles.barcodeLine} />
              <View style={styles.barcodeLine} />
            </View>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity 
          style={styles.confirmBtn}
          onPress={handleConfirm}
          disabled={isConfirming}
          activeOpacity={0.9}
        >
          {isConfirming ? (
            <ActivityIndicator color={colors.onPrimaryContainer} />
          ) : (
            <>
              <Text style={styles.confirmBtnText}>Confirmar reserva</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.onPrimaryContainer} />
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Al confirmar, aceptas nuestros términos de servicio y políticas de cancelación.
        </Text>

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
    borderColor: 'rgba(255,255,255,0.1)',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingTop: 100, // space for header
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xxxl,
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  backBtnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  backBtnText: {
    color: colors.secondary,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
  },
  screenTitle: {
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  screenSubtitle: {
    color: colors.secondary, // text-zinc-500
  },
  movieInfoRow: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  posterContainer: {
    flex: 5,
    aspectRatio: 2/3,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  posterImg: {
    width: '100%',
    height: '100%',
  },
  movieDetails: {
    flex: 7,
    justifyContent: 'center',
    paddingLeft: spacing.xs,
  },
  exclusiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(229, 9, 20, 0.1)', // red-600/10
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  exclusiveBadgeText: {
    color: colors.primaryContainer,
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  movieTitle: {
    color: '#fff',
    marginBottom: spacing.sm,
    lineHeight: 28,
  },
  movieMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: 4,
  },
  movieMetaText: {
    color: colors.secondary, // zinc-400
    fontFamily: 'Inter',
    fontSize: 14,
  },
  receiptContainer: {
    backgroundColor: 'rgba(28, 28, 28, 0.6)', // glass-panel
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    marginBottom: spacing.xl,
    overflow: 'hidden',
  },
  receiptTopLine: {
    height: 4,
    backgroundColor: colors.primaryContainer,
    width: '100%',
  },
  receiptContent: {
    padding: spacing.lg,
  },
  sessionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  labelCaps: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 10,
    letterSpacing: 1,
    color: colors.secondary, // text-zinc-500
    marginBottom: 4,
  },
  valueText: {
    color: '#fff',
  },
  valueTextRed: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 14,
  },
  valueTextSecondary: {
    color: colors.secondary, // text-zinc-400
    fontFamily: 'Inter',
    fontSize: 14,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    position: 'relative',
    marginHorizontal: -spacing.lg, // extend to edges
  },
  separatorDotLeft: {
    position: 'absolute',
    left: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0D0D0D', // match body bg
    zIndex: 10,
  },
  separatorDotRight: {
    position: 'absolute',
    right: -8,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#0D0D0D',
    zIndex: 10,
  },
  dashedLine: {
    flex: 1,
    height: 1,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed', // Note: dashed border might not render perfectly cross-platform in RN, but it's okay for now
  },
  itemsList: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  itemIconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    color: '#fff',
  },
  itemDesc: {
    color: colors.secondary,
  },
  itemPrice: {
    color: '#fff',
  },
  grandTotalBox: {
    backgroundColor: 'rgba(58, 37, 34, 0.5)', // surface-container-high/50
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  taxText: {
    fontSize: 10,
    color: colors.secondary,
  },
  grandTotalText: {
    color: colors.primaryContainer,
    fontSize: 28,
    fontWeight: '800',
  },
  bookingIdFooter: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingIdText: {
    fontSize: 10,
    fontFamily: 'monospace', // Equivalent to font-mono
    color: '#52525b', // text-zinc-600
  },
  barcodeIcon: {
    flexDirection: 'row',
    gap: 4,
  },
  barcodeLine: {
    width: 4,
    height: 12,
    backgroundColor: '#27272a', // zinc-800
    borderRadius: 2,
  },
  confirmBtn: {
    backgroundColor: colors.primaryContainer,
    paddingVertical: spacing.md,
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
  confirmBtnText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
  termsText: {
    textAlign: 'center',
    color: colors.secondary, // text-zinc-500
    fontSize: 12,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
});
