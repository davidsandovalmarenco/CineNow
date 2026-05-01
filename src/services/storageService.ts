import * as ImageManipulator from 'expo-image-manipulator';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Redimensiona la imagen a 300x300, la comprime al 60% y la convierte a base64.
 * La guarda directamente en Firestore como data URI en el campo photoURL.
 * 
 * NOTA: Firebase Auth no acepta base64 como photoURL (límite de longitud),
 * por eso solo actualizamos Firestore. Las pantallas leen photoURL de Firestore primero.
 */
export const storageService = {
  async uploadProfilePhoto(userId: string, imageUri: string): Promise<string> {
    // 1. Redimensionar y comprimir la imagen
    const manipulated = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 300, height: 300 } }],
      {
        compress: 0.6,
        format: ImageManipulator.SaveFormat.JPEG,
        base64: true,
      }
    );

    if (!manipulated.base64) {
      throw new Error('No se pudo procesar la imagen');
    }

    // 2. Construir data URI
    const dataUri = `data:image/jpeg;base64,${manipulated.base64}`;

    // 3. Guardar SOLO en Firestore (Auth no soporta base64 como photoURL)
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { photoURL: dataUri });

    return dataUri;
  },
};
