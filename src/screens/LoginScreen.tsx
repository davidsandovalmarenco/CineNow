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

const LOGIN_BG_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUm40hUHGjdHQG4CgTyuFPWt4jC3gXmfxzFIQBBxF9S4myd02h6EIFkA89DXjq1SIgvfawtCC7Wn0wEto7J38uUbbKFiCQPChC6EHf7Ieyp6Koi6riW_6JFcJo9vdHJICg8ypOTZwuTPUhS0fRq8LzXPtLjroSNJrZko8XEG8UTApf53UvCuOnGp4MkP6QO7NEU_aDlZ4uSireuUFxE5XQrkkftU5P_iYdWZZ5ipJ7vzzENmEXuZI72JcN4lLiv3tKhgTCLQWI8ZA';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, error: authError, isLoading } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, ingresa tu correo y contraseña.');
      return;
    }
    setError('');
    await login({ email, password });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: LOGIN_BG_URL }}
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.4 }}
      >
        <LinearGradient
          colors={['transparent', 'rgba(13, 13, 13, 0.6)', colors.background]}
          locations={[0, 0.5, 1]}
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
              
              <View style={styles.headerContainer}>
                <View style={styles.iconBox}>
                  <Ionicons name="film" size={32} color={colors.onPrimaryContainer} />
                </View>
                <Text style={[typography.h1, styles.title]}>{APP_NAME}</Text>
                <Text style={[typography.bodyMd, styles.subtitle]}>
                  Disfruta la cartelera de {CINEMA_LOCATION}.
                </Text>
              </View>

              <BlurView intensity={20} tint="dark" style={styles.glassPanel}>
                <View style={styles.formContainer}>
                  
                  <AppInput
                    label="CORREO ELECTRÓNICO"
                    placeholder="ejemplo@cine.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    leftIcon={<Ionicons name="mail" size={20} color={colors.secondary} />}
                  />

                  <View style={styles.passwordHeader}>
                    <Text style={[typography.labelCaps, styles.passwordLabel, error ? { color: colors.error } : null]}>
                      CONTRASEÑA
                    </Text>
                    <TouchableOpacity>
                      <Text style={[typography.labelCaps, styles.forgotText]}>¿Olvidaste la contraseña?</Text>
                    </TouchableOpacity>
                  </View>
                  
                  <AppInput
                    placeholder="********"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    error={error || authError || ''}
                    leftIcon={<Ionicons name="lock-closed" size={20} color={error || authError ? colors.error : colors.secondary} />}
                    rightIcon={
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color={colors.secondary} />
                      </TouchableOpacity>
                    }
                  />

                  <View style={styles.actionsContainer}>
                    <AppButton title={isLoading ? "Cargando..." : "Iniciar sesión"} onPress={handleLogin} disabled={isLoading} />

                    <View style={styles.dividerContainer}>
                      <View style={styles.dividerLine} />
                      <Text style={[typography.labelCaps, styles.dividerText]}>O CONTINUAR CON</Text>
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
                  ¿No tienes una cuenta?{' '}
                  <Text 
                    style={styles.footerLink} 
                    onPress={() => navigation.navigate('Register')}
                  >
                    Crear cuenta
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
    backgroundColor: '#0D0D0D', // Specific background from mockup
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
    justifyContent: 'center',
    padding: spacing.containerMargin,
    paddingVertical: spacing.xl,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primaryContainer,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    shadowColor: colors.primaryContainer,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
  },
  title: {
    color: colors.onPrimaryContainer,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.secondary,
    textAlign: 'center',
    maxWidth: 280,
  },
  glassPanel: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  formContainer: {
    padding: spacing.lg,
    backgroundColor: 'rgba(28, 28, 28, 0.7)', // Fallback for BlurView
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: spacing.xs,
    marginLeft: 4,
  },
  passwordLabel: {
    color: colors.secondary,
  },
  forgotText: {
    color: colors.primary,
    textTransform: 'none',
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.4)', // zinc-600
    marginHorizontal: spacing.md,
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
    marginTop: spacing.lg,
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
