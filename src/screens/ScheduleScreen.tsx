import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getMovieImage, normalizeReservationMovie } from '../data/recentMovies';
import { useProfile } from '../hooks/useProfile';
import { APP_NAME, CINEMA_LOCATION } from '../config/locale';
import { RemoteImage } from '../components/RemoteImage';

const RAW_DATES = [
  { id: '1', dayName: 'HOY', dayNum: '01', month: 'MAY' },
  { id: '2', dayName: 'SAB', dayNum: '02', month: 'MAY' },
  { id: '3', dayName: 'MIÉ', dayNum: '16', month: 'OCT' },
  { id: '4', dayName: 'LUN', dayNum: '04', month: 'MAY' },
  { id: '5', dayName: 'MAR', dayNum: '05', month: 'MAY' },
  { id: '6', dayName: 'SÁB', dayNum: '19', month: 'OCT' },
];

const DATES = RAW_DATES.map((date, index) => [
  { id: '1', dayName: 'HOY', dayNum: '01', month: 'MAY' },
  { id: '2', dayName: 'SAB', dayNum: '02', month: 'MAY' },
  { id: '3', dayName: 'DOM', dayNum: '03', month: 'MAY' },
  { id: '4', dayName: 'LUN', dayNum: '04', month: 'MAY' },
  { id: '5', dayName: 'MAR', dayNum: '05', month: 'MAY' },
  { id: '6', dayName: 'MIE', dayNum: '06', month: 'MAY' },
][index] || date);

const SHOWTIMES = [
  { id: 's1', time: '14:30', format: 'DOLBY', room: 'Sala 04', language: 'SUB (Español)', formatType: 'primary', available: true },
  { id: 's2', time: '17:15', format: 'DIGITAL', room: 'Sala 02', language: 'DUB (Latino)', formatType: 'secondary', available: true },
  { id: 's3', time: '19:45', format: 'IMAX 3D', room: 'Sala 01', language: 'SUB (Español)', formatType: 'danger', available: false },
  { id: 's4', time: '21:00', format: 'DIGITAL', room: 'Sala 06', language: 'DUB (Latino)', formatType: 'secondary', available: true },
];

const { width } = Dimensions.get('window');

