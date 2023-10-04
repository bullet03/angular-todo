import { Component } from '@angular/core';
import { TodoService } from "../todo.service";
import { Todo } from "../todo";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent {
  todosList: Todo[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodosList();
    console.log(this.todosList, 'todoList')
  }

  getTodosList() {
    this.todosList = this.todoService.getTodos()
  }

  deleteTodo(todo: Todo) {
    this.todosList = this.todoService.deleteTodo(todo);
  }
}
