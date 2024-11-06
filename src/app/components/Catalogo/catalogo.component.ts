// catalogo.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  searchTerm: string = '';
  categoriaSeleccionada: string = '';
  productos: any[] = [];

  categorias: string[] = ['Decoracion', 'Cocina', 'Jardineria'];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productos = response.map(producto => ({
          ...producto,
          imagenUrl: `http://localhost:3000/${producto.image}`,
        }));
      },
      error: (error) => console.error('Error al obtener productos:', error)
    });
  }

  productosFiltrados() {
    return this.productos.filter(producto => 
      producto.title.toLowerCase().includes(this.searchTerm.toLowerCase()) && 
      (this.categoriaSeleccionada === '' || producto.categoria === this.categoriaSeleccionada)
    );
  }

  agregarAlCarrito(producto: any) {
    const item = {
      name: producto.title,
      price: producto.price,
      quantity: 1,
      imageUrl: producto.imagenUrl
    };
    this.cartService.addToCart(item);
    alert(`${producto.title} agregado al carrito`);
  }
}