const formatTime12Hour = (time: string) => {
  const [hourText, minuteText = '00'] = time.split(':');
  const hour = Number(hourText);
  if (Number.isNaN(hour)) return time;

  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minuteText.padStart(2, '0')} ${period}`;
};

export const ScheduleScreen = ({ navigation, route }: any) => {
  const [selectedDate, setSelectedDate] = useState(DATES[0].id);
  const insets = useSafeAreaInsets();
  const { avatarUri } = useProfile();
  const movie = normalizeReservationMovie(route.params?.movie);
  const selectedFormat = route.params?.selectedFormat || 'IMAX 3D';

  const handleBack = () => {
    navigation.goBack();
  };

  const handleSelectTime = (show: typeof SHOWTIMES[number]) => {
    navigation.navigate('Seats', {
      movie,
      movieId: movie.id,
      scheduleId: show.id,
      selectedFormat,
      showtime: show,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <BlurView intensity={80} tint="dark" style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={handleBack} style={{ marginRight: spacing.sm }}>
              <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
            </TouchableOpacity>
            <Ionicons name="film" size={24} color={colors.primaryContainer} />
            <Text style={[typography.h2, styles.logoText, { fontSize: 20 }]}>{APP_NAME}</Text>
          </View>
          <View style={styles.headerActions}>
            <Ionicons name="search" size={24} color={colors.secondary} />
            <TouchableOpacity style={styles.profileBtn} onPress={() => navigation.navigate('ProfileTab')} activeOpacity={0.8}>
              <Image source={{ uri: avatarUri }} style={styles.profileImg} />
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <RemoteImage 
            uri={getMovieImage(movie)} 
            assetSource={movie.posterAsset}
            fallbackLabel={movie.title}
            style={[styles.heroImage, { opacity: 0.8 }]} // To simulate grayscale/contrast somewhat
          />
          <LinearGradient
            colors={['transparent', 'rgba(13, 13, 13, 0.4)', '#0D0D0D']}
            locations={[0, 0.6, 1]}
            style={styles.gradient}
          />
          <View style={styles.heroContent}>
            <View style={styles.badgesRow}>
              <View style={styles.badgePrimary}>
                <Text style={styles.badgeTextPrimary}>{selectedFormat}</Text>
              </View>
              <BlurView intensity={20} tint="light" style={styles.badgeSecondary}>
                <Text style={styles.badgeTextSecondary}>PG-13</Text>
              </BlurView>
            </View>
            <Text style={[typography.h1, styles.heroTitle]}>{movie.title}</Text>
            <Text style={[typography.bodyMd, styles.heroDesc]}>{movie.description}</Text>
            <Text style={styles.locationText}>{CINEMA_LOCATION}</Text>
          </View>
        </View>

        {/* Sticky-like Date Picker (just inline for now) */}
        <View style={styles.datePickerContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datePickerScroll}>
            {DATES.map((date) => {
              const isActive = selectedDate === date.id;
              return (
                <TouchableOpacity 
                  key={date.id} 
                  style={[styles.dateCard, isActive && styles.dateCardActive]}
                  onPress={() => setSelectedDate(date.id)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.dayName, isActive && styles.textActive]}>{date.dayName}</Text>
                  <Text style={[styles.dayNum, isActive && styles.textActive]}>{date.dayNum}</Text>
                  <Text style={[styles.month, isActive && styles.textActive]}>{date.month}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Showtimes List */}
        <View style={styles.showtimesContainer}>
          <View style={styles.showtimesHeader}>
            <View style={styles.showtimesTitleBlock}>
              <Text style={typography.h2}>Horarios disponibles</Text>
              <Text style={styles.showtimesSubtitle}>Elige una funcion para continuar con tus butacas.</Text>
            </View>
            <Ionicons name="options-outline" size={24} color={colors.secondary} />
          </View>

          <View style={styles.showtimesList}>
            {SHOWTIMES.map((show) => (
              <View key={show.id} style={[styles.showCard, !show.available && styles.showCardDisabled]}>
                <View style={styles.showTopRow}>
                  <View style={styles.showTimeRow}>
                    <Text 
                      style={[typography.h1, { fontSize: 24, lineHeight: 28 }]}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                    >
                      {formatTime12Hour(show.time)}
                    </Text>
                    
                    <View style={[
                      styles.formatBadge, 
                      show.formatType === 'primary' && styles.formatBadgePrimary,
                      show.formatType === 'secondary' && styles.formatBadgeSecondary,
                      show.formatType === 'danger' && styles.formatBadgeDanger,
                    ]}>
                      <Text style={[
                        styles.formatBadgeText,
                        show.formatType === 'primary' && styles.formatBadgeTextPrimary,
                        show.formatType === 'secondary' && styles.formatBadgeTextSecondary,
                        show.formatType === 'danger' && styles.formatBadgeTextDanger,
                      ]}>{show.format}</Text>
                    </View>
                  </View>

                  {show.available ? (
                    <TouchableOpacity 
                      style={styles.btnSelect}
                      onPress={() => handleSelectTime(show)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.btnSelectText}>Seleccionar</Text>
                      <Ionicons name="chevron-forward" size={16} color={colors.onPrimaryContainer} />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.btnSoldOut}>
                      <Text style={styles.btnSoldOutText}>Agotado</Text>
                    </View>
                  )}
                </View>

                <View style={styles.showMetaRow}>
                  <View style={styles.metaChip}>
                    <Ionicons name="easel-outline" size={16} color={colors.secondary} />
                    <Text style={styles.metaText} numberOfLines={1}>{show.room}</Text>
                  </View>
                  <View style={styles.metaChip}>
                    <Ionicons name="language-outline" size={16} color={colors.secondary} />
                    <Text style={styles.metaText} numberOfLines={1}>{show.language}</Text>
                  </View>
                </View>

                {!show.available && (
                  <Text style={styles.soldOutSubtext}>Siguiente funcion disponible: {formatTime12Hour('22:30')}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Pricing Disclosure */}
        <View style={styles.disclosureContainer}>
          <BlurView intensity={20} tint="dark" style={styles.disclosureBox}>
            <Ionicons name="information-circle" size={24} color={colors.primaryContainer} style={{ marginTop: 2 }} />
            <View style={styles.disclosureTextContent}>
              <Text style={styles.disclosureTitle}>Precios y promociones</Text>
              <Text style={styles.disclosureText}>
                Los lunes y miércoles hay 20% de descuento en salas tradicionales de Centro Plaza Chinandega. Precios en córdobas y sujetos a cambios según formato.
              </Text>
            </View>
          </BlurView>
        </View>

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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    // padding handled dynamically
  },
  heroContainer: {
    width: '100%',
    height: width * 1.1, // Approx 442px
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.lg,
  },
  badgesRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  badgePrimary: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  badgeTextPrimary: {
    color: colors.onPrimaryContainer,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  badgeSecondary: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  badgeTextSecondary: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroTitle: {
    color: '#fff',
    marginBottom: spacing.xs,
  },
  heroDesc: {
    color: colors.secondary,
    maxWidth: 320,
  },
  locationText: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '700',
  },
  datePickerContainer: {
    backgroundColor: 'rgba(13, 13, 13, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: spacing.md,
  },
  datePickerScroll: {
    paddingHorizontal: spacing.containerMargin,
    gap: spacing.md,
  },
  dateCard: {
    width: 64,
    height: 80,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCardActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  dayName: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary,
    opacity: 0.8,
  },
  dayNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  month: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.secondary,
  },
  textActive: {
    color: colors.onPrimaryContainer,
  },
  showtimesContainer: {
    padding: spacing.containerMargin,
  },
  showtimesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  showtimesTitleBlock: {
    flex: 1,
  },
  showtimesSubtitle: {
    color: colors.secondary,
    fontFamily: 'Inter',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  showtimesList: {
    gap: spacing.md,
  },
  showCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  showCardDisabled: {
    opacity: 0.5,
  },
  showTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  showTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    minWidth: 0,
  },
  formatBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  formatBadgePrimary: {
    borderColor: 'rgba(229, 9, 20, 0.3)',
  },
  formatBadgeSecondary: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  formatBadgeDanger: {
    borderColor: 'rgba(229, 9, 20, 0.3)',
  },
  formatBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  formatBadgeTextPrimary: {
    color: colors.primaryContainer,
  },
  formatBadgeTextSecondary: {
    color: colors.secondary,
  },
  formatBadgeTextDanger: {
    color: colors.error,
  },
  showMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    maxWidth: '100%',
  },
  metaText: {
    color: colors.secondary,
    fontSize: 13,
    fontWeight: '600',
    flexShrink: 1,
  },
  btnSelect: {
    backgroundColor: colors.primaryContainer,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flexShrink: 0,
  },
  btnSelectText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
  },
  btnSoldOut: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    flexShrink: 0,
  },
  btnSoldOutText: {
    color: colors.secondary,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 14,
  },
  soldOutSubtext: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: -spacing.xs,
  },
  disclosureContainer: {
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xl,
  },
  disclosureBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(70, 47, 44, 0.3)', // surface-container-highest/30 equivalent
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  disclosureTextContent: {
    flex: 1,
  },
  disclosureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  disclosureText: {
    fontSize: 12,
    color: colors.secondary,
  },
});
