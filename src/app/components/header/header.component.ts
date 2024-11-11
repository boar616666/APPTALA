import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items = [
    {
      label: 'Subir',
      icon: 'pi pi-upload',
      command: () => this.goToProducto()
    },
    {
      label: 'Modificar',
      icon: 'pi pi-pencil',
      command: () => this.goToGestionProducto()
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logOut()
    }
  ];

  cartItemCount: number = 0;
  isLoggedIn: boolean = false;

  constructor(
    public router: Router,
    private cartService: CartService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Verificar el estado de sesión desde AuthService sin utilizar token
    this.isLoggedIn = this.authService.getIsLoggedIn(); // Este método debe devolver si el usuario está autenticado o no
    console.log("Estado inicial de sesión en HeaderComponent:", this.isLoggedIn);

    // Suscribirse al estado de sesión de AuthService para cambios
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
      console.log("Estado de sesión recibido en HeaderComponent después de suscripción:", isLoggedIn);
      this.cdr.detectChanges(); // Forzar actualización inmediata en el DOM
    });

    // Suscribirse a los cambios en el carrito
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  logOut() {
    this.authService.logout(); // Llamada al método logout, que debe eliminar cualquier estado de autenticación
    this.router.navigate(['/home']);
  }

  navigateHome() {
    this.router.navigate(['/home']);
  }

  navigateToCart() {
    this.router.navigate(['/carrito']);
  }

  goToProducto() {
    this.router.navigate(['/producto']);
  }

  goToGestionProducto() {
    this.router.navigate(['/gestionProducto']);
  }
}
