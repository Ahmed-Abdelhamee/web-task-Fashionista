import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './admin/dash-board/dash-board.component';
import { HomeComponent } from './home/home.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopsProductsComponent } from './shops-products/shops-products.component';
import { CategoryComponent } from './category/category.component';
import { ChatUsComponent } from './chat-us/chat-us.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"shops/:id",component:CategoryComponent},
  {path:"shops/:id/:id",component:ShopsComponent},
  {path:"shops/:id/:id/:id",component:ShopsProductsComponent},
  {path:"dash",component:DashBoardComponent},
  {path:"chat-us",component:ChatUsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
