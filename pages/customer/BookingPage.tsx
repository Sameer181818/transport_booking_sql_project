import React, { useState, useMemo } from 'react';
import type { Trip, Seat } from '../../types';
import { SeatStatus } from '../../types';
import Modal from '../../components/Modal';
import { useToast } from '../../components/ToastProvider';
import { useTrips } from '../../App';

interface BookingPageProps {
  trip: Trip;
  onBack: () => void;
}

const SeatComponent: React.FC<{ 
    seat: Seat; 
    isSelected: boolean;
    onClick: (seatId: string) => void;
}> = ({ seat, isSelected, onClick }) => {
  const getSeatClasses = () => {
    if (seat.status === SeatStatus.BOOKED) {
      return 'bg-gray-900 border-gray-700 cursor-not-allowed';
    }
    if (isSelected) {
      return 'bg-sky-500 ring-2 ring-offset-2 ring-offset-gray-800 ring-sky-400';
    }
    return 'bg-gray-600 hover:bg-sky-500 cursor-pointer';
  };

  return (
    <div
      onClick={() => seat.status !== SeatStatus.BOOKED && onClick(seat.id)}
      className={`w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm transition-all duration-200 ${getSeatClasses()}`}
    >
      {seat.id}
    </div>
  );
};

const BookingPage: React.FC<BookingPageProps> = ({ trip, onBack }) => {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const { addToast } = useToast();
  const { bookSeats } = useTrips();

  const selectedSeats = useMemo(() => trip.seats.filter(s => selectedSeatIds.includes(s.id)), [trip.seats, selectedSeatIds]);
  const totalPrice = useMemo(() => selectedSeats.length * trip.price, [selectedSeats, trip.price]);

  const handleSeatClick = (seatId: string) => {
    setSelectedSeatIds(currentIds =>
      currentIds.includes(seatId)
        ? currentIds.filter(id => id !== seatId)
        : [...currentIds, seatId]
    );
  };
  
  const handleConfirmBooking = () => {
    bookSeats(trip.id, selectedSeatIds);
    setPaymentModalOpen(false);
    addToast('Booking successful! Your tickets are confirmed.', 'success');
    setSelectedSeatIds([]);
  };

  return (
    <div className="container mx-auto">
      <button onClick={onBack} className="mb-6 text-sky-400 hover:text-sky-300 font-semibold">&larr; Back to Trips</button>
      <div className="bg-gray-800 rounded-lg shadow-xl p-4 md:p-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Select Your Seats</h2>
          <div className="bg-gray-900 p-6 rounded-lg">
             <div className="grid grid-cols-4 gap-4 max-w-xs mx-auto">
                {trip.seats.map(seat => <SeatComponent 
                    key={seat.id} 
                    seat={seat} 
                    isSelected={selectedSeatIds.includes(seat.id)}
                    onClick={handleSeatClick} />
                )}
            </div>
            <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-gray-700">
                <div className="flex items-center"><div className="w-4 h-4 bg-gray-600 rounded-sm mr-2"></div><span className="text-sm">Available</span></div>
                <div className="flex items-center"><div className="w-4 h-4 bg-sky-500 rounded-sm mr-2"></div><span className="text-sm">Selected</span></div>
                <div className="flex items-center"><div className="w-4 h-4 bg-gray-900 border border-gray-700 rounded-sm mr-2"></div><span className="text-sm">Booked</span></div>
            </div>
          </div>
        </div>

        <div className="md:col-span-1 bg-gray-900/50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-3">Booking Summary</h3>
          <div className="space-y-2 mb-4">
            <p><strong>From:</strong> {trip.from}</p>
            <p><strong>To:</strong> {trip.to}</p>
            <p><strong>Departure:</strong> {trip.departureTime.toLocaleString()}</p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <h4 className="font-semibold mb-2">Selected Seats ({selectedSeats.length})</h4>
            {selectedSeats.length > 0 ? (
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedSeats.map(s => <span key={s.id} className="bg-sky-500 text-white text-xs font-bold px-2 py-1 rounded">{s.id}</span>)}
                </div>
            ) : (
                <p className="text-gray-400 text-sm">No seats selected.</p>
            )}
             <div className="text-2xl font-bold mt-4">
                Total: <span className="text-sky-400">${totalPrice.toFixed(2)}</span>
            </div>
            <button
                onClick={() => setPaymentModalOpen(true)}
                disabled={selectedSeats.length === 0}
                className="w-full mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed"
            >
                Proceed to Payment
            </button>
          </div>
        </div>
      </div>
       <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title="Confirm & Pay"
      >
        <div>
          <p className="text-gray-300 mb-4">You are about to book {selectedSeats.length} seat(s) for a total of <strong className="text-sky-400">${totalPrice.toFixed(2)}</strong>.</p>
          <p className="text-sm text-gray-500 mb-6">This is a simulated payment process. No real payment will be made.</p>
          <div className="flex justify-end space-x-4">
            <button onClick={() => setPaymentModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">Cancel</button>
            <button onClick={handleConfirmBooking} className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-colors">Confirm Booking</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingPage;