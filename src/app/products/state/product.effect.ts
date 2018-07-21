import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from '../product.service';
import { ProductActionTypes } from './product.action';
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
        ofType(ProductActionTypes.LoadProduct),
        mergeMap((action: productAction.LoadProduct) => this.productService.getProducts().pipe(
            map((products: Product[]) => new productAction.LoadProductSuccess(products)),
            catchError((err) => of(new productAction.LoadProductFail(err)))
        )
        )
    );
}
