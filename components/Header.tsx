
import React from 'react';
import { useAuth } from '../App';
import { LogoutIcon, UserCircleIcon } from './icons/Icons';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 text-transparent bg-clip-text">
              AeroBook Pro
            </h1>
          </div>
          <div className="flex items-center">
            <div className="hidden sm:block text-right mr-4">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
             <UserCircleIcon className="w-8 h-8 text-gray-400 hidden sm:block" />
            <button
              onClick={logout}
              className="ml-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white transition-colors"
              aria-label="Logout"
            >
              <LogoutIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
