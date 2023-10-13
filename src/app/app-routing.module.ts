import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TodoItemComponent} from "./todo-item/todo-item.component";
import {TodosListComponent} from "./todos-list/todos-list.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', component: TodosListComponent },
  { path: 'todo/:id', component: TodoItemComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
