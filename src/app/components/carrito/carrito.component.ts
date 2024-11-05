import { Component, OnInit } from '@angular/core';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

declare var paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  cartItems: CartItem[] = [
    { name: 'Producto 1', price: 10, quantity: 1, imageUrl: 'ruta/a/imagen1.jpg' },
    { name: 'Producto 2', price: 20, quantity: 2, imageUrl: 'ruta/a/imagen2.jpg' }
  ];

  constructor() {}

  ngOnInit(): void {
    this.loadPayPalScript().then(() => {
      this.loadPayPalButton();
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeFromCart(item: CartItem): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve) => {
      // Verifica si el script de PayPal ya está cargado
      if (document.getElementById('paypal-sdk')) {
        resolve();
        return;
      }
      
      // Carga el script de PayPal
      const script = document.createElement('script');
      script.id = 'paypal-sdk';
      script.src = "https://www.paypal.com/sdk/js?client-id=AdV3msHdiL5zQgKuG-Dh9Ix72UA_rwEOAEhIZTcg0CZxsh-woM8ZnByFFM7eJx1wZJPwIDZq-JBFi1dN&currency=USD";
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  loadPayPalButton(): void {
    const total = this.getTotal();

    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: total.toString()
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert(`Pago completado por ${details.payer.name.given_name}`);
          this.cartItems = []; // Limpia el carrito después del pago
        });
      },
      onError: (err: any) => {
        console.error('Error en el proceso de pago', err);
      }
    }).render('#paypal-button-container');
  }
}