import { useState, useCallback } from 'react';
import { reservationService } from '../services/reservationService';
import { ReservationData } from '../services/types';

export const useReservations = () => {
  const [reservations, setReservations] = useState<ReservationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReservations = useCallback(async (userId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await reservationService.getUserReservations(userId);
      // Sort by creation date (newest first)
      const sorted = data.sort((a, b) => {
        const timeA = (a.createdAt as any)?.seconds || 0;
        const timeB = (b.createdAt as any)?.seconds || 0;
        return timeB - timeA;
      });
      setReservations(sorted);
    } catch (err: any) {
      console.error("Error fetching reservations:", err);
      setError(err.message || 'Error fetching reservations');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    reservations,
    isLoading,
    error,
    fetchReservations,
  };
};
