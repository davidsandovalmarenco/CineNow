import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';

export const NotificationsScreen = ({ navigation }: any) => {
  const notifications = [
    {
      id: '1',
      title: '¡Tu película empieza pronto!',
      message: 'Recuerda que tu función de "Duna: Parte Dos" comienza en 30 minutos.',
      time: 'Hace 5 min',
      icon: 'time',
      read: false,
    },
    {
      id: '2',
      title: 'Reserva Confirmada',
      message: 'Tu reserva (CR-8492-X09) ha sido procesada con éxito.',
      time: 'Hace 2 horas',
      icon: 'checkmark-circle',
      read: true,
    },
    {
      id: '3',
      title: 'Promoción de Martes',
      message: 'Aprovecha un 2x1 en entradas tradicionales mostrando este mensaje en taquilla.',
      time: 'Ayer',
      icon: 'pricetag',
      read: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {notifications.map((notif) => (
          <View key={notif.id} style={[styles.notifCard, !notif.read && styles.notifCardUnread]}>
            <View style={[styles.iconBox, !notif.read && styles.iconBoxUnread]}>
              <Ionicons name={notif.icon as any} size={24} color={!notif.read ? colors.text : colors.primary} />
            </View>
            <View style={styles.notifContent}>
              <Text style={styles.notifTitle}>{notif.title}</Text>
              <Text style={styles.notifMessage}>{notif.message}</Text>
              <Text style={styles.notifTime}>{notif.time}</Text>
            </View>
            {!notif.read && <View style={styles.unreadDot} />}
          </View>
        ))}
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
    paddingBottom: spacing.xxxl,
    gap: spacing.s,
  },
  notifCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(28,28,28,0.4)',
    padding: spacing.m,
    borderRadius: borderRadius.l,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  notifCardUnread: {
    backgroundColor: 'rgba(28,28,28,0.8)',
    borderColor: 'rgba(255,255,255,0.1)',
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(229,9,20,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.m,
  },
  iconBoxUnread: {
    backgroundColor: colors.primary,
  },
  notifContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notifTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  notifMessage: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  notifTime: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: spacing.s,
  },
});
