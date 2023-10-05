import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Todo} from "../todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todoItemsList: Todo[] = [];
  @Input() todoItem!: Todo;
  @Output() deleteTodoEvent = new EventEmitter<Todo>();
  @Output() updateTodoEvent = new EventEmitter<Todo>();

  constructor(private todoService: TodoService) {}

  deleteTodo(todo: Todo) {
    this.deleteTodoEvent.emit(todo);
  }

  updateTodo(todo: Todo, val: string) {
    this.updateTodoEvent.emit({id: todo.id, name: val});
  }
}
