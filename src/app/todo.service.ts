import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Todo } from "./todo";
import {calculateUrlWithParams} from "../helpers/calculateUrl";
import {catchError, Observable, of, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private heroesUrl = 'http://localhost:3000/todoItems/';
  constructor(private http: HttpClient) {}

  getTodos(filterOptions: {} = {}) {
    const finalUrl = calculateUrlWithParams(this.heroesUrl, filterOptions);
    return this.http.get<Todo[]>(finalUrl).pipe(
      retry(2),
      catchError(this.handleError('getTodos'))
    );
  }

  getTodo(id: string) {
    return this.http.get<Todo>(`${this.heroesUrl}/${id}`).pipe(
      retry(2),
      catchError(this.handleError('get Todo'))
    );
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.heroesUrl, todo).pipe(
      retry(2),
      catchError(this.handleError('add Todo'))
    );
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(`${this.heroesUrl}/${todo.id}`).pipe(
      retry(2),
      catchError(this.handleError('delete Todo'))
    );
  }

  updateTodo(todo: Todo) {
    return this.http.put<Todo>(`${this.heroesUrl}/${todo.id}`, todo).pipe(
      retry(2),
      catchError(this.handleError('update Todo'))
    );
  }

  private handleError(operation = 'operation') {
    return(error: HttpErrorResponse):Observable<any> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`)
      return of();
    }
  }
}
