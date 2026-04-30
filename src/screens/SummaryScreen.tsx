import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { reservationService } from '../services/reservationService';
import { useAuth } from '../hooks/useAuth';

export const SummaryScreen = ({ navigation, route }: any) => {
  const { movieId, scheduleId, seats, snacks = [], totalSeats = 0 } = route.params || {};
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const snacksTotal = snacks.reduce((sum: number, s: any) => sum + (s.price * s.quantity), 0);
  const grandTotal = totalSeats + snacksTotal;

  const handleConfirm = async () => {
    if (!user) {
      Alert.alert('Error', 'Debes iniciar sesión para realizar una reserva');
      return;
    }

    if (!movieId || !seats || seats.length === 0) {
      Alert.alert('Error', 'Información de reserva incompleta');
      return;
    }
    
    try {
      setLoading(true);
      await reservationService.createReservation({
        userId: user.uid,
        movieId: movieId,
        movieTitle: movieId || 'Película CineNow',
        cinemaId: 'cinema1',
        scheduleId: scheduleId || 'default_sch',
        seats: seats,
        snacks: snacks.map((s: any) => ({
          snackId: s.id,
          name: s.name,
          quantity: s.quantity,
          price: s.price
        })),
        subtotal: totalSeats,
        total: grandTotal,
        status: 'active',
        reservationCode: `CR-${Math.floor(1000 + Math.random() * 9000)}-X09`
      });

      Alert.alert('¡Éxito!', 'Tu reserva ha sido confirmada', [
        { text: 'Ver mis tickets', onPress: () => navigation.navigate('ReservationsTab') }
      ]);
    } catch (error: any) {
      console.error("Error creating reservation:", error);
      Alert.alert('Error de Conexión', 'No se pudo guardar la reserva. Revisa tus permisos de Firebase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="film" size={24} color={colors.primary} />
          <Text style={styles.headerTitle}>CineNow</Text>
        </View>
        <View style={styles.profileBtn}>
          <Ionicons name="person" size={16} color={colors.textSecondary} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Title Section */}
        <View style={styles.titleSection}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={20} color={colors.textSecondary} />
            <Text style={styles.backText}>Regresar</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Resumen de Reserva</Text>
          <Text style={styles.pageSubtitle}>Por favor, revisa los detalles de tu compra antes de confirmar.</Text>
        </View>

        {/* Asymmetric Movie Info */}
        <View style={styles.movieInfoContainer}>
          <View style={styles.posterWrapper}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-UpyaCeWA8zn2OLnKjaD02IGEH7hemI9rysztBxiQ3UTRjKfna7dnl8owYkHZ_gFSxTWEH4IlRcIc-5wYYK3O_2Y0Uy3eauQUb9T9KNVts3IdPCw9ZrsYdDin8dKJZ_OReS2NxL8z0_WO7XlvFxsNk9dDgkqH1qaXUgxivCX8Zj9AYrvMWt_OUWmj-h6xZHEnfjaIswfUU7ghQNxzePTLwFcOzKCmRbzVMIhmRJTL9V4H9qu-6jLohZh4roVrCuggU8N_oyFA9uA' }} 
              style={styles.poster} 
            />
          </View>
          <View style={styles.movieDetails}>
            <View style={styles.badgeWrapper}>
              <Ionicons name="star" size={14} color={colors.primary} />
              <Text style={styles.badgeText}>ESTRENO EXCLUSIVO</Text>
            </View>
            <Text style={styles.movieTitle}>Crónicas de Marte: El Despertar</Text>
            
            <View style={styles.movieMetaItem}>
              <Ionicons name="time-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.movieMetaText}>145 min</Text>
            </View>
            <View style={styles.movieMetaItem}>
              <Ionicons name="film-outline" size={14} color={colors.textSecondary} />
              <Text style={styles.movieMetaText}>Ciencia Ficción, Drama</Text>
            </View>
          </View>
        </View>

        {/* Receipt Panel */}
        <View style={styles.receiptPanel}>
          <View style={styles.receiptTopBorder} />
          
          <View style={styles.receiptContent}>
            
            {/* Date & Room */}
            <View style={styles.receiptGrid}>
              <View>
                <Text style={styles.receiptLabel}>FECHA Y HORA</Text>
                <Text style={styles.receiptMainText}>Vie, 24 Mayo</Text>
                <Text style={styles.receiptHighlight}>20:30 PM</Text>
              </View>
              <View style={styles.alignRight}>
                <Text style={styles.receiptLabel}>SALA</Text>
                <Text style={styles.receiptMainText}>SALA 04</Text>
                <Text style={styles.receiptSubText}>IMAX Laser</Text>
              </View>
            </View>

            {/* Dashed Separator */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLeftHole} />
              <View style={styles.dashedLine} />
              <View style={styles.separatorRightHole} />
            </View>

            {/* Items */}
            <View style={styles.itemsContainer}>
              
              <View style={styles.itemRow}>
                <View style={styles.itemLeft}>
                  <View style={styles.itemIconBox}>
                    <Ionicons name="apps-outline" size={20} color={colors.textSecondary} />
                  </View>
                  <View>
                    <Text style={styles.itemTitle}>Butacas seleccionadas</Text>
                    <Text style={styles.itemDesc}>{seats?.join(', ') || 'Ninguna'}</Text>
                  </View>
                </View>
                <Text style={styles.itemPrice}>${totalSeats.toFixed(2)}</Text>
              </View>

              {snacks.map((snack: any, index: number) => (
                <View key={snack.id || index} style={styles.itemRow}>
                  <View style={styles.itemLeft}>
                    <View style={styles.itemIconBox}>
                      <Ionicons name="fast-food-outline" size={20} color={colors.textSecondary} />
                    </View>
                    <View>
                      <Text style={styles.itemTitle}>{snack.name}</Text>
                      <Text style={styles.itemDesc}>Cantidad: {snack.quantity}</Text>
                    </View>
                  </View>
                  <Text style={styles.itemPrice}>${(snack.price * snack.quantity).toFixed(2)}</Text>
                </View>
              ))}

            </View>

            {/* Grand Total */}
            <View style={styles.grandTotalBox}>
              <View>
                <Text style={styles.receiptLabel}>TOTAL A PAGAR</Text>
                <Text style={styles.taxText}>Incluye IVA (16%)</Text>
              </View>
              <Text style={styles.grandTotalPrice}>${grandTotal.toFixed(2)}</Text>
            </View>

          </View>
          
          {/* Booking ID Footer */}
          <View style={styles.receiptFooter}>
            <Text style={styles.refText}>REF: CR-8842-X09</Text>
            <View style={styles.barcodePlaceholder}>
              <View style={styles.barcodeLine} />
              <View style={styles.barcodeLine} />
              <View style={styles.barcodeLine} />
            </View>
          </View>

        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.text} />
          ) : (
            <>
              <Text style={styles.confirmBtnText}>Confirmar reserva</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.text} />
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.termsText}>
          Al confirmar, aceptas nuestros términos de servicio y políticas de cancelación.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: spacing.m,
    paddingBottom: spacing.xxxl,
  },
  titleSection: {
    marginBottom: spacing.xl,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.m,
  },
  backText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  pageTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  pageSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  movieInfoContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  posterWrapper: {
    flex: 5,
    aspectRatio: 2 / 3,
    borderRadius: borderRadius.l,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  movieDetails: {
    flex: 7,
    justifyContent: 'center',
    paddingLeft: spacing.m,
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(229,9,20,0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: spacing.s,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  movieTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: spacing.s,
  },
  movieMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
    marginBottom: 4,
  },
  movieMetaText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  receiptPanel: {
    backgroundColor: 'rgba(28, 28, 28, 0.6)',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
    marginBottom: spacing.xl,
  },
  receiptTopBorder: {
    height: 4,
    backgroundColor: colors.primary,
    width: '100%',
  },
  receiptContent: {
    padding: spacing.l,
  },
  receiptGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  alignRight: {
    alignItems: 'flex-end',
  },
  receiptLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  receiptMainText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  receiptHighlight: {
    color: colors.primary,
    fontSize: 14,
    marginTop: 2,
  },
  receiptSubText: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.l,
  },
  separatorLeftHole: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginLeft: -spacing.l - 8,
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
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginRight: -spacing.l - 8,
  },
  itemsContainer: {
    gap: spacing.m,
    marginBottom: spacing.l,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
  },
  itemIconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.s,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    color: colors.text,
    fontSize: 16,
  },
  itemDesc: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  itemPrice: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  grandTotalBox: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: spacing.m,
    borderRadius: borderRadius.m,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  taxText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  grandTotalPrice: {
    color: colors.primary,
    fontSize: 32,
    fontWeight: 'bold',
  },
  receiptFooter: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
  },
  refText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontFamily: 'monospace',
  },
  barcodePlaceholder: {
    flexDirection: 'row',
    gap: 4,
  },
  barcodeLine: {
    width: 4,
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: borderRadius.m,
    gap: spacing.s,
    marginBottom: spacing.l,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  confirmBtnText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    color: colors.textSecondary,
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
});
