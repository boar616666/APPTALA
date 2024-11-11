import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.services';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {
  usuarios: any[] = []; // Arreglo para almacenar los usuarios

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Datos de ejemplo para la lista de usuarios
    this.usuarios = [
      { nombre: 'Juan Pérez', correo: 'juan.perez@example.com' },
      { nombre: 'María Gómez', correo: 'maria.gomez@example.com' },
      { nombre: 'Carlos López', correo: 'carlos.lopez@example.com' },
      { nombre: 'Ana Sánchez', correo: 'ana.sanchez@example.com' }
    ];

    // Puedes mantener la llamada al servicio si en algún momento quieres usar los datos reales
    /*
    this.authService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data; // Asigna los usuarios obtenidos al arreglo
      },
      (error) => {
        console.error('Error al obtener usuarios', error);
      }
    );
    */
  }
}
