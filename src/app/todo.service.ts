import { Injectable } from '@angular/core';
import { TODOS } from './mock-todos';
import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos: Todo[] = [];
  constructor() {
    this.init();
  }

  init() {
    this.todos = TODOS;
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(({name, id}) => id !== todo.id)
  }
}
