import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';
import { RemoteImage } from './RemoteImage';

export interface Reservation {
  id: string;
  movieTitle: string;
  posterUrl: string;
  date: string;
  time: string;
  cinema: string;
  seats: string[];
  totalPrice: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface ReservationCardProps {
  reservation: Reservation;
}

export const ReservationCard: React.FC<ReservationCardProps> = ({ reservation }) => {
  return (
    <View style={styles.card}>
      <RemoteImage uri={reservation.posterUrl} fallbackLabel={reservation.movieTitle} style={styles.poster} />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{reservation.movieTitle}</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fecha:</Text>
          <Text style={styles.detailValue}>{reservation.date} - {reservation.time}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Cine:</Text>
          <Text style={styles.detailValue}>{reservation.cinema}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Butacas:</Text>
          <Text style={styles.detailValue}>{reservation.seats.join(', ')}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>{reservation.totalPrice}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  poster: {
    width: 100,
    alignSelf: 'stretch',
    minHeight: 150,
  },
  content: {
    flex: 1,
    padding: spacing.m,
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    color: colors.textSecondary,
    fontSize: 13,
    width: 60,
  },
  detailValue: {
    color: colors.text,
    fontSize: 13,
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.s,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  totalValue: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
