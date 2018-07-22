import { Product } from '../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductAction, ProductActionTypes, UpdateProductFail, UpdateProductSuccess } from './product.action';

export interface State extends fromRoot.State {
    products: ProductState;
}
export interface ProductState {
    showProductCode: boolean;
    currentProductId: number;
    products: Product[];
    error: string;
}
const initialState: ProductState = {
    showProductCode: true,
    currentProductId: 0 || null,
    products: [],
    error: ''
};

const getProductFeatureSelector = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureSelector, state => state.showProductCode);
export const getCurrentProductId = createSelector(
    getProductFeatureSelector,
    state => state.currentProductId
);

export const getCurrentProduct = createSelector(
    getProductFeatureSelector,
    getCurrentProductId,
    (state, currentproductId) => {
        if (currentproductId === 0) {
            return {
                id: 0,
                productName: '',
                productCode: 'NEW',
                description: '',
                starRating: 0
            };
        } else {
            return currentproductId ? state.products.find(p => p.id === currentproductId) : null;
        }
    }
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
                currentProductId: action.payload.id

            };
        case ProductActionTypes.ClearCurrentProduct:
            return {
                ...state,
                currentProductId: null

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
            case ProductActionTypes.UpdateProductSuccess:
            const updatedproduct = state.products.map(
                items => action.payload.id === items.id ? action.payload : items);
            return {
                ...state,
                products: updatedproduct,
                error: ''

            };
        case ProductActionTypes.UpdateProductFail:
            return {
                ...state,
                error: action.payload

            };
        case ProductActionTypes.InitializeCurrentProduct:
            return {
                ...state,
                currentProductId: 0

            };
        default:
            return state;
    }
}
