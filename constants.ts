
import type { Trip, Seat } from './types';
import { SeatStatus } from './types';

const generateSeats = (count: number): Seat[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `S${i + 1}`,
    status: Math.random() > 0.7 ? SeatStatus.BOOKED : SeatStatus.AVAILABLE,
  }));
};

export const MOCK_TRIPS: Trip[] = [
  {
    id: 'TRIP001',
    from: 'New York, NY',
    to: 'Boston, MA',
    departureTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000),
    arrivalTime: new Date(new Date().getTime() + 6 * 60 * 60 * 1000),
    price: 75.50,
    totalSeats: 40,
    seats: generateSeats(40),
  },
  {
    id: 'TRIP002',
    from: 'Los Angeles, CA',
    to: 'San Francisco, CA',
    departureTime: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
    arrivalTime: new Date(new Date().getTime() + 10 * 60 * 60 * 1000),
    price: 90.00,
    totalSeats: 40,
    seats: generateSeats(40),
  },
  {
    id: 'TRIP003',
    from: 'Chicago, IL',
    to: 'Denver, CO',
    departureTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    arrivalTime: new Date(new Date().getTime() + 36 * 60 * 60 * 1000),
    price: 150.25,
    totalSeats: 40,
    seats: generateSeats(40),
  },
  {
    id: 'TRIP004',
    from: 'Miami, FL',
    to: 'Orlando, FL',
    departureTime: new Date(new Date().getTime() + 26 * 60 * 60 * 1000),
    arrivalTime: new Date(new Date().getTime() + 30 * 60 * 60 * 1000),
    price: 45.00,
    totalSeats: 40,
    seats: generateSeats(40),
  },
];

export const MOCK_ROUTES_FOR_AI = [
    { from: "New York, NY", to: "Boston, MA", departures: ["08:00", "12:00", "16:00"] },
    { from: "Los Angeles, CA", to: "San Francisco, CA", departures: ["09:00", "13:00", "17:00"] },
    { from: "Chicago, IL", to: "Minneapolis, MN", departures: ["07:30", "11:30", "15:30"] },
    { from: "Houston, TX", to: "Dallas, TX", departures: ["10:00", "14:00", "18:00"] },
];
