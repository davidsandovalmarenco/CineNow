import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const typography = StyleSheet.create({
  h1: {
    fontFamily: 'Be Vietnam Pro',
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.64,
    color: colors.onBackground,
  },
  h2: {
    fontFamily: 'Be Vietnam Pro',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.24,
    color: colors.onBackground,
  },
  h3: {
    fontFamily: 'Be Vietnam Pro',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    color: colors.onBackground,
  },
  bodyLg: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: colors.onSurfaceVariant,
  },
  bodyMd: {
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    color: colors.onSurfaceVariant,
  },
  labelCaps: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
    color: colors.onSurfaceVariant,
  },
  button: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
    color: colors.onPrimary,
  },
});
