import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from './useAuth';
import { userService } from '../services/userService';

/**
 * Hook centralizado para cargar el perfil del usuario desde Firestore.
 * Se actualiza automáticamente cada vez que la pantalla obtiene el foco.
 * Prioriza photoURL de Firestore (soporta base64) sobre Firebase Auth.
 */
export function useProfile() {
  const { user } = useAuth();
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const displayName = fullName || user?.displayName || 'Usuario';
  const displayEmail = user?.email || '';

  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1f1f1f&color=ffffff&bold=true&size=256`;

  const avatarUri = photoURL || fallbackAvatar;

  const loadProfile = useCallback(async () => {
    if (!user?.uid) return;
    setIsLoading(true);
    try {
      const profile = await userService.getUser(user.uid);
      setPhotoURL(profile?.photoURL || user.photoURL || null);
      setFullName(profile?.fullName || user.displayName || '');
    } catch (error) {
      // Fallback a Firebase Auth si Firestore falla
      setPhotoURL(user.photoURL || null);
      setFullName(user.displayName || '');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Recarga el perfil cada vez que la pantalla obtiene el foco
  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [loadProfile])
  );

  return { avatarUri, displayName, displayEmail, photoURL, fullName, isLoading, reload: loadProfile };
}
