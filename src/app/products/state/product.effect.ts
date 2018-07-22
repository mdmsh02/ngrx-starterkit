import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductActionTypes, UpdateProduct, UpdateProductFail } from './product.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import * as productAction from './product.action';
import { Product } from '../product';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions,
        private productService: ProductService) { }
    @Effect()
    loadProducts$ = this.actions$.pipe(
        ofType(productAction.ProductActionTypes.LoadProduct),
        mergeMap((action: productAction.LoadProduct) =>
            this.productService.getProducts().pipe(
                map((products: Product[]) => new productAction.LoadProductSuccess(products)),
            catchError((err) => of(new productAction.LoadProductFail(err)))
        )
        )
    );

    @Effect()
    updateProducts$ = this.actions$.pipe(
        ofType(productAction.ProductActionTypes.UpdateProduct),
        map((action: productAction.UpdateProduct) => action.payload),
        mergeMap((product: Product) =>
            this.productService.updateProduct(product).pipe(
            map((updatedProduct: Product) => new productAction.UpdateProductSuccess(updatedProduct)),
            catchError((err) => of(new productAction.UpdateProductFail(err)))
        )
        )
    );
}
