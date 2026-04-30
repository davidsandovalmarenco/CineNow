import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PaymentMethodsScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const cards = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiry: '12/26',
      cardholder: 'DAVID SANDOVAL',
      isDefault: true,
      color: 'rgba(28,28,28,0.9)',
      border: 'rgba(255,255,255,0.1)',
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8890',
      expiry: '05/25',
      cardholder: 'DAVID SANDOVAL',
      isDefault: false,
      color: 'rgba(229,9,20,0.1)',
      border: 'rgba(229,9,20,0.3)',
    }
  ];

  const renderCard = (card: any) => (
    <View key={card.id} style={[styles.cardContainer, { backgroundColor: card.color, borderColor: card.border }]}>
      <View style={styles.cardHeader}>
        <Ionicons 
          name={card.type === 'visa' ? 'logo-venmo' : 'card'} 
          size={24} 
          color={card.isDefault ? colors.primary : colors.textSecondary} 
        />
        {card.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>PREDETERMINADO</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumberDot}>••••</Text>
        <Text style={styles.cardNumberDot}>••••</Text>
        <Text style={styles.cardNumberDot}>••••</Text>
        <Text style={styles.cardNumberText}>{card.last4}</Text>
      </View>
      
      <View style={styles.cardFooter}>
        <View>
          <Text style={styles.cardLabel}>TITULAR</Text>
          <Text style={styles.cardValue}>{card.cardholder}</Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>EXPIRA</Text>
          <Text style={styles.cardValue}>{card.expiry}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Métodos de Pago</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}>
        {cards.map(renderCard)}

        <TouchableOpacity style={styles.addCardBtn}>
          <Ionicons name="add-circle-outline" size={24} color={colors.text} />
          <Text style={styles.addCardText}>Agregar nueva tarjeta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(28,28,28,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: spacing.m,
    gap: spacing.l,
  },
  cardContainer: {
    borderRadius: borderRadius.l,
    padding: spacing.xl,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  defaultBadge: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    color: colors.text,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
    marginBottom: spacing.xl,
  },
  cardNumberDot: {
    color: colors.textSecondary,
    fontSize: 24,
    letterSpacing: 2,
  },
  cardNumberText: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardValue: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
  },
  addCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderStyle: 'dashed',
    borderRadius: borderRadius.l,
    height: 100,
  },
  addCardText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
