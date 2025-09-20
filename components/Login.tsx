
import React from 'react';
import { useAuth } from '../App';
import { Role } from '../types';
import { UserIcon, CogIcon, ChartBarIcon, ArrowRightIcon } from './icons/Icons';

const RoleCard: React.FC<{
  role: Role;
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect: (role: Role) => void;
  gradient: string;
}> = ({ role, title, description, icon, onSelect, gradient }) => (
  <div
    className={`group relative p-8 rounded-2xl shadow-lg cursor-pointer transform hover:-translate-y-2 transition-all duration-300 overflow-hidden bg-gray-800 border border-gray-700 hover:border-transparent`}
    onClick={() => onSelect(role)}
  >
    <div className={`absolute top-0 left-0 w-full h-full ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
    <div className="relative z-10">
      <div className="mb-4 text-white">{icon}</div>
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <div className="flex items-center text-sky-400 group-hover:text-white font-semibold">
        Login as {title} <ArrowRightIcon className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </div>
  </div>
);

const Login: React.FC = () => {
  const { login } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
          Welcome to <span className="bg-gradient-to-r from-sky-400 to-indigo-500 text-transparent bg-clip-text">AeroBook Pro</span>
        </h1>
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          The future of transport management. Select your role to get started.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <RoleCard
            role={Role.CUSTOMER}
            title="Customer"
            description="Book, manage, and track your trips with ease."
            icon={<UserIcon className="w-10 h-10" />}
            onSelect={login}
            gradient="bg-gradient-to-br from-sky-500 to-blue-600"
          />
          <RoleCard
            role={Role.OPERATOR}
            title="Operator"
            description="Optimize routes, manage schedules, and view vehicle status."
            icon={<CogIcon className="w-10 h-10" />}
            onSelect={login}
            gradient="bg-gradient-to-br from-purple-500 to-indigo-600"
          />
          <RoleCard
            role={Role.ADMIN}
            title="Admin"
            description="Access analytics, manage users, and oversee the entire system."
            icon={<ChartBarIcon className="w-10 h-10" />}
            onSelect={login}
            gradient="bg-gradient-to-br from-emerald-500 to-green-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
