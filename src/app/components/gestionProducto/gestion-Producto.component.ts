import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoComponent } from '../EditarProductoComponent/editar-producto.component';

@Component({
  selector: 'app-gestion-producto',
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.css']
})
export class GestionProductoComponent implements OnInit {
  productos: any[] = [];
  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.productForm = this.fb.group({
      _id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      image: ['']
    });
  }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productos = response.map(product => {
          // Asegurarse de que la URL de la imagen sea completa
          if (product.image && !product.image.startsWith('http')) {
            product.image = `http://localhost:3000/${product.image}`;
          }
          return product;
        });
      },
      error: (error: any) => {
        console.error('Error al obtener los productos:', error);
        alert('Error al cargar la lista de productos. Inténtalo más tarde.');
      }
    });
  }

  editarProducto(producto: any) {
    const dialogRef = this.dialog.open(EditarProductoComponent, {
      width: '400px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Si hay resultado, actualizamos el producto en la lista, incluyendo la imagen
        const index = this.productos.findIndex(p => p._id === result._id);
        if (index !== -1) {
          // Aquí, si result.image es una URL completa o un archivo de imagen, se ajusta.
          if (result.image && !result.image.startsWith('http')) {
            result.image = `http://localhost:3000/${result.image}`;
          }
          this.productos[index] = result; // Reemplazamos el producto en la lista
        }
      }
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
    }
  }

  onSave() {
    if (this.productForm.invalid) {
      alert('El formulario es inválido. Verifica los campos e inténtalo de nuevo.');
      return;
    }

    const formData = new FormData();
    formData.append('title', this.productForm.value.title);
    formData.append('description', this.productForm.value.description);
    formData.append('price', this.productForm.value.price);
    if (this.productForm.value.image) {
      formData.append('image', this.productForm.value.image);
    }

    // Actualizar producto mediante el PUT
    this.productService.updateProduct(this.productForm.value._id, formData).subscribe({
      next: () => {
        alert('Producto actualizado con éxito.');
        this.obtenerProductos();
      },
      error: (error: any) => {
        console.error('Error al actualizar el producto:', error);
        alert('Error al actualizar el producto. Inténtalo de nuevo.');
      }
    });
  }

  eliminarProducto(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        alert('Producto eliminado con éxito.');
        this.obtenerProductos();
      },
      error: (error: any) => {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto. Inténtalo más tarde.');
      }
    });
  }
}
