import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { borderRadius, spacing } from '../theme/spacing';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  posterUrl: string;
  description?: string;
}

interface MovieCardProps {
  movie: Movie;
  onPress: (movie: Movie) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress(movie)}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: movie.posterUrl }} 
        style={styles.poster} 
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
        <Text style={styles.genre}>{movie.genre}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.metaText}>{movie.duration}</Text>
          <View style={styles.dot} />
          <Text style={styles.metaText}>{movie.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: spacing.m,
  },
  poster: {
    width: 140,
    height: 210,
    borderRadius: borderRadius.m,
    backgroundColor: colors.surface,
  },
  info: {
    marginTop: spacing.s,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  genre: {
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 4,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textSecondary,
    marginHorizontal: 6,
  },
});
