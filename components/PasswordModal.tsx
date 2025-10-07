import React, { useState, useEffect } from 'react';
import Modal from './Modal';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifyPassword: (password: string) => boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onVerifyPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onVerifyPassword(password);
    if (!success) {
      setError('Password salah! Silakan coba lagi.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Akses Admin">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password-admin" className="block text-sm font-medium text-gray-700">
            Masukkan Kata Sandi
          </label>
          <input
            type="password"
            id="password-admin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
            Masuk
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default PasswordModal;
