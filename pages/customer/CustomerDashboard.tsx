import React, { useState, useMemo } from 'react';
import type { Trip } from '../../types';
import BookingPage from './BookingPage';
import { useTrips } from '../../App';

const TripCard: React.FC<{ trip: Trip, onBook: (trip: Trip) => void }> = ({ trip, onBook }) => {
  const { from, to, departureTime, arrivalTime, price, seats } = trip;
  const availableSeats = seats.filter(s => s.status === 'available').length;
  
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg hover:shadow-sky-500/20 hover:border-sky-500 transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-white">{from} &rarr; {to}</h3>
          <p className="text-sm text-gray-400">
            {departureTime.toLocaleString()} - {arrivalTime.toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-sky-400">${price.toFixed(2)}</p>
          <p className="text-sm text-gray-400">{availableSeats} seats available</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-700 flex justify-end">
        <button
          onClick={() => onBook(trip)}
          className="bg-sky-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-sky-600 transition-colors duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={availableSeats === 0}
        >
          {availableSeats > 0 ? 'Book Now' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
};

const CustomerDashboard: React.FC = () => {
  const { trips } = useTrips();
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedTrip = useMemo(() => trips.find(t => t.id === selectedTripId) || null, [trips, selectedTripId]);

  const filteredTrips = useMemo(() => {
    return trips.filter(trip =>
      trip.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.to.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [trips, searchTerm]);
  
  const handleBackToList = () => {
    setSelectedTripId(null);
  };
  
  const handleBook = (trip: Trip) => {
    setSelectedTripId(trip.id);
  }

  if (selectedTrip) {
    return <BookingPage trip={selectedTrip} onBack={handleBackToList} />;
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-white">Find a Trip</h2>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by city (e.g., 'New York' or 'Boston')"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </div>
      
      {filteredTrips.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} onBook={handleBook} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-gray-400">No trips found for your search.</p>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;