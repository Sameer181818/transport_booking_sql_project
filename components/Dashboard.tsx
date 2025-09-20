
import React from 'react';
import { useAuth } from '../App';
import { Role } from '../types';
import Header from './Header';
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import OperatorDashboard from '../pages/operator/OperatorDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ToastProvider from './ToastProvider';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case Role.CUSTOMER:
        return <CustomerDashboard />;
      case Role.OPERATOR:
        return <OperatorDashboard />;
      case Role.ADMIN:
        return <AdminDashboard />;
      default:
        return <div className="p-8">Invalid user role.</div>;
    }
  };

  return (
    <ToastProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow p-4 md:p-8">
            {renderDashboard()}
          </main>
        </div>
    </ToastProvider>
  );
};

export default Dashboard;
