// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
  }

  removeFromCart(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
