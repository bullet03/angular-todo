import { Component } from '@angular/core';
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent {
  todosList: string[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodosList();
    console.log(this.todosList, 'todoList')
  }

  getTodosList() {
    this.todosList = this.todoService.getTodos()
  }
}
