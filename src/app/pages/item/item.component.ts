import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ProductDescription } from '../../interfaces/product-description.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  product : ProductDescription;
  id : string;

  constructor( private route : ActivatedRoute,
              public productsService : ProductsService) { }

  ngOnInit() {

    this.route.params.subscribe( parameters  => {
      this.productsService.getProduct(parameters['id']).
      subscribe( (product : ProductDescription) => {
          this.id = parameters['id'];
          this.product = product;
      })
    });
    
  }

}
