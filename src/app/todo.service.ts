import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TODOS } from './mock-todos';
import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private heroesUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>('http://localhost:3000/todoItems/');
  }

  getTodo(id: string) {
    // return this.todos.find((todo) => {
    //   return todo.id === id
    // });
    return this.http.get<Todo>(`http://localhost:3000/todoItems/${id}`);
  }

  addTodo(todo: Todo) {
    // this.todos.push(todo);
    return this.http.post<Todo>(`http://localhost:3000/todoItems/`, todo);
  }

  deleteTodo(todo: Todo) {
    // this.todos = this.todos.filter(({name, id}) => id !== todo.id)
    return this.http.delete(`http://localhost:3000/todoItems/${todo.id}`);
  }

  updateTodo(todo: Todo) {
    // this.todos = this.todos.map((todo) => {
    //   if (todo.id === todoItem.id) {
    //     return todoItem;
    //   }
    //   return todo;
    // });
    console.log(todo, 'incomeTodo');
    return this.http.put<Todo>(`http://localhost:3000/todoItems/${todo.id}`, todo)
  }
}
