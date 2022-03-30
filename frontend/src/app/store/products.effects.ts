import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../services/products.service';
import {
  createProductFailure,
  createProductRequest, createProductSuccess,
  fetchProductsFailure,
  fetchProductsRequest,
  fetchProductsSuccess
} from './products.actions';
import { mergeMap, map, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';

@Injectable()
export class ProductsEffects {
  fetchProducts = createEffect(() => this.actions.pipe(
    ofType(fetchProductsRequest),
    mergeMap(() => this.productsService.getProducts().pipe(
      map(products => fetchProductsSuccess({products})),
      catchError(() => {
        this.helpers.openSnackbar('Could not get products');
        return of(fetchProductsFailure());
      })
    ))
  ));

  createProduct = createEffect(() => this.actions.pipe(
    ofType(createProductRequest),
    mergeMap(({productData}) => this.productsService.createProduct(productData).pipe(
      map(() => createProductSuccess()),
      tap(() => this.router.navigate(['/'])),
      catchError(() => of(createProductFailure({error: 'Wrong data'})))
    ))
  ));

  constructor(
    private actions: Actions,
    private productsService: ProductsService,
    private router: Router,
    private helpers: HelpersService,
  ) {}
}
