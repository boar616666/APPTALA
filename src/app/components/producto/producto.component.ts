import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.services'; // Inyecta el servicio AuthService

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  producto = {
    title: '',
    description: '',
    price: 0,
    image: null as File | null,
    proveedor: '' // Nuevo campo para proveedor
  };

  constructor(
    private productService: ProductService,
    private authService: AuthService // Inyecta AuthService
  ) {}

  // Método para manejar la selección de archivo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'image/jpeg') {
      this.producto.image = file;
    } else {
      alert('Solo se permiten archivos en formato .jpg');
      event.target.value = ''; // Limpiar la selección si el archivo no es válido
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.producto.title);
    formData.append('description', this.producto.description);
    formData.append('price', this.producto.price.toString());
    formData.append('proveedor', this.producto.proveedor); // Agregar proveedor al FormData
  
    if (this.producto.image) {
      formData.append('image', this.producto.image);
    }
  
    // Aquí obtienes el userId y lo incluyes en el FormData
    const userId = this.authService.getUserId();
    if (userId) {
      formData.append('ownerId', userId); // Agrega ownerId al FormData
    } else {
      alert('No se ha podido obtener el ID del usuario. Debes iniciar sesión.');
      return; // Detiene la ejecución si no se tiene el userId
    }
  
    // Llama al servicio para guardar el producto
    this.productService.saveProduct(formData).subscribe({
      next: (response) => {
        console.log('Producto guardado con éxito:', response);
        alert('El producto ha sido guardado correctamente.');
      },
      error: (error) => {
        console.error('Error al guardar el producto:', error);
        alert('Error al guardar el producto. Verifica la información e inténtalo de nuevo.');
      }
    });
  }
}  
