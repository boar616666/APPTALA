import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cargarCarritoDesdeStorage());
  cartItems$ = this.cartItemsSubject.asObservable();  

  getCartItems(): any[] {
    return this.cartItemsSubject.value;
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.quantity, 0);
  }

  addToCart(item: any): void {
    const cartItems = this.cartItemsSubject.value;
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ ...item, quantity: 1 });
    }

    this.actualizarCarrito(cartItems);
  }

  removeFromCart(item: any): void {
    const cartItems = this.cartItemsSubject.value.filter(cartItem => cartItem.name !== item.name);
    this.actualizarCarrito(cartItems);
  }

  clearCart(): void {
    this.actualizarCarrito([]);
  }

  private actualizarCarrito(cartItems: any[]): void {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    this.cartItemsSubject.next(cartItems);
  }

  private cargarCarritoDesdeStorage(): any[] {
    const carritoGuardado = localStorage.getItem('cart');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  }
}
