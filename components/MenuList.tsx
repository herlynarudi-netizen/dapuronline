
import React from 'react';
import { MenuItem as MenuItemType, MenuCategory } from '../types';
import MenuItem from './MenuItem';

interface MenuListProps {
  groupedItems: { [key in MenuCategory]?: MenuItemType[] };
  onAddToCart: (item: MenuItemType) => void;
}

const categoryTitles: { [key in MenuCategory]: string } = {
    makanan: 'Makanan',
    minuman: 'Minuman',
    lainnya: 'Lainnya'
};

const categoryOrder: MenuCategory[] = ['makanan', 'minuman', 'lainnya'];

const MenuList: React.FC<MenuListProps> = ({ groupedItems, onAddToCart }) => {
  const hasItems = Object.keys(groupedItems).length > 0;

  return (
    <div>
        <h2 className="text-4xl font-bold text-center text-orange-700 mb-12">Menu Kami</h2>
        {!hasItems ? (
            <p className="text-center text-gray-500">Saat ini belum ada menu yang tersedia.</p>
        ) : (
            <div className="space-y-12">
                {categoryOrder.map(category => (
                    groupedItems[category] && groupedItems[category]!.length > 0 && (
                        <section key={category}>
                            <h3 className="text-3xl font-bold text-orange-600 mb-6 pb-2 border-b-2 border-orange-200">{categoryTitles[category]}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                {groupedItems[category]!.map(item => (
                                    <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
                                ))}
                            </div>
                        </section>
                    )
                ))}
            </div>
        )}
    </div>
  );
};

export default MenuList;
