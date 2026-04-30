import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, ImageBackground, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { reservationService } from '../services/reservationService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMovieImage, normalizeReservationMovie, RECENT_MOVIES } from '../data/recentMovies';
import { APP_NAME, DEFAULT_ROOM, formatCurrency } from '../config/locale';

const SEAT_PRICE = 220;

// Dummy seat layout: 5 rows, 10 columns (0-9). Columns 2 and 7 are aisles.
const ROWS = ['A', 'B', 'C', 'D', 'E'];
const COLS = 10;
const AISLES = [2, 7];

const BACKGROUND_URL = RECENT_MOVIES.jurassic.posterUrl;

export const SeatsScreen = ({ navigation, route }: any) => {
  const { movie: routeMovie, movieId, scheduleId, selectedFormat, showtime } = route.params || {};
  const movie = normalizeReservationMovie(routeMovie);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const loadOccupiedSeats = async () => {
      if (!scheduleId) {
        setLoading(false);
        return;
      }
      try {
        const seats = await reservationService.getOccupiedSeats(scheduleId);
        setOccupiedSeats(seats);
      } catch (error) {
        console.error('Error loading occupied seats:', error);
      } finally {
        setLoading(false);
      }
    };
    loadOccupiedSeats();
  }, [scheduleId]);

  const toggleSeat = (seatId: string) => {
    if (occupiedSeats.includes(seatId) || loading) return;
    
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const totalPrice = selectedSeats.length * SEAT_PRICE;

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      navigation.navigate('Snacks', { 
        movieId, 
        movie,
        scheduleId, 
        selectedFormat,
        showtime,
        seats: selectedSeats,
        totalSeats: totalPrice 
      });
    }
  };

  const renderSeatGrid = () => {
    return ROWS.map((row) => (
      <View key={row} style={styles.row}>
        {Array.from({ length: COLS }).map((_, colIndex) => {
          if (AISLES.includes(colIndex)) {
            return <View key={`${row}-aisle-${colIndex}`} style={styles.aisle} />;
          }

          const seatId = `${row}${colIndex}`;
          const isOccupied = occupiedSeats.includes(seatId);
          const isSelected = selectedSeats.includes(seatId);

          let seatStyle = styles.seatAvailable;
          if (isOccupied) seatStyle = styles.seatOccupied;
          else if (isSelected) seatStyle = styles.seatSelected;

          return (
            <TouchableOpacity 
              key={seatId} 
              activeOpacity={0.7}
              onPress={() => toggleSeat(seatId)}
              style={[styles.seat, seatStyle]}
              disabled={isOccupied}
            />
          );
        })}
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <ImageBackground 
        source={{ uri: getMovieImage(movie) || BACKGROUND_URL }} 
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.2 }}
        blurRadius={40}
      >
        
        {/* Header */}
        <BlurView intensity={80} tint="dark" style={[styles.header, { paddingTop: insets.top }]}>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: spacing.sm }}>
                <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
              </TouchableOpacity>
              <Ionicons name="film" size={24} color={colors.primaryContainer} />
              <Text style={[typography.h2, styles.logoText, { fontSize: 20 }]}>{APP_NAME}</Text>
            </View>
          </View>
        </BlurView>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80 }]}>
          
          <View style={styles.infoSection}>
            <Text style={[typography.h1, styles.screenTitle]}>Selecciona tus asientos</Text>
            <View style={styles.metaInfo}>
              <Ionicons name="time-outline" size={16} color={colors.onSurfaceVariant} />
              <Text style={styles.metaText}>
                {showtime?.time || '19:45'} - {showtime?.room || DEFAULT_ROOM} - {selectedFormat || showtime?.format || 'IMAX'}
              </Text>
            </View>
          </View>

          <View style={styles.cinemaContainer}>
            {/* Screen Curve */}
            <View style={styles.screenCurveContainer}>
              <LinearGradient
                colors={[colors.primaryContainer, 'transparent']}
                style={styles.screenCurve}
              />
              <Text style={[typography.labelCaps, styles.screenLabel]}>PANTALLA</Text>
            </View>

            {/* Seats */}
            <View style={styles.gridContainer}>
              {renderSeatGrid()}
            </View>

            {/* Legend */}
            <BlurView intensity={20} tint="dark" style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, styles.seatAvailable]} />
                <Text style={styles.legendText}>Disponible</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, styles.seatOccupied]} />
                <Text style={styles.legendText}>Ocupado</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendBox, styles.seatSelected]} />
                <Text style={styles.legendText}>Seleccionado</Text>
              </View>
            </BlurView>
          </View>

        </ScrollView>

        {/* Bottom Action Bar */}
        <BlurView intensity={80} tint="dark" style={[styles.bottomBar, { paddingBottom: insets.bottom }]}>
          <View style={styles.bottomBarContent}>
            <View style={styles.summaryInfo}>
              <View style={styles.summaryColumn}>
                <Text style={[typography.labelCaps, styles.summaryLabel]}>Boletos</Text>
                <View style={styles.summaryValueRow}>
                  <Text style={[typography.h2, styles.summaryValueMain]}>{selectedSeats.length}</Text>
                  {selectedSeats.length > 0 && (
                    <Text style={[typography.bodyMd, styles.summaryValueSub]}>
                      ({selectedSeats.join(', ')})
                    </Text>
                  )}
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.summaryColumn}>
                <Text style={[typography.labelCaps, styles.summaryLabel]}>TOTAL</Text>
                <Text style={[typography.h2, styles.summaryPrice]}>{formatCurrency(totalPrice)}</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={[styles.continueBtn, selectedSeats.length === 0 && styles.continueBtnDisabled]}
              disabled={selectedSeats.length === 0}
              onPress={handleContinue}
              activeOpacity={0.9}
            >
              <Text style={styles.continueBtnText}>Continuar</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.onPrimaryContainer} />
            </TouchableOpacity>
          </View>
        </BlurView>

      </ImageBackground>
    </View>
  );
};

