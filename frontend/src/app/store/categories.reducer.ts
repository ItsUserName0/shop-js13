import { CategoriesState } from './types';
import { createReducer, on } from '@ngrx/store';
import { fetchCategoriesFailure, fetchCategoriesRequest, fetchCategoriesSuccess } from './categories.actions';

const initialState: CategoriesState = {
  items: [],
  fetchLoading: false,
};

export const categoriesReducer = createReducer(
  initialState,
  on(fetchCategoriesRequest, state => ({...state, fetchLoading: true})),
  on(fetchCategoriesSuccess, (state, {categories}) => ({...state, fetchLoading: false, items: categories})),
  on(fetchCategoriesFailure, state => ({...state, fetchLoading: false})),
);
