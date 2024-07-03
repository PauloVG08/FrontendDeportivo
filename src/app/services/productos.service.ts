import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProducto } from '../interfaces/producto';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    private apiUrl = 'https://localhost:7293/api/Producto';

    constructor(private http: HttpClient) { }

    getProductos(): Observable<IProducto[]> {
        return this.http.get<IProducto[]>(`${this.apiUrl}`);
    }

    getProductosPorCategoria(categoria: string): Observable<IProducto[]> {
        return this.http.get<IProducto[]>(`${this.apiUrl}/categoria/${categoria}`);
    }

    agregarProducto(producto: IProducto): Observable<IProducto> {
        return this.http.post<IProducto>(`${this.apiUrl}`, producto);
    }
}
