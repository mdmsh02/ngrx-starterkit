import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionTypes {
    ToggleProductCode = 'Toggle_Product_Code',
    SetCurrentProduct = 'Set_Current_Product',
    ClearCurrentProduct = 'Clear_Current_Product',
    InitializeCurrentProduct = 'Initialize_Current_Product',
    LoadProduct = 'Load_Product',
    LoadProductSuccess = 'Load_Product_Success',
    LoadProductFail = 'Load_Product_Fail',
    UpdateProduct = 'Update_Product',
    UpdateProductSuccess = 'Update_Product_Success',
    UpdateProductFail = 'Update_Product_Fail'
}
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;
    constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class LoadProduct implements Action {
    readonly type = ProductActionTypes.LoadProduct;
}
export class LoadProductSuccess implements Action {
    readonly type = ProductActionTypes.LoadProductSuccess;
    constructor(public payload: Product[]) {}
}
export class LoadProductFail implements Action {
    readonly type = ProductActionTypes.LoadProductFail;
    constructor(public payload: string) {}
}
export class UpdateProduct implements Action {
    readonly type = ProductActionTypes.UpdateProduct;
    constructor(public payload: Product) {}
}
export class UpdateProductSuccess implements Action {
    readonly type = ProductActionTypes.UpdateProductSuccess;
    constructor(public payload: Product) {}
}
export class UpdateProductFail implements Action {
    readonly type = ProductActionTypes.UpdateProductFail;
    constructor(public payload: string) {}
}
export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export type ProductAction = ToggleProductCode
| SetCurrentProduct
| ClearCurrentProduct
| InitializeCurrentProduct
| LoadProduct
| LoadProductSuccess
| LoadProductFail
| UpdateProduct
| UpdateProductSuccess
| UpdateProductFail;
