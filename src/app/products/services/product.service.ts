import { Injectable } from '@angular/core';
import { Product, ProductAPI, ProductDTO, ProductAdapter, ProductDTOAdapter, ProductAPIAdapter } from '../models/product.model';
import { Observable, map, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { environment as env } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private API_BASE_URL = env.API_BASE_URL
  private PRODUCT_PATH = env.PRODUCTS_PATH
  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductDTO> {
    return this.http.get(`${this.API_BASE_URL}${this.PRODUCT_PATH}`).pipe(
      map(response =>(ProductDTOAdapter.adapt(response)))
    );
  }

  checkIfExistsProductID(productID: String): Observable<boolean> {
    return this.http.get<boolean>(`${this.API_BASE_URL}${this.PRODUCT_PATH}/verification/${productID}`)
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get(`${this.API_BASE_URL}${this.PRODUCT_PATH}/${id}`).pipe(
      map(item => (ProductAdapter.adapt(item)))
    );
  }

  addProduct(product: Product): Observable<any> {
    const productBody = ProductAPIAdapter.adapt(product)
    return this.http.post(`${this.API_BASE_URL}${this.PRODUCT_PATH}`, productBody).pipe(
      catchError(this.handleError)
    );
  }

  updateProduct(id: string, product: Product): Observable<any> {
    const productBody = ProductAPIAdapter.adapt(product)
    return this.http.put(`${this.API_BASE_URL}${this.PRODUCT_PATH}/${id}`, productBody).pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.API_BASE_URL}${this.PRODUCT_PATH}/${id}`)
  }
  
  private handleError(error: any): Observable<never>{
    console.error('An error occurred', error);
    return throwError(() => new Error(error.mesasage || 'Server Error'));
  }
}
