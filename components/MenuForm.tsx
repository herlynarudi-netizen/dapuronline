import React, { useState, useEffect } from 'react';
import { MenuItem, MenuCategory } from '../types';

interface MenuFormProps {
  onSubmit: (item: Omit<MenuItem, 'id'> & { id?: string }) => void;
  initialData: MenuItem | null;
  onClose: () => void;
}

const categories: MenuCategory[] = ['makanan', 'minuman', 'lainnya'];
const categoryDisplay: { [key in MenuCategory]: string } = {
  makanan: 'Makanan',
  minuman: 'Minuman',
  lainnya: 'Lainnya'
};


const MenuForm: React.FC<MenuFormProps> = ({ onSubmit, initialData, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<MenuCategory>('makanan');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setImageUrl(initialData.imageUrl);
      setCategory(initialData.category);
    } else {
      setName('');
      setPrice('');
      setImageUrl('');
      setCategory('makanan');
    }
    setError('');
  }, [initialData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.startsWith('image/')) {
        setError('File yang dipilih harus berupa gambar.');
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('Ukuran gambar maksimal adalah 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
        setError('');
      };
      reader.onerror = () => {
        setError('Gagal memproses gambar. Coba lagi.');
      }
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (price === '') return;
    if (!imageUrl) {
        setError('Silakan pilih gambar untuk menu.');
        return;
    }
    onSubmit({ name, price, imageUrl, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Menu</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>
       <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value as MenuCategory)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{categoryDisplay[cat]}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga (Rp)</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
          required
          min="0"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">Gambar Menu</label>
        {imageUrl && (
            <div className="mt-2 mb-3">
                <img src={imageUrl} alt="Pratinjau" className="w-full h-48 object-cover rounded-lg border border-gray-200" />
            </div>
        )}
        <input
          type="file"
          id="imageFile"
          onChange={handleImageChange}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-100 file:text-orange-700 hover:file:bg-orange-200 transition-colors cursor-pointer"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
        >
          Batal
        </button>
        <button
          type="submit"
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

export default MenuForm;
