import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, ActivityIndicator, Alert, StatusBar } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import { storageService } from '../services/storageService';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const EditProfileScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const insets = useSafeAreaInsets();
  const [formData, setFormData] = useState({
    fullName: user?.displayName || '',
    phone: '',
    photoURL: user?.photoURL || '',
  });

  const fallbackPhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.fullName || 'CineNow')}&background=1f1f1f&color=ffffff&bold=true&size=256`;

  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.uid) return;
      try {
        const profile = await userService.getUser(user.uid);
        setFormData({
          fullName: profile?.fullName || user.displayName || '',
          phone: profile?.phone || '',
          photoURL: profile?.photoURL || user.photoURL || '',
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    loadProfile();
  }, [user]);

  const handleChangePhoto = async () => {
    if (!user) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Necesitamos acceso a tus fotos para cambiar la foto de perfil.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled || !result.assets?.[0]?.uri) return;

    setUploadingPhoto(true);
    try {
      const downloadURL = await storageService.uploadProfilePhoto(user.uid, result.assets[0].uri);
      setFormData((current) => ({ ...current, photoURL: downloadURL }));
      await userService.updateUserProfile(user, {
        fullName: formData.fullName.trim() || user.displayName || 'Usuario CineNow',
        phone: formData.phone.trim(),
        photoURL: downloadURL,
      });
      await user.reload();
      Alert.alert('Listo', 'Foto de perfil actualizada.');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo subir la foto de perfil');
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    setLoading(true);
    try {
      await userService.updateUserProfile(user, {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        photoURL: formData.photoURL.trim(),
      });

      await user.reload();
      Alert.alert('Éxito', 'Perfil actualizado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <BlurView intensity={80} tint="dark" style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <Text style={[typography.h2, styles.headerTitle]}>Editar perfil</Text>
          <View style={{ width: 40 }} />
        </View>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scrollContent, { paddingTop: insets.top + 80, paddingBottom: insets.bottom + 90 }]}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: formData.photoURL || fallbackPhoto }} style={styles.avatar} />
            <TouchableOpacity
              style={styles.changePhotoBtn}
              onPress={handleChangePhoto}
              disabled={uploadingPhoto}
              activeOpacity={0.8}
            >
              {uploadingPhoto ? (
                <ActivityIndicator size="small" color={colors.onPrimaryContainer} />
              ) : (
                <Ionicons name="camera" size={20} color={colors.onPrimaryContainer} />
              )}
            </TouchableOpacity>
          </View>
          <Text style={[typography.bodyMd, styles.avatarHint]}>Toca la cámara para elegir una foto.</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[typography.labelCaps, styles.label]}>NOMBRE COMPLETO</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person" size={20} color={colors.secondary} />
              <TextInput
                style={[typography.bodyLg, styles.input]}
                value={formData.fullName}
                onChangeText={(text) => setFormData({ ...formData, fullName: text })}
                placeholder="Tu nombre"
                placeholderTextColor={colors.secondary}
                selectionColor={colors.primaryContainer}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[typography.labelCaps, styles.label]}>TELÉFONO</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call" size={20} color={colors.secondary} />
              <TextInput
                style={[typography.bodyLg, styles.input]}
                value={formData.phone}
                onChangeText={(text) => setFormData({ ...formData, phone: text })}
                placeholder="+505 8888 8888"
                placeholderTextColor={colors.secondary}
                keyboardType="phone-pad"
                selectionColor={colors.primaryContainer}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} disabled={loading} activeOpacity={0.8}>
          {loading ? (
            <ActivityIndicator color={colors.onPrimaryContainer} />
          ) : (
            <Text style={styles.saveBtnText}>Guardar cambios</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
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
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
  headerTitle: { color: '#fff', fontSize: 20 },
  scrollContent: { paddingHorizontal: spacing.containerMargin },
  avatarSection: { alignItems: 'center', marginBottom: spacing.xxxl },
  avatarWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    position: 'relative',
    borderWidth: 2,
    borderColor: colors.primaryContainer,
    padding: 4,
    backgroundColor: '#1C1C1C',
  },
  avatar: { width: '100%', height: '100%', borderRadius: 60 },
  changePhotoBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primaryContainer,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarHint: { color: colors.secondary, marginTop: spacing.md, textAlign: 'center' },
  form: { gap: spacing.lg, marginBottom: spacing.xxl },
  inputGroup: { gap: spacing.xs },
  label: { color: colors.secondary, marginLeft: 4 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 28, 28, 0.6)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: spacing.sm,
  },
  input: { flex: 1, color: '#fff' },
  saveBtn: {
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
});
