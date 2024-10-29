import { Component } from '@angular/core';

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
    image: null
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.producto.image = file;
    }
  }

  onSubmit() {
    // Lógica para procesar el producto al enviar
    console.log('Producto enviado:', this.producto);

    // Aquí podrías realizar una llamada a un servicio para guardar el producto en la base de datos
    // Ejemplo:
    // this.productoService.saveProducto(this.producto).subscribe(response => {
    //   console.log('Producto guardado con éxito:', response);
    // });
  }
}
