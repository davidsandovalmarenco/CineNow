import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { movieService } from '../services/movieService';
import { ScheduleData, MovieData } from '../services/types';

export const ScheduleScreen = ({ navigation, route }: any) => {
  const { movieId } = route.params || {};
  const [selectedDate, setSelectedDate] = useState('14');
  const [movie, setMovie] = useState<MovieData | null>(null);
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!movieId) {
        setLoading(false);
        return;
      }
      try {
        const [movieData, schedulesData] = await Promise.all([
          movieService.getMovieById(movieId),
          movieService.getMovieSchedules(movieId)
        ]);
        setMovie(movieData);
        setSchedules(schedulesData);
        // If we have real schedules, we could extract unique dates, but for now we'll keep the mock date picker UI
      } catch (error) {
        console.error('Error fetching schedule data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [movieId]);


  // We keep mock dates for the UI since Firestore schedules might not have full date parsing implemented yet
  const dates = [
    { day: 'HOY', num: '14', month: 'OCT' },
    { day: 'MAR', num: '15', month: 'OCT' },
    { day: 'MIÉ', num: '16', month: 'OCT' },
    { day: 'JUE', num: '17', month: 'OCT' },
    { day: 'VIE', num: '18', month: 'OCT' },
    { day: 'SÁB', num: '19', month: 'OCT' },
  ];

  const handleSelectSchedule = (scheduleId: string) => {
    navigation.navigate('Seats', { movieId, scheduleId });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[1]} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Poster Section */}
        <View style={styles.heroContainer}>
          <ImageBackground 
            source={{ uri: movie?.bannerUrl || movie?.posterUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrbZAwZIt5d77ZgYuGwOfRc3BsypkP7UcOn21B6xQm1dcSiR3Asju2i8KzBcfXWDH7Hy3pvDdk12K4PW1lk5gDG44mZjN4jPIjykywVBcvoAwLIegqpxnfS2IrJfuhK0A2cjhtktGBvhFZVcJzdTVuQXLVX3_WoAHJs2fGLrdNW0xqFtyMSCBrRsuaVdf93h0tRx_cUWfNlPYH4m618Bb28ZjyVChnMLlVblcPIF1nvhW2PfSzeK2nfDATSPdRs_OG34bXu0C_dqM' }} 
            style={styles.heroImage}
          >
            <View style={styles.gradientOverlay} />
            
            <SafeAreaView style={styles.safeAreaBtn}>
              <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
            </SafeAreaView>

            <View style={styles.heroContent}>
              <View style={styles.badgesContainer}>
                <View style={styles.badgePrimary}><Text style={styles.badgeText}>IMAX</Text></View>
                <View style={styles.badgeSecondary}><Text style={styles.badgeTextSecondary}>{movie?.classification || 'PG-13'}</Text></View>
              </View>
              <Text style={styles.heroTitle}>{movie?.title || 'Duna: Parte Dos'}</Text>
              <Text style={styles.heroDesc} numberOfLines={2}>
                {movie?.synopsis || 'Sigue el viaje mítico de Paul Atreides mientras se une a Chani y los Fremen en una guerra de venganza contra los conspiradores.'}
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Date Picker (Sticky) */}
        <View style={styles.datePickerContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.datePickerScroll}>
            {dates.map((date, index) => {
              const isActive = selectedDate === date.num;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={[styles.dateCard, isActive && styles.dateCardActive]}
                  onPress={() => setSelectedDate(date.num)}
                >
                  <Text style={[styles.dateDay, isActive && styles.dateTextActive]}>{date.day}</Text>
                  <Text style={[styles.dateNum, isActive && styles.dateTextActive]}>{date.num}</Text>
                  <Text style={[styles.dateMonth, isActive && styles.dateTextActive]}>{date.month}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Schedules List */}
        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Horarios Disponibles</Text>
            <Ionicons name="options-outline" size={20} color={colors.textSecondary} />
          </View>

          <View style={styles.schedulesContainer}>
            {schedules.length === 0 ? (
              <Text style={{ color: colors.textSecondary, textAlign: 'center', marginTop: spacing.l }}>
                No hay horarios disponibles para esta película.
              </Text>
            ) : (
              schedules.map((schedule) => {
                const isSoldOut = false; // We can add a capacity check later
                return (
                  <View key={schedule.id} style={[styles.scheduleCard, isSoldOut && styles.scheduleCardSoldOut]}>
                    <View style={styles.scheduleInfo}>
                      <View style={styles.timeRow}>
                        <Text style={styles.timeText}>{schedule.time}</Text>
                        <View style={[styles.formatBadge, schedule.format?.includes('IMAX') && styles.formatBadgeImax]}>
                          <Text style={[styles.formatText, schedule.format?.includes('IMAX') && styles.formatTextImax]}>{schedule.format}</Text>
                        </View>
                      </View>
                      
                      <View style={styles.detailsRow}>
                        <Ionicons name="business-outline" size={14} color={colors.textSecondary} />
                        <Text style={styles.detailsText}>{schedule.room}</Text>
                        <View style={styles.dot} />
                        <Text style={styles.detailsTextHighlight}>{schedule.language}</Text>
                      </View>
                    </View>
                    
                    {isSoldOut ? (
                      <View style={styles.soldOutContainer}>
                        <View style={styles.soldOutBtn}>
                          <Text style={styles.soldOutBtnText}>Agotado</Text>
                        </View>
                        <Text style={styles.nextAvailableText}>Siguiente: Próximamente</Text>
                      </View>
                    ) : (
                      <TouchableOpacity 
                        style={styles.selectBtn} 
                        onPress={() => handleSelectSchedule(schedule.id || '')}
                      >
                        <Text style={styles.selectBtnText}>Seleccionar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              })
            )}
          </View>

          {/* Pricing Info */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle-outline" size={24} color={colors.primary} />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoTitle}>Precios y Promociones</Text>
              <Text style={styles.infoDesc}>
                Los lunes y miércoles cuentan con un 20% de descuento en salas tradicionales. Precios sujetos a cambios según formato.
              </Text>
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  heroContainer: {
    height: 350,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  safeAreaBtn: {
    marginTop: spacing.l,
    marginLeft: spacing.m,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(28,28,28,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  heroContent: {
    padding: spacing.m,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: spacing.s,
    marginBottom: spacing.xs,
  },
  badgePrimary: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.s,
  },
  badgeText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  badgeSecondary: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.s,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  badgeTextSecondary: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
  },
  heroTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  heroDesc: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  datePickerContainer: {
    backgroundColor: 'rgba(13,13,13,0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    paddingVertical: spacing.s,
  },
  datePickerScroll: {
    paddingHorizontal: spacing.m,
    gap: spacing.s,
  },
  dateCard: {
    width: 64,
    height: 80,
    borderRadius: borderRadius.m,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCardActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dateDay: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  dateNum: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateMonth: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  dateTextActive: {
    color: colors.text,
  },
  mainContent: {
    padding: spacing.m,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  schedulesContainer: {
    gap: spacing.m,
  },
  scheduleCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: borderRadius.l,
    padding: spacing.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleCardSoldOut: {
    opacity: 0.75,
  },
  scheduleInfo: {
    flex: 1,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    marginBottom: 4,
  },
  timeText: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  formatBadge: {
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  formatBadgeImax: {
    borderColor: 'rgba(229,9,20,0.3)',
  },
  formatText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
  },
  formatTextImax: {
    color: colors.primary,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  detailsText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.textSecondary,
  },
  detailsTextHighlight: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  selectBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.m,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  selectBtnText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  soldOutContainer: {
    alignItems: 'flex-end',
  },
  soldOutBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.m,
  },
  soldOutBtnText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  nextAvailableText: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 4,
  },
  infoBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: borderRadius.l,
    padding: spacing.m,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.m,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
});
