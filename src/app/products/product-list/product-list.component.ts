import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromState from '../state/product.reducer';
import * as productActions from '../state/product.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  errorMessage$: Observable<string>;

  constructor(
    private store: Store<fromState.State>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.store
      .pipe(select(fromState.getCurrentProduct))
      .subscribe(currentProduct => (this.selectedProduct = currentProduct));
    this.store.dispatch(new productActions.LoadProduct());
    this.store
      .pipe(select(fromState.getProducts))
      .subscribe((products: Product[]) => (this.products = products));
    this.store
      .pipe(select(fromState.getShowProductCode))
      .subscribe(showProductCode => (this.displayCode = showProductCode));
    this.errorMessage$ = this.store.pipe(select(fromState.getErrors));
  }

  ngOnDestroy(): void {}

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
