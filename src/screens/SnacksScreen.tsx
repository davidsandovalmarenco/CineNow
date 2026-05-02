import React, { useMemo, useState, useEffect } from 'react';
import { ImageSourcePropType, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { snackService } from '../services/snackService';
import { SnackData } from '../services/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { APP_NAME, formatCurrency } from '../config/locale';
import { RemoteImage } from '../components/RemoteImage';
import { SNACK_MENU } from '../data/snacks';

const DEFAULT_SNACK_IMAGE =
  'https://images.unsplash.com/photo-1585647347384-2593bc35786b?q=80&w=300&auto=format&fit=crop';
const DEFAULT_SNACK_ASSET = require('../../assets/snacks/combo-pareja.jpg') as ImageSourcePropType;

type SnackImageSource = {
  asset?: ImageSourcePropType;
  uri?: string;
};

const SNACK_IMAGES: Record<string, SnackImageSource> = {
  'combo-pareja': {
    asset: require('../../assets/snacks/combo-pareja.jpg') as ImageSourcePropType,
  },
  'combo-individual': {
    asset: require('../../assets/snacks/combo-individual.jpg') as ImageSourcePropType,
  },
  'combo-familiar': {
    asset: require('../../assets/snacks/combo-premium.jpg') as ImageSourcePropType,
  },
  'combo-premium-imax': {
    asset: require('../../assets/snacks/combo-premium.jpg') as ImageSourcePropType,
  },
  'hot-dog-premium': {
    asset: require('../../assets/snacks/hot-dog-premium.jpg') as ImageSourcePropType,
  },
  'nachos-cheddar': {
    asset: require('../../assets/snacks/nachos-cheddar.jpg') as ImageSourcePropType,
  },
  'soda-refill': {
    asset: require('../../assets/snacks/soda-refill.jpg') as ImageSourcePropType,
  },
  'candy-mix': {
    asset: require('../../assets/snacks/candy-mix.jpg') as ImageSourcePropType,
  },
};

const normalizeSnackKey = (value?: string) =>
  (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const getSnackImage = (snack: SnackData) => {
  const searchKey = `${normalizeSnackKey(snack.name)} ${normalizeSnackKey(snack.id)}`;

  if (searchKey.includes('premium') || searchKey.includes('imax')) return SNACK_IMAGES['combo-premium-imax'];
  if (searchKey.includes('familiar')) return SNACK_IMAGES['combo-familiar'];
  if (searchKey.includes('pareja')) return SNACK_IMAGES['combo-pareja'];
  if (searchKey.includes('individual')) return SNACK_IMAGES['combo-individual'];
  if (searchKey.includes('hot-dog') || searchKey.includes('hotdog')) return SNACK_IMAGES['hot-dog-premium'];
  if (searchKey.includes('nachos')) return SNACK_IMAGES['nachos-cheddar'];
  if (searchKey.includes('soda') || searchKey.includes('refill')) return SNACK_IMAGES['soda-refill'];
  if (searchKey.includes('candy') || searchKey.includes('dulce')) return SNACK_IMAGES['candy-mix'];

  return { uri: snack.imageUrl || DEFAULT_SNACK_IMAGE };
};

export const SnacksScreen = ({ navigation, route }: any) => {
  const { movie, movieId, scheduleId, selectedFormat, showtime, seats } = route.params || {};
  const [snacks, setSnacks] = useState<SnackData[]>([]);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets();

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

  const menuItems = useMemo(() => {
    const byName = new Map<string, SnackData>();

    const sourceSnacks = snacks.length > 0 ? snacks : SNACK_MENU;

    sourceSnacks.forEach((snack) => {
      const key = snack.name.toLowerCase().trim();
      if (!byName.has(key)) {
        byName.set(key, {
          ...snack,
          id: snack.id || normalizeSnackKey(snack.name),
        });
      }
    });

    return Array.from(byName.values()).sort((a, b) => {
      const order = [
        'combo pareja',
        'combo individual',
        'combo familiar',
        'combo premium imax',
        'hot dog premium',
        'nachos cheddar',
        'soda refill',
        'candy mix',
      ];
      const aIndex = order.indexOf(a.name.toLowerCase());
      const bIndex = order.indexOf(b.name.toLowerCase());
      if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
  }, [snacks]);

  const updateQuantity = (snackId: string, delta: number) => {
    setCart((prev) => {
      const current = prev[snackId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [snackId]: next };
    });
  };

  const calculateTotal = () =>
    menuItems.reduce((sum, snack) => {
      const quantity = snack.id ? cart[snack.id] || 0 : 0;
      return sum + snack.price * quantity;
    }, 0);

  const selectedCount = menuItems.reduce((sum, snack) => sum + (snack.id ? cart[snack.id] || 0 : 0), 0);

  const handleContinue = () => {
    const selectedSnacks = menuItems
      .filter((snack) => snack.id && cart[snack.id] > 0)
      .map((snack) => ({ ...snack, quantity: cart[snack.id as string] }));

    navigation.navigate('Summary', {
      movieId,
      movie,
      scheduleId,
      selectedFormat,
      showtime,
      seats,
      snacks: selectedSnacks,
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

      <BlurView intensity={80} tint="dark" style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
            </TouchableOpacity>
            <Ionicons name="film" size={24} color={colors.primaryContainer} />
            <Text style={[typography.h2, styles.logoText, { fontSize: 20 }]}>{APP_NAME}</Text>
          </View>
        </View>
      </BlurView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 86, paddingBottom: insets.bottom + 150 },
        ]}
      >
        <View style={styles.promoSection}>
          <Text style={[typography.h1, styles.promoTitle]}>Algo para picar?</Text>
          <Text style={[typography.bodyMd, styles.promoSubtitle]}>
            Completa tu experiencia con la dulceria de Centro Plaza Chinandega.
          </Text>
        </View>

        {menuItems.map((snack) => {
          const snackId = snack.id || normalizeSnackKey(snack.name);
          const quantity = cart[snackId] || 0;
          const snackImage = getSnackImage(snack);

          return (
            <View key={snackId} style={[styles.snackCard, quantity > 0 && styles.snackCardSelected]}>
              <RemoteImage
                uri={snackImage.uri}
                assetSource={snackImage.asset}
                fallbackUri={DEFAULT_SNACK_IMAGE}
                fallbackAssetSource={DEFAULT_SNACK_ASSET}
                style={styles.snackImg}
                resizeMode="cover"
              />

              <View style={styles.snackInfo}>
                <Text style={styles.snackName} numberOfLines={2}>{snack.name}</Text>
                <Text style={styles.snackDesc} numberOfLines={2}>{snack.description}</Text>
                <Text style={styles.snackPrice}>{formatCurrency(snack.price)}</Text>
              </View>

              <View style={styles.counter}>
                <TouchableOpacity
                  style={[styles.counterBtn, quantity === 0 && styles.counterBtnDisabled]}
                  onPress={() => updateQuantity(snackId, -1)}
                  disabled={quantity === 0}
                  hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                >
                  <Ionicons name="remove" size={20} color={colors.onSurface} />
                </TouchableOpacity>

                <Text style={styles.counterText}>{quantity}</Text>

                <TouchableOpacity
                  style={[styles.counterBtn, styles.counterBtnAdd]}
                  onPress={() => updateQuantity(snackId, 1)}
                  hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
                >
                  <Ionicons name="add" size={20} color={colors.onPrimaryContainer} />
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <BlurView intensity={80} tint="dark" style={[styles.footer, { paddingBottom: insets.bottom }]}>
        <View style={styles.footerContent}>
          <View style={styles.totalContainer}>
            <Text style={[typography.labelCaps, styles.totalLabel]}>TOTAL DULCERIA</Text>
            <Text style={[typography.h3, styles.totalValue]} numberOfLines={1} adjustsFontSizeToFit>
              {formatCurrency(calculateTotal())}
            </Text>
            <Text style={styles.totalItems}>{selectedCount} productos seleccionados</Text>
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={handleContinue} activeOpacity={0.9}>
            <Text style={styles.continueBtnText}>Continuar</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.onPrimaryContainer} />
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    paddingHorizontal: spacing.containerMargin,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  backButton: {
    marginRight: spacing.sm,
  },
  logoText: {
    color: colors.primaryContainer,
  },
  scrollContent: {
    paddingHorizontal: spacing.containerMargin,
  },
  promoSection: {
    marginBottom: spacing.lg,
  },
  promoTitle: {
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  promoSubtitle: {
    color: colors.onSurfaceVariant,
    maxWidth: 320,
  },
  snackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 112,
    backgroundColor: '#171717',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: spacing.md,
  },
  snackCardSelected: {
    borderColor: 'rgba(229, 9, 20, 0.65)',
    backgroundColor: '#211313',
  },
  snackImg: {
    width: 76,
    height: 76,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceContainer,
    flexShrink: 0,
  },
  snackInfo: {
    flex: 1,
    minWidth: 0,
  },
  snackName: {
    color: colors.onSurface,
    fontFamily: 'Be Vietnam Pro',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 22,
  },
  snackDesc: {
    color: colors.onSurfaceVariant,
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 3,
    marginBottom: 6,
  },
  snackPrice: {
    color: colors.primaryContainer,
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Inter',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: borderRadius.full,
    padding: 4,
    width: 110,
    justifyContent: 'space-between',
    flexShrink: 0,
  },
  counterBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
  },
  counterBtnAdd: {
    backgroundColor: colors.primaryContainer,
  },
  counterBtnDisabled: {
    opacity: 0.35,
  },
  counterText: {
    color: colors.onSurface,
    fontSize: 16,
    fontWeight: '800',
    minWidth: 24,
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
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: 'rgba(13, 13, 13, 0.9)',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.containerMargin,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  totalContainer: {
    flex: 1,
    minWidth: 0,
  },
  totalLabel: {
    color: colors.onSurfaceVariant,
    marginBottom: 4,
    fontSize: 10,
  },
  totalValue: {
    color: colors.onSurface,
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '800',
  },
  totalItems: {
    color: colors.onSurfaceVariant,
    fontFamily: 'Inter',
    fontSize: 11,
    marginTop: 2,
  },
  continueBtn: {
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
    minWidth: 132,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  continueBtnText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 16,
  },
});
