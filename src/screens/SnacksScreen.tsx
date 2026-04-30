import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { snackService } from '../services/snackService';
import { SnackData } from '../services/types';

export const SnacksScreen = ({ navigation, route }: any) => {
  const { movieId, scheduleId, seats } = route.params || {};
  const [snacks, setSnacks] = useState<SnackData[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const data = await snackService.getAvailableSnacks();
        setSnacks(data);
      } catch (error) {
        console.error('Error fetching snacks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSnacks();
  }, []);

  const updateQuantity = (snackId: string, delta: number) => {
    setCart(prev => {
      const current = prev[snackId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [snackId]: next };
    });
  };

  const calculateTotal = () => {
    return snacks.reduce((sum, snack) => {
      const quantity = snack.id ? (cart[snack.id] || 0) : 0;
      return sum + (snack.price * quantity);
    }, 0);
  };

  const handleContinue = () => {
    const selectedSnacks = snacks
      .filter(s => s.id && cart[s.id] > 0)
      .map(s => ({ ...s, quantity: cart[s.id as string] }));
    
    navigation.navigate('Summary', { 
      movieId, 
      scheduleId, 
      seats, 
      snacks: selectedSnacks 
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dulcería</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.promoSection}>
          <Text style={styles.promoTitle}>¿Algo para picar?</Text>
          <Text style={styles.promoSubtitle}>Completa tu experiencia con nuestros mejores combos</Text>
        </View>

        {snacks.map((snack) => {
          const snackId = snack.id || Math.random().toString();
          return (
            <View key={snackId} style={styles.snackCard}>
              <Image source={{ uri: snack.imageUrl }} style={styles.snackImg} />
              <View style={styles.snackInfo}>
                <Text style={styles.snackName}>{snack.name}</Text>
                <Text style={styles.snackDesc} numberOfLines={2}>{snack.description}</Text>
                <Text style={styles.snackPrice}>${snack.price.toFixed(2)}</Text>
              </View>
              <View style={styles.counter}>
                <TouchableOpacity 
                  style={styles.counterBtn} 
                  onPress={() => updateQuantity(snackId, -1)}
                >
                  <Ionicons name="remove" size={20} color={colors.text} />
                </TouchableOpacity>
                <Text style={styles.counterText}>{cart[snackId] || 0}</Text>
                <TouchableOpacity 
                  style={styles.counterBtn} 
                  onPress={() => updateQuantity(snackId, 1)}
                >
                  <Ionicons name="add" size={20} color={colors.text} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>TOTAL DULCERÍA</Text>
          <Text style={styles.totalValue}>${calculateTotal().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.continueBtn} onPress={handleContinue}>
          <Text style={styles.continueBtnText}>Continuar</Text>
          <Ionicons name="arrow-forward" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.m,
    paddingVertical: spacing.s,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
  },
  backBtn: {
    padding: spacing.xs,
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    padding: spacing.m,
    paddingBottom: 120,
  },
  promoSection: {
    marginBottom: spacing.l,
  },
  promoTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: 'bold',
  },
  promoSubtitle: {
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 4,
  },
  snackCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.l,
    padding: spacing.m,
    marginBottom: spacing.m,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  snackImg: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.m,
  },
  snackInfo: {
    flex: 1,
    marginLeft: spacing.m,
  },
  snackName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  snackDesc: {
    color: colors.textSecondary,
    fontSize: 12,
    marginVertical: 4,
  },
  snackPrice: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: borderRadius.m,
    padding: 4,
  },
  counterBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: spacing.s,
    minWidth: 20,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(28,28,28,0.98)',
    padding: spacing.l,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: borderRadius.l,
    borderTopRightRadius: borderRadius.l,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  totalValue: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
  continueBtn: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    height: 56,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.m,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.s,
  },
  continueBtnText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
