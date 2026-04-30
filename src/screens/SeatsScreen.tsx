import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

const SEAT_PRICE = 12.00;

// Dummy seat layout: 5 rows, 10 columns (0-9). Columns 2 and 7 are aisles.
const ROWS = ['A', 'B', 'C', 'D', 'E'];
const COLS = 10;
const AISLES = [2, 7];

// Mock occupied seats
const OCCUPIED_SEATS = ['B3', 'B4', 'D3'];

export const SeatsScreen = ({ navigation, route }: any) => {
  const { movieId, scheduleId } = route.params || {};
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seatId: string) => {
    if (OCCUPIED_SEATS.includes(seatId)) return;
    
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
        scheduleId, 
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
          const isOccupied = OCCUPIED_SEATS.includes(seatId);
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
      {/* Fake blurred background would go here if we used an Image, but we'll stick to solid dark */}
      
      <SafeAreaView style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CineNow</Text>
        <View style={styles.headerRight} />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.infoSection}>
          <Text style={styles.screenTitle}>Selecciona tus Asientos</Text>
          <View style={styles.metaInfo}>
            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.metaText}>19:45 • Sala 4 • IMAX</Text>
          </View>
        </View>

        <View style={styles.cinemaContainer}>
          {/* Screen Curve */}
          <View style={styles.screenCurveContainer}>
            <View style={styles.screenCurve} />
            <Text style={styles.screenLabel}>PANTALLA</Text>
          </View>

          {/* Seats */}
          <View style={styles.gridContainer}>
            {renderSeatGrid()}
          </View>

          {/* Legend */}
          <View style={styles.legendContainer}>
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
          </View>
        </View>

      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Boletos</Text>
            <View style={styles.summaryValueRow}>
              <Text style={styles.summaryValueMain}>{selectedSeats.length}</Text>
              {selectedSeats.length > 0 && (
                <Text style={styles.summaryValueSub}>
                  ({selectedSeats.join(', ')})
                </Text>
              )}
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Precio Total</Text>
            <Text style={styles.summaryPrice}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.continueBtn, selectedSeats.length === 0 && styles.continueBtnDisabled]}
          disabled={selectedSeats.length === 0}
          onPress={handleContinue}
        >
          <Text style={styles.continueBtnText}>Continuar</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

    </View>
  );
};

const { width } = Dimensions.get('window');
const SEAT_SIZE = (width - spacing.xxl * 2 - spacing.s * 7 - spacing.xl * 2) / 8; // Calc relative seat size

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 160, // Space for large bottom bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingTop: spacing.m,
    paddingBottom: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    width: 40,
  },
  infoSection: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  screenTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  cinemaContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.m,
  },
  screenCurveContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  screenCurve: {
    width: '80%',
    height: 4,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: spacing.l,
  },
  screenLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 4,
    opacity: 0.5,
  },
  gridContainer: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.m,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.s,
  },
  aisle: {
    width: spacing.xl,
  },
  seat: {
    width: Math.max(SEAT_SIZE, 24),
    height: Math.max(SEAT_SIZE, 24),
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 1,
  },
  seatAvailable: {
    backgroundColor: 'rgba(42, 22, 20, 0.5)',
    borderColor: 'rgba(94, 63, 59, 0.8)',
  },
  seatOccupied: {
    backgroundColor: colors.primary,
    borderColor: 'rgba(147, 0, 10, 0.8)',
    borderBottomWidth: 3,
    borderBottomColor: '#690005',
  },
  seatSelected: {
    backgroundColor: '#22c55e', // Green
    borderColor: '#16a34a',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 4,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.l,
    marginTop: spacing.xxxl,
    backgroundColor: 'rgba(28, 28, 28, 0.7)',
    paddingVertical: spacing.s,
    paddingHorizontal: spacing.l,
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
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(28,28,28,0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.l,
    paddingTop: spacing.m,
    paddingBottom: spacing.xxl,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  summaryItem: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: spacing.m,
  },
  summaryLabel: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.s,
  },
  summaryValueMain: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  summaryValueSub: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  summaryPrice: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: 'bold',
  },
  continueBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: borderRadius.m,
    gap: spacing.s,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueBtnDisabled: {
    backgroundColor: colors.surface,
    shadowOpacity: 0,
    elevation: 0,
    opacity: 0.5,
  },
  continueBtnText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
