
export type MenuCategory = 'makanan' | 'minuman' | 'lainnya';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: MenuCategory;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
