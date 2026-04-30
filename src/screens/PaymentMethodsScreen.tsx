import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import { PaymentMethod } from '../services/types';

export const PaymentMethodsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [cards, setCards] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    cardholder: '',
    last4: '',
    expiry: '',
    type: 'visa' as PaymentMethod['type'],
  });

  const typeLabels: Record<PaymentMethod['type'], string> = {
    visa: 'VISA',
    mastercard: 'MASTERCARD',
    amex: 'AMEX',
    other: 'OTRA',
  };

  useEffect(() => {
    const loadCards = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const data = await userService.getPaymentMethods(user.uid);
        setCards(data);
      } catch (error) {
        console.error('Error loading cards:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, [user?.uid]);

  const handleAddCard = async () => {
    if (!user?.uid) return;
    if (!form.cardholder.trim() || form.last4.length !== 4 || !form.expiry.trim()) {
      Alert.alert('Datos incompletos', 'Agrega titular, últimos 4 dígitos y fecha de expiración.');
      return;
    }

    setSaving(true);
    try {
      const nextCards = await userService.addPaymentMethod(user.uid, {
        type: form.type,
        last4: form.last4,
        expiry: form.expiry,
        cardholder: form.cardholder.trim().toUpperCase(),
        isDefault: cards.length === 0,
      });
      setCards(nextCards);
      setForm({ cardholder: '', last4: '', expiry: '', type: 'visa' });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo agregar la tarjeta');
    } finally {
      setSaving(false);
    }
  };

  const handleSetDefault = async (cardId: string) => {
    if (!user?.uid) return;
    const nextCards = await userService.setDefaultPaymentMethod(user.uid, cardId);
    setCards(nextCards);
  };

  const handleDelete = async (cardId: string) => {
    if (!user?.uid) return;
    const nextCards = await userService.deletePaymentMethod(user.uid, cardId);
    setCards(nextCards);
  };

  const renderCard = (card: PaymentMethod) => (
    <View key={card.id} style={[styles.cardContainer, card.isDefault && styles.cardDefault]}>
      <View style={styles.cardHeader}>
        <Ionicons name={card.type === 'visa' ? 'logo-venmo' : 'card'} size={24} color={card.isDefault ? colors.primary : colors.textSecondary} />
        {card.isDefault && (
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultText}>PREDETERMINADO</Text>
          </View>
        )}
      </View>

      <View style={styles.cardNumberContainer}>
        <Text style={styles.cardNumberDot}>....</Text>
        <Text style={styles.cardNumberDot}>....</Text>
        <Text style={styles.cardNumberDot}>....</Text>
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

      <View style={styles.cardActions}>
        {!card.isDefault && (
          <TouchableOpacity style={styles.actionBtn} onPress={() => handleSetDefault(card.id)}>
            <Text style={styles.actionText}>Usar por defecto</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.actionBtn} onPress={() => handleDelete(card.id)}>
          <Text style={[styles.actionText, styles.deleteText]}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Métodos de pago</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}>
        {cards.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="card-outline" size={28} color={colors.textSecondary} />
            <Text style={styles.emptyText}>Todavía no tienes tarjetas guardadas.</Text>
          </View>
        ) : (
          cards.map(renderCard)
        )}

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Agregar tarjeta</Text>
          <TextInput
            style={styles.input}
            value={form.cardholder}
            onChangeText={(text) => setForm({ ...form, cardholder: text })}
            placeholder="Titular"
            placeholderTextColor={colors.textSecondary}
          />
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.inputHalf]}
              value={form.last4}
              onChangeText={(text) => setForm({ ...form, last4: text.replace(/\D/g, '').slice(0, 4) })}
              placeholder="Últimos 4"
              placeholderTextColor={colors.textSecondary}
              keyboardType="number-pad"
              maxLength={4}
            />
            <TextInput
              style={[styles.input, styles.inputHalf]}
              value={form.expiry}
              onChangeText={(text) => setForm({ ...form, expiry: text })}
              placeholder="MM/AA"
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.typeRow}>
            {(['visa', 'mastercard', 'amex', 'other'] as PaymentMethod['type'][]).map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.typeChip, form.type === type && styles.typeChipActive]}
                onPress={() => setForm({ ...form, type })}
              >
                <Text style={[styles.typeChipText, form.type === type && styles.typeChipTextActive]}>{typeLabels[type]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.addCardBtn} onPress={handleAddCard} disabled={saving}>
            {saving ? (
              <ActivityIndicator color={colors.text} />
            ) : (
              <>
                <Ionicons name="add-circle-outline" size={24} color={colors.text} />
                <Text style={styles.addCardText}>Guardar método</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  centered: { justifyContent: 'center', alignItems: 'center' },
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
  headerTitle: { color: colors.text, fontSize: 18, fontWeight: 'bold' },
  scrollContent: { padding: spacing.m, gap: spacing.l },
  cardContainer: {
    borderRadius: borderRadius.l,
    padding: spacing.xl,
    borderWidth: 1,
    backgroundColor: 'rgba(28,28,28,0.9)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  cardDefault: { backgroundColor: 'rgba(229,9,20,0.1)', borderColor: 'rgba(229,9,20,0.3)' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xl },
  defaultBadge: { backgroundColor: 'rgba(255,255,255,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  defaultText: { color: colors.text, fontSize: 10, fontWeight: 'bold', letterSpacing: 1 },
  cardNumberContainer: { flexDirection: 'row', alignItems: 'center', gap: spacing.m, marginBottom: spacing.xl },
  cardNumberDot: { color: colors.textSecondary, fontSize: 24, letterSpacing: 2 },
  cardNumberText: { color: colors.text, fontSize: 20, fontWeight: '600', letterSpacing: 2 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  cardLabel: { color: colors.textSecondary, fontSize: 10, fontWeight: 'bold', letterSpacing: 1, marginBottom: 4 },
  cardValue: { color: colors.text, fontSize: 14, fontWeight: '600', letterSpacing: 1 },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.m, marginTop: spacing.l },
  actionBtn: { paddingVertical: spacing.s },
  actionText: { color: colors.text, fontWeight: '600' },
  deleteText: { color: colors.primary },
  emptyCard: {
    minHeight: 120,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(28,28,28,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.s,
  },
  emptyText: { color: colors.textSecondary },
  formCard: {
    borderRadius: borderRadius.l,
    padding: spacing.m,
    backgroundColor: 'rgba(28,28,28,0.45)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: spacing.m,
  },
  formTitle: { color: colors.text, fontSize: 16, fontWeight: 'bold' },
  input: {
    minHeight: 52,
    borderRadius: borderRadius.m,
    paddingHorizontal: spacing.m,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    color: colors.text,
  },
  formRow: { flexDirection: 'row', gap: spacing.m },
  inputHalf: { flex: 1 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.s },
  typeChip: {
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  typeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeChipText: { color: colors.textSecondary, fontWeight: '700', fontSize: 12 },
  typeChipTextActive: { color: colors.text },
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
    height: 58,
  },
  addCardText: { color: colors.text, fontSize: 16, fontWeight: '600' },
});
