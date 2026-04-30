import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
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
        <ActivityIndicator size="large" color={colors.primaryContainer} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* Header */}
      <BlurView intensity={80} tint="dark" style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <View style={styles.logoContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: spacing.sm }}>
                <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
              </TouchableOpacity>
              <Ionicons name="film" size={24} color={colors.primaryContainer} />
              <Text style={[typography.h2, styles.logoText, { fontSize: 20 }]}>CineNow</Text>
            </View>
          </View>
        </SafeAreaView>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.promoSection}>
          <Text style={[typography.h1, styles.promoTitle]}>¿Algo para picar?</Text>
          <Text style={[typography.bodyMd, styles.promoSubtitle]}>Completa tu experiencia con nuestros mejores combos</Text>
        </View>

        {snacks.map((snack) => {
          const snackId = snack.id || Math.random().toString();
          return (
            <BlurView key={snackId} intensity={20} tint="dark" style={styles.snackCard}>
              <Image source={{ uri: snack.imageUrl }} style={styles.snackImg} />
              <View style={styles.snackInfo}>
                <Text style={[typography.h3, styles.snackName]}>{snack.name}</Text>
                <Text style={[typography.bodyMd, styles.snackDesc]} numberOfLines={2}>{snack.description}</Text>
                <Text style={styles.snackPrice}>${snack.price.toFixed(2)}</Text>
              </View>
              <View style={styles.counter}>
                <TouchableOpacity 
                  style={styles.counterBtn} 
                  onPress={() => updateQuantity(snackId, -1)}
                >
                  <Ionicons name="remove" size={20} color={colors.onSurface} />
                </TouchableOpacity>
                <Text style={styles.counterText}>{cart[snackId] || 0}</Text>
                <TouchableOpacity 
                  style={styles.counterBtn} 
                  onPress={() => updateQuantity(snackId, 1)}
                >
                  <Ionicons name="add" size={20} color={colors.onSurface} />
                </TouchableOpacity>
              </View>
            </BlurView>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <BlurView intensity={80} tint="dark" style={styles.footer}>
        <SafeAreaView>
          <View style={styles.footerContent}>
            <View style={styles.totalContainer}>
              <Text style={[typography.labelCaps, styles.totalLabel]}>TOTAL DULCERÍA</Text>
              <Text style={[typography.h2, styles.totalValue]}>${calculateTotal().toFixed(2)}</Text>
            </View>
            <TouchableOpacity 
              style={styles.continueBtn} 
              onPress={handleContinue}
              activeOpacity={0.9}
            >
              <Text style={styles.continueBtnText}>Continuar</Text>
              <Ionicons name="chevron-forward" size={20} color={colors.onPrimaryContainer} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
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
  scrollContent: {
    paddingTop: 100, // space for header
    paddingBottom: 160, // space for footer
    paddingHorizontal: spacing.containerMargin,
  },
  promoSection: {
    marginBottom: spacing.xl,
  },
  promoTitle: {
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  promoSubtitle: {
    color: colors.onSurfaceVariant,
  },
  snackCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(28, 28, 28, 0.4)',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  snackImg: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainer,
  },
  snackInfo: {
    flex: 1,
    marginLeft: spacing.md,
    justifyContent: 'center',
  },
  snackName: {
    color: colors.onSurface,
  },
  snackDesc: {
    color: colors.onSurfaceVariant,
    marginVertical: 4,
  },
  snackPrice: {
    color: colors.primaryContainer, // text-red-600
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: borderRadius.full,
    padding: 4,
  },
  counterBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
  },
  counterText: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: spacing.sm,
    minWidth: 20,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    color: colors.onSurfaceVariant,
    marginBottom: 4,
  },
  totalValue: {
    color: colors.onSurface,
  },
  continueBtn: {
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  continueBtnText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
});
