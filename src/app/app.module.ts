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
import { HttpClientModule,provideHttpClient, withFetch  } from '@angular/common/http';
import { NavbarModule } from './components/navbar/navbar.module'; // Importa el módulo, no el componente
import { CarouselModule } from 'primeng/carousel';  
import { ContactoComponent } from './components/contacto/contacto.component';
import { CatalogoComponent } from './components/Catalogo/catalogo.component';
import { HeaderComponent } from './components/header/header.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenubarModule } from 'primeng/menubar'; 
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './components/carrito/carrito.component';


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
    CarritoComponent
    
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
    NavbarModule 
  ],
  providers: [
    MessageService,
    provideHttpClient(withFetch()), 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
