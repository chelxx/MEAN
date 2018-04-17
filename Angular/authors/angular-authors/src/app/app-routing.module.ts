import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { AddquoteComponent } from './addquote/addquote.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AllquotesComponent } from './allquotes/allquotes.component';

const routes: Routes = [
	{path: 'home',component:HomeComponent},
	{path: 'add',component:AddComponent},
  {path: 'edit/:id',component:EditComponent},
  {path: 'quotes/:id',component:QuotesComponent},
  {path: 'allquotes',component:AllquotesComponent},
	{path: 'addq/:id',component:AddquoteComponent},  
  { path: '', pathMatch:'full', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }