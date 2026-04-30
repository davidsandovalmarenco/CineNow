import { FieldValue } from 'firebase/firestore';

export interface UserData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  photoURL?: string;
  role: 'client' | 'admin';
  notificationSettings?: NotificationSettings;
  paymentMethods?: PaymentMethod[];
  createdAt: FieldValue | Date;
}

export interface NotificationSettings {
  reservationUpdates: boolean;
  movieReminders: boolean;
  promotions: boolean;
  emailNotifications: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex' | 'other';
  last4: string;
  expiry: string;
  cardholder: string;
  isDefault: boolean;
  createdAt?: FieldValue | Date;
}

export interface MovieData {
  id?: string;
  title: string;
  genre: string;
  duration: string;
  rating: number;
  classification: string;
  synopsis: string;
  posterUrl: string;
  bannerUrl: string;
  status: 'now_showing' | 'coming_soon' | 'popular';
  createdAt: FieldValue | Date;
}

export interface CinemaData {
  id?: string;
  name: string;
  city: string;
  address: string;
  createdAt: FieldValue | Date;
}

export interface ScheduleData {
  id?: string;
  movieId: string;
  cinemaId: string;
  date: string;
  time: string;
  room: string;
  format: '2D' | '3D' | 'VIP';
  language: 'Doblada' | 'Subtitulada';
  price: number;
  createdAt: FieldValue | Date;
}

export interface SnackItem {
  snackId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ReservationData {
  id?: string;
  userId: string;
  movieId: string;
  movieTitle?: string;
  moviePosterUrl?: string;
  movieFormat?: string;
  showtimeLabel?: string;
  room?: string;
  cinemaId: string;
  scheduleId: string;
  seats: string[];
  snacks: SnackItem[];
  subtotal: number;
  total: number;
  status: 'active' | 'used' | 'cancelled';
  reservationCode: string;
  createdAt: FieldValue | Date;
}

export interface SnackData {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  createdAt: FieldValue | Date;
}
