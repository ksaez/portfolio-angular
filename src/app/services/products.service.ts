import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  load = true;
  products : ProductInterface[] = [];

  constructor( private http: HttpClient) { 

    this.loadProduct();
  }

  private loadProduct(){
     this.http.get('https://angular-html-c75a5.firebaseio.com/productos_idx.json').
     subscribe( (resp : ProductInterface[]) => {
          
         console.log(resp);
          this.products = resp;
         this.load = false;
     });
  }
}
