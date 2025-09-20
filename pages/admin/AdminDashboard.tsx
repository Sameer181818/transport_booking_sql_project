import React from 'react';
import AnalyticsCharts from './AnalyticsCharts';
import { TicketIcon, CalendarIcon, UserIcon, ChartBarIcon } from '../../components/icons/Icons';
import { useTrips } from '../../App';

const AdminDashboard: React.FC = () => {
    const { trips } = useTrips();
    
    const totalBookings = trips.reduce((acc, trip) => acc + trip.seats.filter(s => s.status === 'booked').length, 0);
    const totalSeats = trips.reduce((acc, trip) => acc + trip.totalSeats, 0);
    const overallOccupancy = totalSeats > 0 ? (totalBookings / totalSeats) * 100 : 0;
    const totalRevenue = trips.reduce((acc, trip) => {
        const bookedSeats = trip.seats.filter(s => s.status === 'booked').length;
        return acc + (bookedSeats * trip.price);
    }, 0);

    const StatCard = ({ title, value, icon, colorClass }: { title: string, value: string, icon: React.ReactNode, colorClass: string }) => (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center">
            <div className={`p-3 rounded-full mr-4 ${colorClass}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl font-extrabold mb-6 text-white">Admin Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} icon={<ChartBarIcon className="w-6 h-6 text-white"/>} colorClass="bg-green-500/80" />
                <StatCard title="Total Bookings" value={totalBookings.toString()} icon={<TicketIcon className="w-6 h-6 text-white"/>} colorClass="bg-sky-500/80" />
                <StatCard title="Active Trips" value={trips.length.toString()} icon={<CalendarIcon className="w-6 h-6 text-white"/>} colorClass="bg-purple-500/80" />
                <StatCard title="Overall Occupancy" value={`${overallOccupancy.toFixed(1)}%`} icon={<UserIcon className="w-6 h-6 text-white"/>} colorClass="bg-amber-500/80" />
            </div>

            <AnalyticsCharts trips={trips} />
        </div>
    );
};

export default AdminDashboard;