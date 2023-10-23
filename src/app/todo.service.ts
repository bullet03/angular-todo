import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private heroesUrl = 'http://localhost:3000/todoItems/';
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<Todo[]>(this.heroesUrl);
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
