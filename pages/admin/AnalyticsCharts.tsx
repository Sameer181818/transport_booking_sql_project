
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import type { Trip } from '../../types';

interface AnalyticsChartsProps {
  trips: Trip[];
}

const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({ trips }) => {
  const occupancyData = trips.map(trip => {
    const bookedSeats = trip.seats.filter(s => s.status === 'booked').length;
    const occupancy = (bookedSeats / trip.totalSeats) * 100;
    return {
      name: `${trip.from.split(',')[0]}-${trip.to.split(',')[0]}`,
      Occupancy: parseFloat(occupancy.toFixed(2)),
    };
  });

  // Create mock revenue data for the last 7 days
  const revenueData = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      Revenue: Math.random() * 2000 + 1000,
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900/80 p-4 border border-gray-700 rounded-lg shadow-lg">
          <p className="label text-gray-300">{`${label}`}</p>
          <p className="intro text-sky-400">{`${payload[0].name}: ${payload[0].value}${payload[0].name === 'Occupancy' ? '%' : ''}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-white">Trip Occupancy Rate (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={occupancyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="name" stroke="#A0AEC0" />
            <YAxis stroke="#A0AEC0" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="Occupancy" fill="#38BDF8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-white">Daily Revenue</h3>
        <ResponsiveContainer width="100%" height={300}>
           <LineChart data={revenueData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="date" stroke="#A0AEC0" />
            <YAxis stroke="#A0AEC0" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="Revenue" stroke="#34D399" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
