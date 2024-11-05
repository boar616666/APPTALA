import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { CatalogoComponent } from './components/Catalogo/catalogo.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]  // Ruta protegida por AuthGuard
  },
  {
    path: 'catalogo',       // Ruta para Catalogo
    component: CatalogoComponent,
    canActivate: [AuthGuard]  // Puedes protegerla si es necesario
  },
  {
    path: 'contacto',        // Ruta para Contacto
    component: ContactoComponent,
    canActivate: [AuthGuard]  // Puedes protegerla si es necesario
  },
  {
    path: 'carrito',        // Ruta para Contacto
    component: CarritoComponent,
    canActivate: [AuthGuard]  // Puedes protegerla si es necesario
  },
  {
    path: 'producto',        // Ruta para Producto
    component: ProductoComponent,
    canActivate: [AuthGuard]  // Puedes protegerla si es necesario
  },
  {
    path: '',
    redirectTo: 'login',      // Redirige a login por defecto si no está autenticado
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'        // Redirige a home en caso de ruta no encontrada
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
