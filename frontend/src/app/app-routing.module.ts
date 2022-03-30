import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { RoleGuardService } from './services/role-guard.service';

const routes: Routes = [
  {path: '', component: ProductsComponent},
  {
    path: 'products/new',
    component: EditProductComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin']},
  },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
