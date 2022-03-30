import { createAction, props } from '@ngrx/store';
import { Product, ProductData } from '../models/product.model';

export const fetchProductsRequest = createAction('[Products] Fetch Request');
export const fetchProductsSuccess = createAction(
  '[Products] Fetch Success',
  props<{products: Product[]}>()
);
export const fetchProductsFailure = createAction(
  '[Products] Fetch Failure'
);

export const createProductRequest = createAction(
  '[Products] Create Request',
  props<{productData: ProductData}>()
);
export const createProductSuccess = createAction(
  '[Products] Create Success'
);
export const createProductFailure = createAction(
  '[Products] Create Failure',
  props<{error: string}>()
);
