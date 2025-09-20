import React, { useState, useCallback, useMemo, useContext, ReactNode } from 'react';
import type { User, Role, Trip } from './types';
import { SeatStatus } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { MOCK_TRIPS } from './constants';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: Role) => {
    setUser({ name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`, role });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// --- Trip Context ---
interface TripContextType {
    trips: Trip[];
    bookSeats: (tripId: string, seatIds: string[]) => void;
}

const TripContext = React.createContext<TripContextType | null>(null);

export const useTrips = () => {
    const context = useContext(TripContext);
    if (!context) {
        throw new Error('useTrips must be used within a TripProvider');
    }
    return context;
};

const TripProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [trips, setTrips] = useState<Trip[]>(MOCK_TRIPS);

    const bookSeats = useCallback((tripId: string, seatIds: string[]) => {
        setTrips(currentTrips => {
            return currentTrips.map(trip => {
                if (trip.id === tripId) {
                    const newSeats = trip.seats.map(seat => {
                        if (seatIds.includes(seat.id)) {
                            return { ...seat, status: SeatStatus.BOOKED };
                        }
                        return seat;
                    });
                    return { ...trip, seats: newSeats };
                }
                return trip;
            });
        });
    }, []);

    const value = useMemo(() => ({ trips, bookSeats }), [trips, bookSeats]);

    return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};


function App() {
  return (
    <AuthProvider>
      <TripProvider>
        <Main />
      </TripProvider>
    </AuthProvider>
  );
}

const Main: React.FC = () => {
    const { user } = useAuth();
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 text-gray-100">
            {user ? <Dashboard /> : <Login />}
        </div>
    );
}

export default App;