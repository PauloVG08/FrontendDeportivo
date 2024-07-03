import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos.service';
import { CommonModule } from '@angular/common';
import { IProducto } from '../interfaces/producto';

@Component({
    selector: 'app-productos',
    templateUrl: './productos.component.html',
    styleUrls: ['./productos.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class ProductosComponent implements OnInit {
    productos: IProducto[] = [];
    productosFiltrados: IProducto[] = [];
    terminoBusqueda: boolean = false;

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
                this.productosFiltrados = [...this.productos];
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

    buscarProductos(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const termino = inputElement.value.trim().toLowerCase();
        if (termino) {
            this.productosFiltrados = this.productos.filter(producto =>
                producto.nombre.toLowerCase().includes(termino)
            );
        } else {
            this.reestablecerProductos();
        }
        this.terminoBusqueda = true;
    }

    reestablecerProductos() {
        this.productosFiltrados = [...this.productos];
    }

    filtrarPorCategoria(categoria: string) {
        if (categoria === 'todos') {
            this.obtenerProductos();
        } else {
            this.productosService.getProductosPorCategoria(categoria).subscribe(
                (data: IProducto[]) => {
                    this.productos = data.map((producto: IProducto) => {
                        const imageType = this.obtenerTipoImagen(producto.imagen);
                        return { ...producto, imagen: `data:image/${imageType};base64,${producto.imagen}` };
                    });
                    this.productosFiltrados = [...this.productos];
                },
                (error) => {
                    console.error(`Error al obtener productos de la categoría ${categoria}`, error);
                }
            );
        }
    }
}
