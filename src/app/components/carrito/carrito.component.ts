import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';
import { PagoMethodFactory } from '../../../services/paymets/pago-method-factory';
import { MetodoPagar } from '../../../services/paymets/metodo-pagar.interface';
import { PagoDialogComponent } from './pago-dialog/pago-dialog.component';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  cartItems: any[] = [];
  metodoSeleccionado: string = 'paypal'; // Método de pago predeterminado
  metodoPago!: MetodoPagar; // Método de pago dinámico

  constructor(private cartService: CartService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  removeFromCart(item: any): void {
    this.cartService.removeFromCart(item);
  }

  seleccionarMetodo(metodo: string): void {
    this.metodoSeleccionado = metodo;
    this.metodoPago = PagoMethodFactory.crearPagoMethod(metodo); // Usa la fábrica
    this.abrirModalPago();
  }

  abrirModalPago(): void {
    const dialogRef = this.dialog.open(PagoDialogComponent, {
      width: '500px',
      data: {
        metodo: this.metodoSeleccionado,
        total: this.getTotal(),
        metodoPago: this.metodoPago, // Pasamos el método de pago
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        alert('Pago procesado con éxito.');
      }
    });
  }
}
