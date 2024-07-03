import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../services/productos.service';
import { IProducto } from '../interfaces/producto';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    styleUrls: ['./principal.component.scss'],
    standalone: true,
    imports: [RouterLink, CommonModule]
})
export class PrincipalComponent implements OnInit {
    productos: IProducto[] = [];

    constructor(private productosService: ProductosService) {}

    ngOnInit() {
        this.obtenerProductos();
    }

    obtenerProductos() {
        this.productosService.getProductos().subscribe(
            (data: IProducto[]) => {
                this.productos = data.map((producto: IProducto) => {
                    const imageType = this.obtenerTipoImagen(producto.imagen);
                    return { ...producto, imagen: `data:image/${imageType};base64,${producto.imagen}` };
                });
            },
            (error) => {
                console.error('Error al obtener productos', error);
            }
        );
    }

    obtenerTipoImagen(base64String: string): string {
        if (base64String.charAt(0) === '/') return 'jpeg';
        if (base64String.charAt(0) === 'i') return 'png';
        if (base64String.charAt(0) === 'R') return 'gif';
        if (base64String.charAt(0) === 'U') return 'webp';
        return 'jpeg';
    }
}
