import React, { useState, useMemo } from 'react';
import { CartItem } from '../types';
import { CartIcon, ChevronUpIcon, ChevronDownIcon, PlusIcon, MinusIcon, DeleteIcon } from './icons';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onClearCart: () => void;
  phoneNumber: string;
}

const formatCurrency = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
};

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onClearCart, phoneNumber }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { totalItems, totalPrice } = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return { totalItems, totalPrice };
  }, [items]);

  const handleOrder = () => {
    let message = "Halo, saya mau pesan:\n\n";
    items.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) - ${formatCurrency(item.price * item.quantity)}\n`;
    });
    message += `\nTotal: *${formatCurrency(totalPrice)}*\n\n`;
    message += "Terima kasih.";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    onClearCart();
    setIsExpanded(false);
  };
  
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] rounded-t-2xl">
      <div className="container mx-auto px-4">
        {/* Collapsed View / Header */}
        <div 
          className="flex justify-between items-center h-16 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          role="button"
          aria-expanded={isExpanded}
          aria-controls="cart-details"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <CartIcon className="w-7 h-7 text-orange-700" />
              <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Keranjang Anda</h3>
          </div>
          <div className="flex items-center space-x-3">
            <span className="font-bold text-lg text-orange-700">{formatCurrency(totalPrice)}</span>
            <button className="p-1">
              {isExpanded ? <ChevronDownIcon className="w-6 h-6 text-gray-600" /> : <ChevronUpIcon className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Expanded View */}
        <div
          id="cart-details"
          className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[60vh]' : 'max-h-0'}`}
        >
          <div className="py-4 border-t border-gray-200">
            <div className="space-y-4 max-h-[calc(60vh-180px)] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex items-center space-x-4">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                     <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><MinusIcon className="w-4 h-4" /></button>
                     <span className="font-bold w-6 text-center">{item.quantity}</span>
                     <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                   <button onClick={() => onUpdateQuantity(item.id, 0)} className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 transition-colors">
                     <DeleteIcon className="w-5 h-5"/>
                   </button>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button 
                onClick={handleOrder}
                className="w-full py-3 px-4 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300 text-center"
              >
                Pesan Sekarang via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;