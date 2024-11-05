import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items = [
    {
      label: 'Subir',
      icon: 'pi pi-upload',
      command: () => this.goToProducto() // Navega a la ruta 'producto'
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logOut() // Cierra sesión
    }
  ];

  constructor(private router: Router) {}

  logOut() {
    console.log('Cerrando sesión');
    localStorage.removeItem('authToken'); // Elimina el token de autenticación
    localStorage.removeItem('user'); // Elimina datos de usuario
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }

  navigateHome() {
    this.router.navigate(['/home']); // Navega a la ruta de home
  }

  navigateToCart() {
    this.router.navigate(['/carrito']); // Navega a la ruta del carrito
  }

  goToProducto() {
    this.router.navigate(['/producto']); // Navega a la ruta de producto
  }
}
