import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  productForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private productService: ProductService
  ) {
    // Inicializar el formulario con los datos pasados desde el componente de edición
    this.productForm = this.fb.group({
      title: [data.title, Validators.required],
      description: [data.description, Validators.required],
      price: [data.price, [Validators.required, Validators.min(0)]],
      image: [null] // Usar null para inicializar el valor de la imagen
    });
  }

  // Método para cerrar el diálogo sin guardar cambios
  onNoClick(): void {
    this.dialogRef.close();
  }

  // Método para guardar los cambios del producto
  onSave(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('title', this.productForm.get('title')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value.toString());

      // Si se ha seleccionado una imagen, añadirla al FormData
      if (this.productForm.get('image')?.value) {
        formData.append('image', this.productForm.get('image')?.value);
      }

      // Realizar la actualización del producto mediante el servicio
      this.productService.updateProduct(this.data._id, formData).subscribe({
        next: (response) => {
          console.log('Producto actualizado con éxito:', response);
          alert('El producto se ha actualizado con éxito'); // Mensaje de confirmación
          this.dialogRef.close(response); // Cerrar el diálogo y enviar el producto actualizado
        },
        error: (error) => {
          console.error('Error al actualizar el producto:', error);
          alert('Error al actualizar el producto. Inténtalo de nuevo.');
        }
      });
    }
  }

  // Método para manejar la selección de imagen
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    
    // Validar que el archivo sea una imagen en formato .jpg
    const isJpg = file && (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg'));
    
    if (isJpg) {
      this.productForm.patchValue({
        image: file
      });
    } else {
      alert('Solo se permiten archivos en formato .jpg');
      event.target.value = ''; // Limpia la selección para que el usuario intente nuevamente
    }
  }
}
