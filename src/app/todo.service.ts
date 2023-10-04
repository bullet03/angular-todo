import { Injectable } from '@angular/core';
import { TODOS } from './mock-todos';
import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): Todo[] {
    return TODOS;
  }

  addTodo(todo: Todo): void {
    TODOS.push(todo);
  }

  deleteTodo(todo: Todo): Todo[] {
    return TODOS.filter(({name, id}) => id !== todo.id);
  }
}
