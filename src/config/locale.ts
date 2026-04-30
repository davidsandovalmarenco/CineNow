export const APP_NAME = 'CineNow Chinandega';
export const CINEMA_NAME = 'CineNow Centro Plaza';
export const CINEMA_LOCATION = 'Centro Plaza Chinandega, Nicaragua';
export const DEFAULT_ROOM = 'Sala 04';
export const DEFAULT_CINEMA_ID = 'centro-plaza-chinandega';
export const CURRENCY_SYMBOL = 'C$';

export const formatCurrency = (amount: number) => `${CURRENCY_SYMBOL}${amount.toFixed(2)}`;

export const formatReservationStatus = (status: string) => {
  if (status === 'active') return 'Activa';
  if (status === 'used') return 'Usada';
  if (status === 'cancelled') return 'Cancelada';
  return status;
};
