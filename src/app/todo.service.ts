import { Injectable } from '@angular/core';
import { TODOS } from './mock-todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  getTodos(): string[] {
    return TODOS;
  }

  addTodo(todo: string): void {
    TODOS.push(todo);
  }
}
