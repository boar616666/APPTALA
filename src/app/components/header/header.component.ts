import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la redirección

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private router: Router) {} // Inyecta el servicio Router

  items = [
    {
      label: 'Subir',
      icon: 'pi pi-upload',
      command: () => this.goToProducto() // Llama a la función para navegar a la ruta 'producto'
    },
    {
      label: 'Cerrar Sesión',
      icon: 'pi pi-sign-out',
      command: () => this.logOut() // Llama a la función para cerrar sesión
    }
  ];

  logOut() {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión');
    
    // Elimina el token o la información del usuario
    localStorage.removeItem('authToken'); // O sessionStorage si usas sesión
    localStorage.removeItem('user'); // Si tienes algún dato de usuario guardado

    // Redirige a la página de inicio de sesión
    this.router.navigate(['/login']); // Ajusta la ruta según tu aplicación
  }

  navigateHome() {
    this.router.navigate(['/home']); // Navega a la ruta de home
  }

  goToProducto() {
    this.router.navigate(['/producto']); // Navega a la ruta de producto
  }
}
