import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.css']
})
export class GestionProductoComponent implements OnInit {
  productos: any[] = [];
  selectedProduct: any = null; // Para el producto seleccionado
  productForm: FormGroup; // Formulario reactivo para editar productos
  selectedImage: File | null = null; // Para almacenar la imagen seleccionada

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      title: [''],
      description: [''],
      price: [''],
      image: [null] // Si usas imágenes, asegúrate de manejar el archivo adecuadamente
    });
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productos = response.map(product => {
          // Completa la URL de la imagen si es relativa
          if (product.image && !product.image.startsWith('http')) {
            product.image = `http://localhost:3000/${product.image}`; // Ajusta la URL base si es necesario
          }
          return product;
        });
      },
      error: (error) => {
        console.error('Error al obtener los productos:', error);
      }
    });
  }

  editarProducto(producto: any) {
    this.selectedProduct = producto;
    this.productForm.patchValue({
      title: producto.title,
      description: producto.description,
      price: producto.price,
      image: null // Manejar el archivo de imagen según sea necesario
    });
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0]; // Guardar la imagen seleccionada
      this.productForm.patchValue({ image: this.selectedImage }); // Actualizar el FormGroup con la imagen seleccionada
    }
  }

  actualizarProducto() {
    if (this.selectedProduct) {
      const productData = new FormData();
  
      const title = this.productForm.get('title');
      const description = this.productForm.get('description');
      const price = this.productForm.get('price');
  
      if (title && description && price) {
        productData.append('title', title.value);
        productData.append('description', description.value);
        productData.append('price', price.value);
  
        // Agregar la imagen solo si está seleccionada
        if (this.selectedImage) {
          productData.append('image', this.selectedImage);
        }
  
        // Llamada al servicio para actualizar el producto
        this.productService.updateProduct(this.selectedProduct._id, productData).subscribe({
          next: () => {
            console.log('Producto actualizado con éxito');
            this.obtenerProductos(); // Actualizar la lista después de la actualización
            this.selectedProduct = null; // Reiniciar la selección
            this.productForm.reset(); // Reiniciar el formulario
            this.selectedImage = null; // Reiniciar la imagen seleccionada
          },
          error: (error) => {
            console.error('Error al actualizar el producto:', error);
          }
        });
      } else {
        console.error('Error: Formulario no está completamente lleno');
      }
    }
  }

  eliminarProducto(productId: string | undefined) {
    if (!productId) {
      console.error('Error: El ID del producto es indefinido');
      return;
    }
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        console.log('Producto eliminado con éxito');
        this.obtenerProductos(); // Actualizar la lista después de eliminar
      },
      error: (error) => {
        console.error('Error al eliminar el producto:', error);
      }
    });
  }
}
