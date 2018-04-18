import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { ProductComponent } from './product/product.component';
import { OneproductComponent } from './oneproduct/oneproduct.component';

const routes: Routes = [
  {path: 'home',component:HomeComponent},
	{path: 'add',component:AddComponent},
  {path: 'product',component:ProductComponent},
  {path: 'oneproduct/:id',component:OneproductComponent},
  { path: '', pathMatch:'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
