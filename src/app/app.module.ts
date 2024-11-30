import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from './primeng.module';  
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  
import { MessageService } from 'primeng/api';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NavbarModule } from './components/navbar/navbar.module'; 
import { CarouselModule } from 'primeng/carousel';  
import { ContactoComponent } from './components/contacto/contacto.component';
import { CatalogoComponent } from './components/Catalogo/catalogo.component';
import { HeaderComponent } from './components/header/header.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar'; 
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { GestionProductoComponent } from './components/gestionProducto/gestion-Producto.component';
import { EditarProductoComponent } from './components/EditarProductoComponent/editar-producto.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PagoDialogComponent } from './components/carrito/pago-dialog/pago-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ContactoComponent,
    CatalogoComponent,
    ProductoComponent,
    CarritoComponent,
    GestionProductoComponent,
    EditarProductoComponent,
    PagoDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule,
    PrimengModule,          
    CarouselModule,  
    RouterModule,
    SplitButtonModule,
    MenubarModule,
    NavbarModule,
    MatDialogModule, 
    MatButtonModule,
    MatFormFieldModule,  // Asegúrate de agregar este módulo
    MatInputModule       // Asegúrate de agregar este módulo
  ],
  providers: [
    MessageService,
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
