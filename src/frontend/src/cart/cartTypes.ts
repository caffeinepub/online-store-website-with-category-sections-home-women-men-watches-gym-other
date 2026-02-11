import type { Product } from '../backend';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

export type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: bigint }
  | { type: 'UPDATE_QUANTITY'; payload: { id: bigint; quantity: number } }
  | { type: 'CLEAR_CART' };
