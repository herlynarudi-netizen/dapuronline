
import React from 'react';
import { MenuItem as MenuItemType } from '../types';

interface MenuItemProps {
  item: MenuItemType;
  onAddToCart: (item: MenuItemType) => void;
}

const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const MenuItem: React.FC<MenuItemProps> = ({ item, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out group flex flex-col">
      <div className="relative h-56">
        <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = 'https://picsum.photos/400/300?grayscale')}
        />
         <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-gray-800 truncate">{item.name}</h3>
          <p className="text-lg font-bold text-orange-600 mt-2">{formatCurrency(item.price)}</p>
        </div>
        <button 
          onClick={() => onAddToCart(item)}
          className="mt-4 w-full bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-300"
        >
          Pesan
        </button>
      </div>
    </div>
  );
};

export default MenuItem;
