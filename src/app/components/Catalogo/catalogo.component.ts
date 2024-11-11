import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent implements OnInit {
  searchTerm: string = '';  // Término de búsqueda para filtrar los productos
  productos: any[] = [];    // Lista de productos que se obtendrán del servicio
  productosFiltrados: any[] = []; // Lista de productos filtrados para mejorar el rendimiento

  constructor(
    private productService: ProductService,  // Servicio para obtener los productos
    private cartService: CartService          // Servicio para manejar el carrito
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();  // Cargar productos al inicializar el componente
  }

  // Obtener los productos del servicio ProductService
  obtenerProductos(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.productos = response.map((producto: any) => {
          // Asegurarse de que la URL de la imagen sea completa
          if (producto.image && !producto.image.startsWith('http')) {
            producto.image = `http://localhost:3000/${producto.image}`;  // Cambiar la base de la URL de la imagen
          }
          return { ...producto, isInCart: false }; // Agregar la propiedad isInCart
        });
        this.productosFiltrados = [...this.productos]; // Inicializar los productos filtrados
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }

  // Filtrar productos según el término de búsqueda
  filtrarProductos(): void {
    if (this.searchTerm.trim()) {
      this.productosFiltrados = this.productos.filter(product =>
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.productosFiltrados = [...this.productos];  // Restaurar todos los productos
    }
  }

  // Agregar producto al carrito
  agregarAlCarrito(producto: any): void {
    const cartItem = {
      _id: producto._id,  // Asegúrate de que el producto tiene un campo `_id`
      name: producto.title,
      price: producto.price,
      quantity: 1,
      imageUrl: producto.image || producto.imageUrl  // Usar la URL correcta de la imagen
    };

    this.cartService.addToCart(cartItem);  // Usamos el método correcto `addToCart`
    producto.isInCart = true;  // Cambiar el estado de isInCart
  }
}
