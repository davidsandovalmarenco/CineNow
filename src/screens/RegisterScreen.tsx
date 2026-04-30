import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing, borderRadius } from '../theme/spacing';
import { typography } from '../theme/typography';
import { AppInput } from '../components/AppInput';
import { AppButton } from '../components/AppButton';
import { useAuth } from '../hooks/useAuth';
import { APP_NAME, CINEMA_LOCATION } from '../config/locale';

const REGISTER_BG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6Fz9LlWbzqy0yjWrmT8hxICNJdvntknaR1Fr3bL1cd7OfcWAnJKuCVaPdb_70UyssqLkBfQEnOw8wGdphasEwiPIuYGUBHh_PKOmRqsikZ1aVfCtJh1UtYcYNDLCbB6142hdNoulZ7L5tN9UCjOGUJOzCwtsI_XwHNEI-feMUrj5hfptviWR7BoUweb-pza5Xrpow3xF59jZk9AtWYPnHXDPWxXKShr3HDupR5Rsd20C8qWFnMIY-Oh3rakEpPsBPZMsyBYXZuTE';

export const RegisterScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { register, error: authError, isLoading } = useAuth();
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    setError('');
    await register({ email, password, name: fullName });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: REGISTER_BG_URL }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.15 }}
      >
        <LinearGradient
          colors={['rgba(229, 9, 20, 0.15)', 'transparent', 'rgba(229, 9, 20, 0.05)', colors.background]}
          locations={[0, 0.4, 0.8, 1]}
          style={styles.gradient}
        />
        
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <ScrollView 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              
              <View style={styles.topBar}>
                <View style={styles.logoContainer}>
                  <Ionicons name="film" size={24} color={colors.primaryContainer} />
                  <Text style={[typography.h2, styles.logoText]}>{APP_NAME}</Text>
                </View>
                <View style={styles.userIconBox}>
                  <Ionicons name="person" size={16} color={colors.secondary} />
                </View>
              </View>

              <View style={styles.headerContainer}>
                <Text style={[typography.h1, styles.title]}>Crear cuenta</Text>
                <Text style={[typography.bodyMd, styles.subtitle]}>
                  Crea tu cuenta para reservar en {CINEMA_LOCATION}.
                </Text>
              </View>

              <BlurView intensity={20} tint="dark" style={styles.glassPanel}>
                <View style={styles.formContainer}>
                  
                  <AppInput
                    label="Nombre completo"
                    placeholder="Ej. Juan Pérez"
                    value={fullName}
                    onChangeText={setFullName}
                    leftIcon={<Ionicons name="person" size={20} color={colors.secondary} />}
                  />

                  <AppInput
                    label="Correo electrónico"
                    placeholder="nombre@ejemplo.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    leftIcon={<Ionicons name="mail" size={20} color={colors.secondary} />}
                  />
                  
                  <AppInput
                    label="Contraseña"
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    leftIcon={<Ionicons name="lock-closed" size={20} color={colors.secondary} />}
                    rightIcon={
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color={colors.secondary} />
                      </TouchableOpacity>
                    }
                  />

                  <AppInput
                    label="Confirmar contraseña"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword}
                    error={error || authError || ''}
                    leftIcon={<Ionicons name="lock-closed" size={20} color={error || authError ? colors.error : colors.secondary} />}
                  />

                  <TouchableOpacity 
                    style={styles.termsContainer}
                    onPress={() => setAcceptedTerms(!acceptedTerms)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.checkbox, acceptedTerms && styles.checkboxActive]}>
                      {acceptedTerms && <Ionicons name="checkmark" size={14} color={colors.onPrimaryContainer} />}
                    </View>
                    <Text style={styles.termsText}>
                      Acepto los <Text style={styles.termsLink}>Términos de servicio</Text> y la <Text style={styles.termsLink}>Política de privacidad</Text> de {APP_NAME}.
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.actionsContainer}>
                    <AppButton title={isLoading ? "Cargando..." : "Crear cuenta"} onPress={handleRegister} disabled={!acceptedTerms || isLoading} />

                    <View style={styles.dividerContainer}>
                      <View style={styles.dividerLine} />
                      <Text style={[typography.labelCaps, styles.dividerText]}>O REGÍSTRATE CON</Text>
                      <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialButtonsContainer}>
                      <AppButton 
                        title="Google" 
                        variant="secondary" 
                        onPress={() => {}} 
                        style={styles.socialButton}
                      />
                      <AppButton 
                        title="Apple" 
                        variant="secondary" 
                        onPress={() => {}} 
                        style={styles.socialButton}
                      />
                    </View>
                  </View>
                  
                </View>
              </BlurView>

              <View style={styles.footerContainer}>
                <Text style={[typography.bodyMd, styles.footerText]}>
                  ¿Ya tienes una cuenta?{' '}
                  <Text 
                    style={styles.footerLink} 
                    onPress={() => navigation.navigate('Login')}
                  >
                    Inicia sesión
                  </Text>
                </Text>
              </View>

            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.containerMargin,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoText: {
    color: colors.primaryContainer,
  },
  userIconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainerHighest,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    color: colors.onSurface,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.secondary,
    textAlign: 'center',
  },
  glassPanel: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  formContainer: {
    padding: spacing.lg,
    backgroundColor: 'rgba(28, 28, 28, 0.7)',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginVertical: spacing.sm,
    paddingRight: spacing.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxActive: {
    backgroundColor: colors.primaryContainer,
    borderColor: colors.primaryContainer,
  },
  termsText: {
    flex: 1,
    fontSize: 12,
    color: colors.secondary,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primaryContainer,
  },
  actionsContainer: {
    marginTop: spacing.md,
    gap: spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: spacing.md,
    backgroundColor: '#1C1C1C', // Mockup has bg for this text
    paddingHorizontal: spacing.xs,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
    height: 48,
  },
  footerContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: colors.secondary,
  },
  footerLink: {
    color: colors.primaryContainer,
    fontWeight: '600',
  },
});
