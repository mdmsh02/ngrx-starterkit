import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductAction, ProductActionTypes } from './product.action';

export interface State extends fromRoot.State {
    products: ProductState;
}
export interface ProductState {
    showProductCode: boolean;
    currentProduct: Product;
    products: Product[];
    error: string;
}
const initialState: ProductState = {
    showProductCode: true,
    currentProduct: null,
    products: [],
    error: ''
};

const getProductFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureSelector, state => state.showProductCode);

export const getCurrentProduct = createSelector(
    getProductFeatureSelector,
    state => state.currentProduct
);

export const getProducts = createSelector(
    getProductFeatureSelector,
    state => state.products
);

export const getErrors = createSelector(
    getProductFeatureSelector,
    state => state.error
);

export function reducer(state = initialState, action: ProductAction): ProductState {
    switch (action.type) {
        case ProductActionTypes.ToggleProductCode:
            return {
                ...state,
                showProductCode: action.payload

            };
            case ProductActionTypes.SetCurrentProduct:
            return {
                ...state,
                currentProduct: {...action.payload}

            };
            case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProduct: null

            };
            case ProductActionTypes.LoadProductSuccess:
            return {
                ...state,
                products: action.payload,
                error: ''

            };
            case ProductActionTypes.LoadProductFail:
            return {
                ...state,
                products: [],
                error: action.payload

            };
            case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProduct: {
                    id: 0,
                    productName: '',
                    productCode: 'NEW',
                    description: '',
                    starRating: 0
                }

            };
        default:
            return state;
    }
}
