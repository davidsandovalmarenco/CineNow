import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RECENT_MOVIES } from '../data/recentMovies';
import { APP_NAME, CINEMA_LOCATION } from '../config/locale';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const { avatarUri, displayName, fullName, displayEmail } = useProfile();
  const insets = useSafeAreaInsets();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
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
          <View style={styles.headerProfileBtn}>
            <Image source={{ uri: avatarUri }} style={styles.headerProfileImg} />
          </View>
        </View>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 90 }]}>
        
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: avatarUri }} style={styles.avatar} />
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')} activeOpacity={0.8}>
              <Ionicons name="pencil" size={20} color={colors.onPrimaryContainer} />
            </TouchableOpacity>
          </View>
          <Text style={[typography.h2, styles.userName]}>{displayName}</Text>
          <Text style={[typography.bodyMd, styles.userEmail]}>{displayEmail}</Text>
        </View>

        {/* Settings List */}
        <View style={styles.section}>
          <Text style={[typography.h3, styles.sectionTitle]}>Ajustes</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('EditProfile')}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name="person" size={20} color={colors.secondary} />
                </View>
                <Text style={[typography.bodyLg, styles.menuItemText]}>Cuenta</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Notifications')}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name="notifications" size={20} color={colors.secondary} />
                </View>
                <Text style={[typography.bodyLg, styles.menuItemText]}>Notificaciones</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, styles.menuItemLast]}
              onPress={() => navigation.navigate('PaymentMethods')}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name="card" size={20} color={colors.secondary} />
                </View>
                <Text style={[typography.bodyLg, styles.menuItemText]}>Métodos de pago</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.secondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* History Overview Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[typography.h3, styles.sectionTitle]}>Historial reciente</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.historyGrid}>
            <View style={styles.historyCard}>
              <View style={styles.historyPoster}>
                <Image 
                  source={{ uri: RECENT_MOVIES.fantasticFour.posterUrl }} 
                  style={{ width: '100%', height: '100%' }} 
                />
              </View>
              <View style={styles.historyContent}>
                <View>
                  <Text style={[typography.bodyLg, styles.historyTitle]} numberOfLines={1}>{RECENT_MOVIES.fantasticFour.title}</Text>
                  <Text style={[typography.bodyMd, styles.historyMeta]}>14 oct. 2023 - {CINEMA_LOCATION}</Text>
                </View>
                <View style={styles.completedBadge}>
                  <Text style={[typography.labelCaps, styles.completedText]}>COMPLETADO</Text>
                </View>
              </View>
            </View>

            <View style={styles.historyCard}>
              <View style={styles.historyPoster}>
                <Image 
                  source={{ uri: RECENT_MOVIES.missionImpossible.posterUrl }} 
                  style={{ width: '100%', height: '100%' }} 
                />
              </View>
              <View style={styles.historyContent}>
                <View>
                  <Text style={[typography.bodyLg, styles.historyTitle]} numberOfLines={1}>{RECENT_MOVIES.missionImpossible.title}</Text>
                  <Text style={[typography.bodyMd, styles.historyMeta]}>28 sep. 2023 - IMAX</Text>
                </View>
                <View style={styles.completedBadge}>
                  <Text style={[typography.labelCaps, styles.completedText]}>COMPLETADO</Text>
                </View>
              </View>
            </View>
          </View>
        </View>



        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out" size={20} color={colors.primaryContainer} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
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
  headerProfileBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  headerProfileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: spacing.containerMargin,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.md,
  },
  avatarWrapper: {
    width: 128, // w-32
    height: 128, // h-32
    borderRadius: 64,
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    padding: 4,
    backgroundColor: '#1C1C1C',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  editBtn: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: colors.primaryContainer,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  userName: {
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    color: colors.secondary, // zinc-500
  },
  section: {
    marginBottom: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: '#fff',
    marginBottom: spacing.md, // fallback if no sectionHeader
  },
  seeAllText: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceContainer,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    color: '#e5e2e1', // secondary-fixed
    fontFamily: 'Inter',
  },
  historyGrid: {
    gap: spacing.md,
  },
  historyCard: {
    backgroundColor: '#1C1C1C',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    gap: spacing.md,
  },
  historyPoster: {
    width: 80, // w-20
    height: 120, // aspect-[2/3] roughly
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  historyContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  historyTitle: {
    color: '#fff',
    marginBottom: 4,
  },
  historyMeta: {
    color: colors.secondary, // zinc-500
  },
  completedBadge: {
    backgroundColor: colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  completedText: {
    color: colors.secondary, // zinc-400
  },
  logoutBtn: {
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(229, 9, 20, 0.2)', // red-600/20
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'transparent', // removed red background to match mockup just border
  },
  logoutText: {
    color: colors.primaryContainer,
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
  },
});
