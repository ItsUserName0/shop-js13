import { Product } from '../models/product.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { Category } from '../models/category.model';

export type ProductsState = {
  products: Product[],
  fetchLoading: boolean,
  createLoading: boolean,
  createError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type CategoriesState = {
  items: Category[],
  fetchLoading: boolean,
}

export type AppState = {
  products: ProductsState,
  users: UsersState,
  categories: CategoriesState,
}
