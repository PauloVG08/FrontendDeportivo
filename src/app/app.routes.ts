import { Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { ProductosComponent } from './productos/productos.component';
import { ContactoComponent } from './contacto/contacto.component';

export const routes: Routes = [
    { path: 'principal', component: PrincipalComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'contacto', component: ContactoComponent },
    { path: '', redirectTo: '/principal', pathMatch: 'full' }
];
