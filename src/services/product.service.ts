import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) { }

  // Método para guardar un producto sin necesidad de incluir userId directamente
  saveProduct(productData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, productData).pipe(
      catchError((error) => {
        console.error('Error al guardar el producto', error);
        return throwError(error);
      })
    );
  }

  // Método para obtener todos los productos
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error al obtener los productos', error);
        return throwError(error);
      }),
      // Transformar los datos para agregar la URL completa para las imágenes
      map((productos) => {
        return productos.map((producto) => {
          // Suponiendo que la ruta en la propiedad 'image' es relativa
          producto.imageUrl = `http://localhost:3000/${producto.image}`;
          return producto;
        });
      })
    );
  }

  // Método para obtener un producto por su ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al obtener el producto', error);
        return throwError(error);
      })
    );
  }

  // Método para actualizar un producto por su ID
  updateProduct(id: string, productData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, productData).pipe(
      catchError((error) => {
        console.error('Error al actualizar el producto', error);
        return throwError(error);
      })
    );
  }

  // Método para eliminar un producto por su ID
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar el producto', error);
        return throwError(error);
      })
    );
  }
}
