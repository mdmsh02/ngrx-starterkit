import { Action } from '@ngrx/store';

export enum ProductActionTypes {
    ToggleProductCode = 'Toggle_Product_Code'
}
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public payload: boolean) {}
}

export type ProductAction = ToggleProductCode;
