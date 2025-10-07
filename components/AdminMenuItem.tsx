
import React from 'react';
import { MenuItem } from '../types';
import { EditIcon, DeleteIcon } from './icons';

interface AdminMenuItemProps {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
}

const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const AdminMenuItem: React.FC<AdminMenuItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-16 h-16 rounded-md object-cover mr-4"
        onError={(e) => (e.currentTarget.src = 'https://picsum.photos/100?grayscale')}
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onEdit} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors duration-200">
          <EditIcon className="w-5 h-5" />
        </button>
        <button onClick={onDelete} className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors duration-200">
          <DeleteIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AdminMenuItem;
