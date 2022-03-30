import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CategoriesService } from '../services/categories.service';
import { HelpersService } from '../services/helpers.service';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from './categories.actions';
import { map, mergeMap } from 'rxjs/operators';
import { catchError, of } from 'rxjs';

@Injectable()
export class CategoriesEffects {
  constructor(private actions: Actions,
              private categoriesService: CategoriesService,
              private helpers: HelpersService) {
  }

  fetchCategories = createEffect(() => this.actions.pipe(
    ofType(fetchCategoriesRequest),
    mergeMap(() => this.categoriesService.getCategories().pipe(
      map(categories => fetchCategoriesSuccess({categories})),
      catchError(() => {
        this.helpers.openSnackbar('Could not fetch categories');
        return of(fetchCategoriesFailure());
      })
    ))
  ));
}
