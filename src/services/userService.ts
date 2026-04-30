import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { UserData } from './types';

const COLLECTION_NAME = 'users';

export const userService = {
  async createUser(userId: string, data: Omit<UserData, 'createdAt' | 'id'>): Promise<void> {
    const userRef = doc(db, COLLECTION_NAME, userId);
    await setDoc(userRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  },

  async getUser(userId: string): Promise<UserData | null> {
    const userRef = doc(db, COLLECTION_NAME, userId);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as UserData;
    }
    return null;
  },

  async updateUser(userId: string, data: Partial<UserData>): Promise<void> {
    const userRef = doc(db, COLLECTION_NAME, userId);
    await updateDoc(userRef, data as any);
  }
};
