import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import { NotificationSettings } from '../services/types';

const DEFAULT_SETTINGS: NotificationSettings = {
  reservationUpdates: true,
  movieReminders: true,
  promotions: true,
  emailNotifications: false,
};

export const NotificationsScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const [settings, setSettings] = useState<NotificationSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }

      try {
        const data = await userService.getNotificationSettings(user.uid);
        setSettings(data);
      } catch (error) {
        console.error('Error loading notification settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user?.uid]);

  const toggleSetting = async (key: keyof NotificationSettings) => {
    if (!user?.uid) return;

    const nextSettings = { ...settings, [key]: !settings[key] };
    setSettings(nextSettings);
    setSaving(true);

    try {
      await userService.updateNotificationSettings(user.uid, nextSettings);
    } catch (error: any) {
      setSettings(settings);
      Alert.alert('Error', error.message || 'No se pudieron guardar las notificaciones');
    } finally {
      setSaving(false);
    }
  };

  const notificationCards = [
    {
      id: '1',
      title: 'Reserva confirmada',
      message: settings.reservationUpdates
        ? 'Recibirás avisos cuando una reserva se confirme o cambie de estado.'
        : 'Los avisos de reservas están desactivados.',
      icon: 'checkmark-circle',
      active: settings.reservationUpdates,
    },
    {
      id: '2',
      title: 'Recordatorios de funciones',
      message: settings.movieReminders
        ? 'Te avisaremos antes de que empiece tu película.'
        : 'No enviaremos recordatorios antes de la función.',
      icon: 'time',
      active: settings.movieReminders,
    },
    {
      id: '3',
      title: 'Promociones',
      message: settings.promotions
        ? 'Recibirás promociones y descuentos disponibles.'
        : 'Las promociones están silenciadas para tu usuario.',
      icon: 'pricetag',
      active: settings.promotions,
    },
  ];

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
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}>
        <View style={styles.settingsCard}>
          <NotificationToggle
            label="Actualizaciones de reserva"
            value={settings.reservationUpdates}
            onChange={() => toggleSetting('reservationUpdates')}
          />
          <NotificationToggle
            label="Recordatorios de película"
            value={settings.movieReminders}
            onChange={() => toggleSetting('movieReminders')}
          />
          <NotificationToggle
            label="Promociones"
            value={settings.promotions}
            onChange={() => toggleSetting('promotions')}
          />
          <NotificationToggle
            label="Enviar también por correo"
            value={settings.emailNotifications}
            onChange={() => toggleSetting('emailNotifications')}
            last
          />
        </View>

        {saving && <Text style={styles.savingText}>Guardando cambios...</Text>}

        {notificationCards.map((notif) => (
          <View key={notif.id} style={[styles.notifCard, notif.active && styles.notifCardUnread]}>
            <View style={[styles.iconBox, notif.active && styles.iconBoxUnread]}>
              <Ionicons name={notif.icon as any} size={24} color={notif.active ? colors.text : colors.primary} />
            </View>
            <View style={styles.notifContent}>
              <Text style={styles.notifTitle}>{notif.title}</Text>
              <Text style={styles.notifMessage}>{notif.message}</Text>
            </View>
            {notif.active && <View style={styles.unreadDot} />}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const NotificationToggle = ({ label, value, onChange, last }: { label: string; value: boolean; onChange: () => void; last?: boolean }) => (
  <View style={[styles.toggleRow, last && styles.toggleRowLast]}>
    <Text style={styles.toggleLabel}>{label}</Text>
    <Switch
      value={value}
      onValueChange={onChange}
      thumbColor={value ? colors.primary : colors.textSecondary}
      trackColor={{ false: 'rgba(255,255,255,0.12)', true: 'rgba(229,9,20,0.45)' }}
    />
  </View>
);

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
  scrollContent: { padding: spacing.m, gap: spacing.s },
  settingsCard: {
    backgroundColor: 'rgba(28,28,28,0.45)',
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    marginBottom: spacing.m,
  },
  toggleRow: {
    minHeight: 58,
    paddingHorizontal: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  toggleRowLast: { borderBottomWidth: 0 },
  toggleLabel: { color: colors.text, fontSize: 15, fontWeight: '600' },
  savingText: { color: colors.textSecondary, fontSize: 12, marginBottom: spacing.s },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(28,28,28,0.4)',
    padding: spacing.m,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  notifCardUnread: { backgroundColor: 'rgba(28,28,28,0.8)', borderColor: 'rgba(255,255,255,0.1)' },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(229,9,20,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  iconBoxUnread: { backgroundColor: colors.primary },
  notifContent: { flex: 1, justifyContent: 'center' },
  notifTitle: { color: colors.text, fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  notifMessage: { color: colors.textSecondary, fontSize: 14, lineHeight: 20 },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginTop: spacing.s },
});
