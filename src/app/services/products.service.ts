import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  load = true;
  products : ProductInterface[] = [];
  filteredProduct: ProductInterface[] = [];

  constructor( private http: HttpClient) { 

    this.loadProduct();
  }

  private loadProduct(){
    return new Promise(( resolve, reject ) => {
      this.http.get('https://angular-html-c75a5.firebaseio.com/productos_idx.json').
      subscribe( (resp : ProductInterface[]) => {
           this.products = resp;
           this.load = false;
           resolve();
      });
    });
    
  }

  getProduct( id : String){
     return this.http.get(`https://angular-html-c75a5.firebaseio.com/productos/${ id }.json`);
  }

  searchProduct ( product: string ){
    if(this.products.length === 0){
      this.loadProduct().then(()=>{
        this.filterProduct( product );
      });
    }else{
      this.filterProduct( product );
    }
  }

  private filterProduct( product : string){
    this.filteredProduct = [];
    this.products.forEach( prod => {
      if(prod.categoria.indexOf( product ) >= 0 
    || prod.titulo.toLowerCase().indexOf( product ) >= 0){
        this.filteredProduct.push(prod);
      }
    });
  }
}
