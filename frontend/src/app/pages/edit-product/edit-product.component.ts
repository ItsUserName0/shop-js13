import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ProductData } from '../../models/product.model';
import { Router } from '@angular/router';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { createProductRequest } from '../../store/products.actions';
import { Observable } from 'rxjs';
import { Category } from '../../models/category.model';
import { fetchCategoriesRequest } from '../../store/categories.actions';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.sass']
})
export class EditProductComponent implements OnInit {
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  error: Observable<string | null>;
  categories: Observable<Category[]>;

  constructor(
    private store: Store<AppState>
  ) {
    this.loading = store.select(state => state.products.createLoading);
    this.error = store.select(state => state.products.createError);
    this.categories = store.select(state => state.categories.items);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCategoriesRequest());
  }

  onSubmit() {
    const productData: ProductData = this.form.value;
    this.store.dispatch(createProductRequest({productData}));
  }
}
