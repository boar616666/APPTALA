import { Component } from '@angular/core';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  searchTerm: string = '';  // Variable para la búsqueda
  categoriaSeleccionada: string = '';  // Variable para la categoría seleccionada

  // Lista de categorías
  categorias: string[] = ['Decoracion', 'Cocina', 'Jardineria'];

  // Lista de productos con categorías, imágenes y descripciones
  productos = [
    { 
      nombre: 'Producto 1',
      descripcion: 'Este es el producto 1. Es de alta calidad y duradero.',
      categoria: 'Decoracion',
      imagenUrl: 'assets/t4.jpg'
    },
    { 
      nombre: 'Producto 2',
      descripcion: 'Este es el producto 2. Ideal para uso cotidiano.',
      categoria: 'Cocina',
      imagenUrl: 'assets/t2.jpg'
    },
    { 
      nombre: 'Producto 3',
      descripcion: 'Este es el producto 3. Es muy popular entre los usuarios.',
      categoria: 'Jardineria',
      imagenUrl: 'assets/t3.jpg'
    },
    { 
      nombre: 'Producto 4',
      descripcion: 'Este es el producto 4. Combina funcionalidad y diseño.',
      categoria: 'Jardineria',
      imagenUrl: 'assets/t5.jpg'
    },
    { 
      nombre: 'Producto 5',
      descripcion: 'Este es el producto 5. La mejor opción para los profesionales.',
      categoria: 'Cocina',
      imagenUrl: 'assets/t1.jpg'
    }
  ];

  // Método para filtrar los productos por categoría y término de búsqueda
  productosFiltrados() {
    return this.productos.filter(producto => 
      producto.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) && 
      (this.categoriaSeleccionada === '' || producto.categoria === this.categoriaSeleccionada)
    );
  }
}
