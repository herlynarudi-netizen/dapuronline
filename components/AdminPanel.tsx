

import React from 'react';
import { MenuItem, MenuCategory } from '../types';
import AdminMenuItem from './AdminMenuItem';
import { PlusIcon } from './icons';

interface AdminPanelProps {
  groupedItems: { [key in MenuCategory]?: MenuItem[] };
  onAdd: () => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (item: MenuItem) => void;
}

const categoryTitles: { [key in MenuCategory]: string } = {
    makanan: 'Makanan',
    minuman: 'Minuman',
    lainnya: 'Lainnya'
};

const categoryOrder: MenuCategory[] = ['makanan', 'minuman', 'lainnya'];

const AdminPanel: React.FC<AdminPanelProps> = ({ groupedItems, onAdd, onEdit, onDelete }) => {
  // FIX: Use Array.isArray as a type guard to ensure `arr` is an array before accessing `length`.
  const hasItems = Object.values(groupedItems).some(arr => Array.isArray(arr) && arr.length > 0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-700">Manajemen Menu</h2>
        <button
          onClick={onAdd}
          className="flex items-center bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-orange-700 transition-colors duration-300"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Tambah Menu
        </button>
      </div>
      <div className="space-y-8">
        {hasItems ? (
          categoryOrder.map(category => (
            groupedItems[category] && groupedItems[category]!.length > 0 && (
              <section key={category}>
                <h3 className="text-2xl font-semibold text-orange-600 mb-4 pb-2 border-b border-gray-200">{categoryTitles[category]}</h3>
                <div className="space-y-4">
                  {groupedItems[category]!.map(item => (
                    <AdminMenuItem 
                      key={item.id} 
                      item={item} 
                      onEdit={() => onEdit(item)} 
                      onDelete={() => onDelete(item)} 
                    />
                  ))}
                </div>
              </section>
            )
          ))
        ) : (
          <p className="text-center text-gray-500 py-8">Belum ada menu. Silakan tambahkan menu baru.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
