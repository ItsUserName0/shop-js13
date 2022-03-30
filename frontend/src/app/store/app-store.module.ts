import { NgModule } from '@angular/core';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { productsReducer } from './products.reducer';
import { usersReducer } from './users.reducer';
import { categoriesReducer } from './categories.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './products.effects';
import { UsersEffects } from './users.effects';
import { CategoriesEffects } from './categories.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  products: productsReducer,
  users: usersReducer,
  categories: categoriesReducer,
};

const effects = [ProductsEffects, UsersEffects, CategoriesEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule],
})
export class AppStoreModule {}
