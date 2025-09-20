import React, { useState } from 'react';
import RouteOptimizer from './RouteOptimizer';
import { useTrips } from '../../App';

const OperatorDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState('optimizer');
    const { trips } = useTrips();

    const renderCurrentRoutes = () => (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Current Active Routes</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th className="p-3">Route</th>
                            <th className="p-3">Departure</th>
                            <th className="p-3">Arrival</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Occupancy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trips.map(trip => {
                            const bookedSeats = trip.seats.filter(s => s.status === 'booked').length;
                            const occupancy = ((bookedSeats / trip.totalSeats) * 100).toFixed(0);
                            return (
                                <tr key={trip.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                    <td className="p-3">{trip.from} to {trip.to}</td>
                                    <td className="p-3">{trip.departureTime.toLocaleTimeString()}</td>
                                    <td className="p-3">{trip.arrivalTime.toLocaleTimeString()}</td>
                                    <td className="p-3">${trip.price.toFixed(2)}</td>
                                    <td className="p-3">
                                        <div className="flex items-center">
                                            <div className="w-full bg-gray-600 rounded-full h-2.5 mr-2">
                                                <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${occupancy}%` }}></div>
                                            </div>
                                            <span>{occupancy}%</span>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-white">Operator Control Panel</h2>
            <div className="flex border-b border-gray-700 mb-6">
                <button
                    onClick={() => setActiveTab('optimizer')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'optimizer' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-gray-400'}`}
                >
                    AI Route Optimizer
                </button>
                <button
                    onClick={() => setActiveTab('routes')}
                    className={`px-6 py-3 font-semibold transition-colors ${activeTab === 'routes' ? 'text-sky-400 border-b-2 border-sky-400' : 'text-gray-400'}`}
                >
                    Current Routes
                </button>
            </div>
            <div>
                {activeTab === 'optimizer' ? <RouteOptimizer /> : renderCurrentRoutes()}
            </div>
        </div>
    );
};

export default OperatorDashboard;