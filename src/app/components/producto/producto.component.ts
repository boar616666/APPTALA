import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';

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
    image: null as File | null
  };

  constructor(private productService: ProductService) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.producto.image = file;
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.producto.title); // Asegúrate de usar 'title'
    formData.append('description', this.producto.description); // 'description'
    formData.append('price', this.producto.price.toString()); // 'price'
    if (this.producto.image) {
      formData.append('imagen', this.producto.image); // 'imagen' para la imagen
    }

    this.productService.saveProduct(formData).subscribe({
      next: (response) => {
        console.log('Producto guardado con éxito:', response);
        // Puedes limpiar el formulario aquí si lo deseas
      },
      error: (error) => {
        console.error('Error al guardar el producto:', error);
      }
    });
  }
}
