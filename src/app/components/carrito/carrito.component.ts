import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PaymentService } from '../../../services/pagos.service'; // Importa el servicio de pagos

declare var paypal: any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];  // Usamos 'any' ya que el tipo específico no es necesario

  constructor(
    private cartService: CartService,
    private paymentService: PaymentService // Inyecta el servicio de pagos
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.loadPayPalScript().then(() => {
      this.loadPayPalButton();
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }

  loadPayPalScript(): Promise<void> {
    return new Promise((resolve) => {
      if (document.getElementById('paypal-sdk')) {
        resolve();
        return;
      }

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

          // Crear el objeto paymentData con la estructura correcta
          const paymentData = {
            payerId: details.payer.payer_id,  // El payerId de PayPal
            transactionId: details.id,        // El ID de la transacción de PayPal
            amount: this.getTotal(),          // El total de la compra (calculado en el frontend)
            items: this.cartItems.map(item => ({
              product: item._id,  // El _id del producto, que es un ObjectId de MongoDB
              quantity: item.quantity,
              price: item.price
            })),
            paymentDate: new Date()  // La fecha del pago
          };

          // Llamar al servicio para guardar el pago en la base de datos
          this.paymentService.savePayment(paymentData).subscribe({
            next: (response) => {
              console.log('Pago guardado con éxito:', response);
            },
            error: (error) => {
              console.error('Error al guardar el pago:', error);
            }
          });

          // Limpiar el carrito después de realizar el pago
          this.cartService.clearCart();
          this.cartItems = [];
        });
      },
      onError: (err: any) => {
        console.error('Error en el proceso de pago', err);
      }
    }).render('#paypal-button-container');
  }
}
