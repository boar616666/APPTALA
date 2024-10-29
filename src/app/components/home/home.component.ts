import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images: string[];  // Array de imágenes

  constructor(private router: Router) {
    // Rutas correctas de imágenes
    this.images = [
      'assets/1.png',
      'assets/3.png',
      'assets/2.png'
    ];
  }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
