import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useAuth } from '../hooks/useAuth';

import { seedService } from '../services/seedService';
import { Alert, ActivityIndicator } from 'react-native';

export const ProfileScreen = ({ navigation }: any) => {
  const { user, logout } = useAuth();
  const [isSeeding, setIsSeeding] = React.useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedService.seedAll();
      Alert.alert('Éxito', 'Base de datos poblada correctamente. Reinicia la app para ver los cambios.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Error al poblar la base de datos');
    } finally {
      setIsSeeding(false);
    }
  };

  const displayName = user?.displayName || 'CineNow User';
  const displayEmail = user?.email || 'user@cinenow.com';
  const profileImage = user?.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGBhUMDOv567pyGr2JSHYx1KR4Usx5xXCiBFJtCLWky_EtSlb-TXIf7jTGrZwBmGj6RuhP54LeKIFT1Il-KNnyCoofr_1LmhnGFe2Cvg5Kkpm7TyYxupv2rUeu6Z7slv--bm6B6eJc0nQWEg52ulL7XboURZlMfItf2PqVAq0CXXS3kXqiF3oX1LDQ_w9p6Y06qbhlRPUmYqss-Ut4D6lDcnu_lpzpxDZuyUTjHMEtEGqfL7DQuOan2zvuK9r-Nze3B6u3B_f4AFA';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="film" size={24} color={colors.primary} />
          <Text style={styles.headerTitle}>CineNow</Text>
        </View>
        <View style={styles.profileBtn}>
          <Image source={{ uri: profileImage }} style={styles.headerProfileImg} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: profileImage }} style={styles.avatar} />
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('EditProfile')}>
              <Ionicons name="pencil" size={16} color={colors.text} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userEmail}>{displayEmail}</Text>
        </View>

        {/* Settings List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajustes</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('EditProfile')}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name="person-outline" size={20} color={colors.textSecondary} />
                </View>
                <Text style={styles.menuItemText}>Account</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => navigation.navigate('Notifications')}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name="notifications-outline" size={20} color={colors.textSecondary} />
                </View>
                <Text style={styles.menuItemText}>Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, styles.menuItemLast]}
              onPress={() => navigation.navigate('PaymentMethods')}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIconBox}>
                  <Ionicons name="card-outline" size={20} color={colors.textSecondary} />
                </View>
                <Text style={styles.menuItemText}>Payment Methods</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Admin/Debug Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Administración</Text>
          <TouchableOpacity 
            style={[styles.logoutBtn, { borderColor: colors.primary, backgroundColor: 'rgba(229,9,20,0.05)', marginBottom: spacing.m }]} 
            onPress={handleSeed}
            disabled={isSeeding}
          >
            {isSeeding ? (
              <ActivityIndicator color={colors.primary} />
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={20} color={colors.primary} />
                <Text style={styles.logoutText}>Poblar Base de Datos</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={colors.primary} />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

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
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
  },
  headerProfileImg: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    padding: spacing.m,
    paddingBottom: spacing.xxxl,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    marginTop: spacing.m,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.m,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.primary,
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
    backgroundColor: colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  userName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  section: {
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.m,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: spacing.m, // fallback if no sectionHeader
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: '#1C1C1C',
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.m,
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.s,
    backgroundColor: 'rgba(42, 22, 20, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  historyGrid: {
    gap: spacing.m,
  },
  historyCard: {
    backgroundColor: '#1C1C1C',
    padding: spacing.m,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    gap: spacing.m,
  },
  historyPoster: {
    width: 60,
    height: 90,
    borderRadius: borderRadius.s,
    overflow: 'hidden',
  },
  historyContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  historyTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  historyMeta: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  completedBadge: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  completedText: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  logoutBtn: {
    width: '100%',
    paddingVertical: spacing.l,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(229,9,20,0.2)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.s,
    marginTop: spacing.m,
    backgroundColor: 'rgba(229,9,20,0.05)',
  },
  logoutText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
