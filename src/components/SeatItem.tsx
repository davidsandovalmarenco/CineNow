import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius } from '../theme/spacing';

export type SeatStatus = 'available' | 'selected' | 'occupied';

interface SeatItemProps {
  id: string;
  label: string;
  status: SeatStatus;
  onPress: (id: string) => void;
}

export const SeatItem: React.FC<SeatItemProps> = ({ id, label, status, onPress }) => {
  const getBackgroundColor = () => {
    switch (status) {
      case 'selected': return colors.primary;
      case 'occupied': return colors.surfaceBright;
      default: return colors.surface;
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case 'selected': return colors.primary;
      case 'occupied': return colors.surfaceBright;
      default: return colors.border;
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'occupied': return colors.textSecondary;
      default: return colors.text;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.seat,
        { backgroundColor: getBackgroundColor(), borderColor: getBorderColor() }
      ]}
      onPress={() => status !== 'occupied' && onPress(id)}
      disabled={status === 'occupied'}
      activeOpacity={0.8}
    >
      {/* Simple Seat Design */}
      <View style={styles.seatTop} />
      <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  seat: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 6,
    position: 'relative',
  },
  seatTop: {
    position: 'absolute',
    top: -4,
    width: 24,
    height: 4,
    backgroundColor: colors.surfaceBright,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
