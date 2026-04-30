import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from './firebase';

export const storageService = {
  async uploadProfilePhoto(userId: string, imageUri: string): Promise<string> {
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const photoRef = ref(storage, `profilePhotos/${userId}.jpg`);

    await uploadBytes(photoRef, blob, {
      contentType: blob.type || 'image/jpeg',
    });

    return getDownloadURL(photoRef);
  },
};
