import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';

interface ScheduleCardProps {
  time: string;
  format: string; // e.g. "2D Doblada", "3D Subtitulada"
  price: string;
  isSelected?: boolean;
  onPress: () => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({
  time,
  format,
  price,
  isSelected = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.time, isSelected && styles.textSelected]}>{time}</Text>
      <Text style={[styles.format, isSelected && styles.textSelected]}>{format}</Text>
      <Text style={[styles.price, isSelected && styles.textSelected]}>{price}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.m,
    padding: spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    width: 110,
    marginRight: spacing.m,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  time: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  format: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  price: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  textSelected: {
    color: colors.text, // White on red background
  },
});
