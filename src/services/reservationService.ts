import { collection, addDoc, getDocs, query, where, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { ReservationData } from './types';

export const reservationService = {
  async createReservation(data: Omit<ReservationData, 'createdAt' | 'id'>): Promise<string> {
    const reservationsRef = collection(db, 'reservations');
    const docRef = await addDoc(reservationsRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async getUserReservations(userId: string): Promise<ReservationData[]> {
    const reservationsRef = collection(db, 'reservations');
    const q = query(reservationsRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() } as ReservationData));
  },

  async getReservationById(reservationId: string): Promise<ReservationData | null> {
    const reservationRef = doc(db, 'reservations', reservationId);
    const snap = await getDoc(reservationRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as ReservationData;
    }
    return null;
  },

  async updateReservationStatus(reservationId: string, status: ReservationData['status']): Promise<void> {
    const reservationRef = doc(db, 'reservations', reservationId);
    await updateDoc(reservationRef, { status });
  },

  async getOccupiedSeats(scheduleId: string): Promise<string[]> {
    const reservationsRef = collection(db, 'reservations');
    const q = query(reservationsRef, where('scheduleId', '==', scheduleId));
    const snapshot = await getDocs(q);
    
    let occupiedSeats: string[] = [];
    snapshot.docs.forEach(docSnap => {
      const data = docSnap.data() as ReservationData;
      if (data.status !== 'cancelled' && Array.isArray(data.seats)) {
        occupiedSeats = [...occupiedSeats, ...data.seats];
      }
    });
    
    // Remove duplicates just in case
    return [...new Set(occupiedSeats)];
  }
};
