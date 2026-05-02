import React from 'react';
import { ImageSourcePropType, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { RemoteImage } from './RemoteImage';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration?: string;
  rating: number;
  posterUrl: string;
  posterAsset?: ImageSourcePropType;
  classification?: string;
  synopsis?: string;
}

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
  width?: number;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress, width = 160 }) => {
  return (
    <TouchableOpacity 
      style={[styles.card, { width }]} 
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <RemoteImage 
          uri={movie.posterUrl} 
          assetSource={movie.posterAsset}
          fallbackLabel={movie.title}
          style={styles.poster} 
          resizeMode="cover"
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>{movie.rating.toFixed(1)}</Text>
        </View>
      </View>
      
      <Text style={[typography.bodyLg, styles.title]} numberOfLines={1}>
        {movie.title}
      </Text>
      <Text style={[typography.bodyMd, styles.genre]} numberOfLines={1}>
        {movie.genre}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: spacing.md,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: borderRadius.lg, // 16px roughly depending on layout, lg is 16
    overflow: 'hidden',
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    backgroundColor: colors.surfaceContainer,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ratingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  title: {
    color: colors.onBackground,
    marginBottom: 2,
  },
  genre: {
    color: colors.onSurfaceVariant,
  },
});
