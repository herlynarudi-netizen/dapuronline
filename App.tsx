import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { MenuItem, CartItem, MenuCategory } from './types';
import Header from './components/Header';
import MenuList from './components/MenuList';
import AdminPanel from './components/AdminPanel';
import MenuForm from './components/MenuForm';
import Modal from './components/Modal';
import Cart from './components/Cart';
import PasswordModal from './components/PasswordModal';
import ConfirmationModal from './components/ConfirmationModal';
import ImageSlider from './components/ImageSlider';

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);

  // --- Menggunakan Gambar Lokal untuk Slideshow ---
  // Pastikan Anda sudah melakukan hal berikut:
  // 1. Membuat folder `public` di direktori utama proyek Anda.
  // 2. Di dalam folder `public`, membuat folder `images`.
  // 3. Meletakkan file gambar Anda di dalam `public/images` dengan nama
  //    seperti `slide1.jpg`, `slide2.jpg`, dst.
  const sliderImages = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg',
    '/images/slide4.jpg',
  ];

  const initialMenuItems: MenuItem[] = [
    { id: '1', name: 'Nasi Goreng Spesial', price: 35000, imageUrl: 'https://picsum.photos/seed/nasigoreng/400/300', category: 'makanan' },
    { id: '2', name: 'Sate Ayam Madura', price: 40000, imageUrl: 'https://picsum.photos/seed/sateayam/400/300', category: 'makanan' },
    { id: '3', name: 'Rendang Daging Sapi', price: 55000, imageUrl: 'https://picsum.photos/seed/rendang/400/300', category: 'makanan' },
    { id: '4', name: 'Gado-Gado', price: 25000, imageUrl: 'https://picsum.photos/seed/gadogado/400/300', category: 'makanan' },
    { id: '5', name: 'Soto Ayam Lamongan', price: 30000, imageUrl: 'https://picsum.photos/seed/sotoayam/400/300', category: 'makanan' },
    { id: '6', name: 'Es Teh Manis', price: 8000, imageUrl: 'https://picsum.photos/seed/esteh/400/300', category: 'minuman' },
    { id: '7', name: 'Jus Alpukat', price: 15000, imageUrl: 'https://picsum.photos/seed/jusalpukat/400/300', category: 'minuman' },
    { id: '8', name: 'Keripik Kentang', price: 12000, imageUrl: 'https://picsum.photos/seed/keripik/400/300', category: 'lainnya' },
    { id: '9', name: 'Rokok Filter (16)', price: 32000, imageUrl: 'https://picsum.photos/seed/rokok/400/300', category: 'lainnya' },
  ];

  useEffect(() => {
    try {
      const storedMenu = localStorage.getItem('dapurMamaMenu');
      if (storedMenu) {
        setMenuItems(JSON.parse(storedMenu));
      } else {
        setMenuItems(initialMenuItems);
        localStorage.setItem('dapurMamaMenu', JSON.stringify(initialMenuItems));
      }
    } catch (error) {
      console.error("Failed to parse menu from localStorage", error);
      setMenuItems(initialMenuItems);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const groupedMenuItems = useMemo(() => {
    return menuItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as { [key in MenuCategory]?: MenuItem[] });
  }, [menuItems]);

  const saveMenu = useCallback((items: MenuItem[]) => {
    localStorage.setItem('dapurMamaMenu', JSON.stringify(items));
    setMenuItems(items);
  }, []);

  const handleToggleView = () => {
    if (isAdminView) {
      setIsAdminView(false);
    } else {
      setIsPasswordModalOpen(true);
    }
  };

  const handlePasswordSubmit = (password: string): boolean => {
    const correctPassword = 'Rudi123574';
    if (password === correctPassword) {
      setIsAdminView(true);
      setIsPasswordModalOpen(false);
      return true;
    }
    return false;
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = (item: MenuItem) => {
    setItemToDelete(item);
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    const updatedMenu = menuItems.filter(item => item.id !== itemToDelete.id);
    saveMenu(updatedMenu);
    setIsConfirmModalOpen(false);
    setItemToDelete(null);
  };

  const handleFormSubmit = (item: Omit<MenuItem, 'id'> & { id?: string }) => {
    if (editingItem) {
      // Editing
      const updatedMenu = menuItems.map(i => i.id === editingItem.id ? { ...item, id: editingItem.id } as MenuItem : i);
      saveMenu(updatedMenu);
    } else {
      // Adding
      const newItem: MenuItem = { ...item, id: Date.now().toString() };
      saveMenu([...menuItems, newItem]);
    }
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleAddToCart = (itemToAdd: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === itemToAdd.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    setCartItems(prevItems => {
      if (quantity <= 0) {
        return prevItems.filter(item => item.id !== itemId);
      }
      return prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };


  return (
    <div className="bg-orange-50 min-h-screen text-gray-800">
      <Header isAdminView={isAdminView} onToggleView={handleToggleView} />
      <main className="container mx-auto p-4 md:p-8 pt-24 pb-40">
        {isAdminView ? (
          <AdminPanel
            groupedItems={groupedMenuItems}
            onAdd={handleAddItem}
            onEdit={handleEditItem}
            onDelete={handleDeleteRequest}
          />
        ) : (
          <>
            <ImageSlider images={sliderImages} />
            <MenuList groupedItems={groupedMenuItems} onAddToCart={handleAddToCart} />
          </>
        )}
      </main>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Menu' : 'Tambah Menu Baru'}
      >
        <MenuForm
          onSubmit={handleFormSubmit}
          initialData={editingItem}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onVerifyPassword={handlePasswordSubmit}
      />
      
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus menu "${itemToDelete?.name}"?`}
      />

      {!isAdminView && (
        <Cart 
          items={cartItems} 
          onUpdateQuantity={handleUpdateCartQuantity}
          onClearCart={handleClearCart}
          phoneNumber="6281312357574" 
        />
      )}
    </div>
  );
};

export default App;