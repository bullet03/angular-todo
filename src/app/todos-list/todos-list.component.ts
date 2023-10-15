import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";
import { Todo } from "../todo";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit  {
  todosList: Todo[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodosList();
  }

  getTodosList() {
    this.todosList = this.todoService.getTodos();
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo);
    this.getTodosList();
  }

  addTodo(todoName: string) {
    this.todoService.addTodo({id: uuidv4(), name: todoName, complete: false });
    this.getTodosList();
  }

  toggleDeprecatedClass(isComplete: boolean) {
    return isComplete ? 'textDeprecated' : '';
  }
  onCheckboxChange(todo: Todo) {
    this.todoService.updateTodo({...todo, complete: !todo.complete});
    this.getTodosList();
  }
}
