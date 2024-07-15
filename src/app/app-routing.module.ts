import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from './static/notfound/notfound.component';

const routes: Routes = [
  {path: 'products', loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule)},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
