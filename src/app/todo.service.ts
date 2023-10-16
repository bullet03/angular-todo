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
    console.log(this.todos, 'this todos');
    return this.todos;
  }

  getTodo(id: string) {
    return this.todos.find((todo) => {
      return todo.id === id
    });
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(({name, id}) => id !== todo.id)
  }

  updateTodo(todoItem: Todo): void {
    this.todos = this.todos.map((todo) => {
      if (todo.id === todoItem.id) {
        return todoItem;
      }
      return todo;
    });
  }
}
