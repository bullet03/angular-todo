import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private heroesUrl = 'http://localhost:3000/todoItems/';
  constructor(private http: HttpClient) {}

  getTodos(filterOptions: {} = {}) {
    const key = Object.keys(filterOptions)[0];
    const value = Object.values(filterOptions)[0];
    const finalUrl = Object.keys(filterOptions).length > 0 ? `${this.heroesUrl}/?${key}=${value}` : this.heroesUrl;
    return this.http.get<Todo[]>(finalUrl);
  }

  getTodo(id: string) {
    return this.http.get<Todo>(`${this.heroesUrl}/${id}`);
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.heroesUrl, todo);
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(`${this.heroesUrl}/${todo.id}`);
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(`${this.heroesUrl}/${todo.id}`, todo)
  }
}
