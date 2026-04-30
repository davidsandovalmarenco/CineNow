import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, StatusBar, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { findRecentMovieByReservation, RECENT_MOVIES } from '../data/recentMovies';
import { APP_NAME, DEFAULT_ROOM } from '../config/locale';

export const ConfirmationScreen = ({ navigation, route }: any) => {
  const { ticket } = route.params || {};
  const insets = useSafeAreaInsets();

  // Mock date format
  const formatMockDate = (createdAtSeconds?: number) => {
    if (!createdAtSeconds) return `24 de mayo, ${ticket?.showtimeLabel || '20:30'}`;
    const d = new Date(createdAtSeconds * 1000);
    return d.toLocaleDateString('es-NI', { month: 'short', day: 'numeric' }) + `, ${ticket?.showtimeLabel || '20:30'}`;
  };

  const movieTitle = ticket?.movieTitle || RECENT_MOVIES.superman.title;
  const moviePosterUrl =
    ticket?.moviePosterUrl ||
    findRecentMovieByReservation(ticket?.movieId, ticket?.movieTitle)?.posterUrl ||
    RECENT_MOVIES.superman.posterUrl;
  const seats = ticket?.seats?.join(', ') || 'G12, G13, G14';
  const reservationCode = ticket?.reservationCode || `CR-${Math.floor(1000 + Math.random() * 9000)}-X09`;
  const movieFormat = ticket?.movieFormat || 'IMAX 3D';
  const room = ticket?.room || DEFAULT_ROOM;

  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      Alert.alert('¡Descarga exitosa!', 'Tu boleto digital ha sido guardado en tu galería.');
    }, 1500);
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
          <TouchableOpacity onPress={handleGoHome} style={styles.closeBtn}>
            <Ionicons name="close" size={24} color={colors.onSurface} />
          </TouchableOpacity>
        </View>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 90 }]}>
        
        <View style={styles.successMessage}>
          <View style={styles.iconCircle}>
            <Ionicons name="checkmark" size={32} color={colors.onPrimaryContainer} />
          </View>
          <Text style={[typography.h1, styles.successTitle]}>¡Reserva confirmada!</Text>
          <Text style={[typography.bodyMd, styles.successSubtitle]}>Tu compra se ha realizado con éxito. Presenta este boleto al ingresar.</Text>
        </View>

        <View style={styles.ticketCard}>
          {/* Top Section */}
          <View style={styles.ticketTop}>
            <Image 
              source={{ uri: moviePosterUrl }} 
              style={styles.poster} 
              resizeMode="cover"
            />
            <View style={styles.movieInfoOverlay}>
              <View style={styles.badgeWrapper}>
                <Text style={styles.badgeText}>{movieFormat}</Text>
              </View>
              <Text style={[typography.h2, styles.movieTitle]} numberOfLines={2}>{movieTitle}</Text>
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
                <Text style={[typography.bodyLg, styles.detailValue]}>{formatMockDate((ticket?.createdAt as any)?.seconds)}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>SALA</Text>
                <Text style={[typography.bodyLg, styles.detailValue]}>{room}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>ASIENTOS</Text>
                <Text style={[typography.h3, styles.detailValueHighlight]}>{seats}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>CÓDIGO DE RESERVA</Text>
                <Text style={[typography.bodyLg, styles.detailValue]}>{reservationCode}</Text>
              </View>
            </View>

            {/* QR Code Placeholder */}
            <View style={styles.qrContainer}>
              <Image 
                source={{ uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(reservationCode)}` }} 
                style={styles.qrCode} 
              />
              <Text style={styles.qrHint}>Escanea este código en la entrada de la sala.</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.downloadBtn} 
          activeOpacity={0.8}
          onPress={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <ActivityIndicator color={colors.onSurface} size="small" />
          ) : (
            <>
              <Ionicons name="download-outline" size={20} color={colors.onSurface} />
              <Text style={styles.downloadBtnText}>Descargar boleto</Text>
            </>
          )}
        </TouchableOpacity>

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
  closeBtn: {
    padding: spacing.xs,
  },
  scrollContent: {
    paddingTop: 100, // header spacing
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  successMessage: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  successTitle: {
    color: '#fff',
    marginBottom: spacing.xs,
  },
  successSubtitle: {
    color: colors.secondary, // text-zinc-400
    textAlign: 'center',
    maxWidth: '80%',
  },
  ticketCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(28, 28, 28, 0.6)', // glass-panel
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: spacing.xl,
  },
  ticketTop: {
    height: 200,
    position: 'relative',
  },
  poster: {
    width: '100%',
    height: '100%',
    opacity: 0.6, // dark mode cinematic feel
  },
  movieInfoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
    padding: spacing.lg,
  },
  badgeWrapper: {
    backgroundColor: colors.primaryContainer,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  badgeText: {
    color: colors.onPrimaryContainer,
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  movieTitle: {
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    backgroundColor: 'rgba(28, 28, 28, 0.6)',
  },
  separatorLeftHole: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#0D0D0D',
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
    backgroundColor: '#0D0D0D',
    marginRight: -16,
    borderLeftWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  ticketBottom: {
    padding: spacing.lg,
    backgroundColor: 'rgba(28, 28, 28, 0.6)',
  },
  detailGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  detailItem: {
    width: '45%',
  },
  detailLabel: {
    color: colors.secondary, // text-zinc-500
    fontSize: 10,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailValue: {
    color: '#fff',
  },
  detailValueHighlight: {
    color: colors.primaryContainer,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: spacing.sm,
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  qrCode: {
    width: 150,
    height: 150,
    marginBottom: spacing.md,
    borderRadius: borderRadius.sm,
    backgroundColor: '#fff', // White bg for QR readability
  },
  qrHint: {
    color: colors.secondary,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  downloadBtnText: {
    color: '#fff',
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
  },
});
