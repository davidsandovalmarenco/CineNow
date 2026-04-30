import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, Alert, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';

export const EditProfileScreen = ({ navigation }: any) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: user?.displayName || 'Alejandro Martínez',
    phone: '', 
    photoURL: user?.photoURL || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGBhUMDOv567pyGr2JSHYx1KR4Usx5xXCiBFJtCLWky_EtSlb-TXIf7jTGrZwBmGj6RuhP54LeKIFT1Il-KNnyCoofr_1LmhnGFe2Cvg5Kkpm7TyYxupv2rUeu6Z7slv--bm6B6eJc0nQWEg52ulL7XboURZlMfItf2PqVAq0CXXS3kXqiF3oX1LDQ_w9p6Y06qbhlRPUmYqss-Ut4D6lDcnu_lpzpxDZuyUTjHMEtEGqfL7DQuOan2zvuK9r-Nze3B6u3B_f4AFA',
  });

  const handleSave = async () => {
    if (!user) return;
    if (!formData.fullName.trim()) {
      Alert.alert('Error', 'El nombre no puede estar vacío');
      return;
    }

    setLoading(true);
    try {
      await userService.updateUser(user.uid, {
        fullName: formData.fullName,
        phone: formData.phone,
        photoURL: formData.photoURL,
      });

      Alert.alert('Éxito', 'Perfil actualizado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
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

      <BlurView intensity={80} tint="dark" style={styles.header}>
        <SafeAreaView>
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={24} color={colors.onSurface} />
            </TouchableOpacity>
            <Text style={[typography.h2, styles.headerTitle]}>Editar Perfil</Text>
            <View style={{ width: 40 }} />
          </View>
        </SafeAreaView>
      </BlurView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: formData.photoURL }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.changePhotoBtn} activeOpacity={0.8}>
              <Ionicons name="camera" size={20} color={colors.onPrimaryContainer} />
            </TouchableOpacity>
          </View>
          <Text style={[typography.bodyMd, styles.avatarHint]}>Toca la cámara para cambiar foto (vía URL)</Text>
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
                placeholder="+51 987 654 321"
                placeholderTextColor={colors.secondary}
                keyboardType="phone-pad"
                selectionColor={colors.primaryContainer}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={[typography.labelCaps, styles.label]}>URL DE FOTO DE PERFIL</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="image" size={20} color={colors.secondary} />
              <TextInput
                style={[typography.bodyLg, styles.input]}
                value={formData.photoURL}
                onChangeText={(text) => setFormData({ ...formData, photoURL: text })}
                placeholder="https://ejemplo.com/foto.jpg"
                placeholderTextColor={colors.secondary}
                autoCapitalize="none"
                selectionColor={colors.primaryContainer}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveBtn} 
          onPress={handleSave}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.onPrimaryContainer} />
          ) : (
            <>
              <Text style={styles.saveBtnText}>Guardar Cambios</Text>
            </>
          )}
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
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
  },
  scrollContent: {
    paddingTop: 100, // header space
    paddingHorizontal: spacing.containerMargin,
    paddingBottom: spacing.xxxl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
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
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
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
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  avatarHint: {
    color: colors.secondary,
    marginTop: spacing.md,
  },
  form: {
    gap: spacing.lg,
    marginBottom: spacing.xxl,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    color: colors.secondary,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(28, 28, 28, 0.6)', // glass-panel
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    height: 56,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: colors.primaryContainer,
    flexDirection: 'row',
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.s,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  saveBtnText: {
    color: colors.onPrimaryContainer,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
  },
});
