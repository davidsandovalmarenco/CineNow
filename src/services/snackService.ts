import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import { SnackData } from './types';

export const snackService = {
  async getAvailableSnacks(): Promise<SnackData[]> {
    const snacksRef = collection(db, 'snacks');
    const q = query(snacksRef, where('available', '==', true));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as SnackData));
  },

  async getSnackById(snackId: string): Promise<SnackData | null> {
    const snackRef = doc(db, 'snacks', snackId);
    const snap = await getDoc(snackRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as SnackData;
    }
    return null;
  }
};
