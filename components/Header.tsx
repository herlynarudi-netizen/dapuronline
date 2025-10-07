import React from 'react';

interface HeaderProps {
  isAdminView: boolean;
  onToggleView: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAdminView, onToggleView }) => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl text-orange-800 font-bold">Dapur Mama</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 hidden sm:block">
            {isAdminView ? 'Admin View' : 'Customer View'}
          </span>
          <button
            onClick={onToggleView}
            className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            <span
              className={`${
                isAdminView ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;