const { width } = Dimensions.get('window');
const SEAT_SIZE = Math.min((width - spacing.containerMargin * 2 - spacing.s * 7 - spacing.xl * 2) / 8, 32);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
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
  scrollContent: {
    paddingTop: 100, // space for header
    paddingBottom: 180, // space for large bottom bar
  },
  infoSection: {
    alignItems: 'center',
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.containerMargin,
  },
  screenTitle: {
    color: colors.onSurface,
    textAlign: 'center',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    fontFamily: 'Inter',
  },
  cinemaContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.containerMargin,
  },
  screenCurveContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  screenCurve: {
    width: '100%',
    height: 4,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    marginBottom: spacing.md,
  },
  screenLabel: {
    color: colors.onSurfaceVariant,
    opacity: 0.5,
    letterSpacing: 4,
  },
  gridContainer: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.s,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  aisle: {
    width: spacing.md,
  },
  seat: {
    width: SEAT_SIZE,
    height: SEAT_SIZE,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
  },
  seatAvailable: {
    backgroundColor: colors.surfaceContainerLow,
    borderColor: colors.outlineVariant,
  },
  seatOccupied: {
    backgroundColor: colors.primaryContainer,
    borderColor: '#991b1b', // dark red border
    borderBottomWidth: 2,
  },
  seatSelected: {
    backgroundColor: '#22c55e', // Green
    borderColor: '#16a34a',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 4,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.xxxl,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
  },
  legendText: {
    color: colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.6,
    shadowRadius: 32,
    elevation: 20,
    overflow: 'hidden', // to round corners with blur
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  summaryInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryColumn: {
    flexDirection: 'column',
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: spacing.sm,
  },
  summaryLabel: {
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  summaryValueMain: {
    color: colors.onSurface,
  },
  summaryValueSub: {
    color: colors.onSurfaceVariant,
  },
  summaryPrice: {
    color: colors.primaryContainer, // text-red-600
  },
  continueBtn: {
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  continueBtnDisabled: {
    opacity: 0.5,
  },
  continueBtnText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
});
