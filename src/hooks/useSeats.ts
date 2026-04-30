import { useState } from 'react';
import { SeatStatus } from '../components/SeatItem';

export interface SeatData {
  id: string;
  label: string;
  status: SeatStatus;
}

export const useSeats = (scheduleId?: string) => {
  const [seats, setSeats] = useState<SeatData[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const fetchSeats = async () => {
    // Mock seat generation
    const mockSeats: SeatData[] = [];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 0; r < rows.length; r++) {
      for (let c = 1; c <= 8; c++) {
        const id = `${rows[r]}${c}`;
        // Randomly make some seats occupied
        const isOccupied = Math.random() > 0.8;
        mockSeats.push({
          id,
          label: id,
          status: isOccupied ? 'occupied' : 'available'
        });
      }
    }
    setSeats(mockSeats);
  };

  const toggleSeat = (id: string) => {
    setSeats(currentSeats => 
      currentSeats.map(seat => {
        if (seat.id === id && seat.status !== 'occupied') {
          const newStatus = seat.status === 'selected' ? 'available' : 'selected';
          
          // Update selectedSeats list
          if (newStatus === 'selected') {
            setSelectedSeats(prev => [...prev, id]);
          } else {
            setSelectedSeats(prev => prev.filter(sId => sId !== id));
          }
          
          return { ...seat, status: newStatus };
        }
        return seat;
      })
    );
  };

  return {
    seats,
    selectedSeats,
    fetchSeats,
    toggleSeat,
  };
};
