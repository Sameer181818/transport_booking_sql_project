
export enum Role {
  CUSTOMER = 'customer',
  OPERATOR = 'operator',
  ADMIN = 'admin',
}

export interface User {
  name: string;
  role: Role;
}

export enum SeatStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
  SELECTED = 'selected',
}

export interface Seat {
  id: string;
  status: SeatStatus;
}

export interface Trip {
  id: string;
  from: string;
  to: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
  totalSeats: number;
  seats: Seat[];
}

export interface Booking {
  id: string;
  tripId: string;
  userId: string;
  seatIds: string[];
  bookingTime: Date;
  totalPrice: number;
  tripDetails?: Trip;
}

export interface ToastMessage {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}
