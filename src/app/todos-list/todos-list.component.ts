import {Component, OnInit} from '@angular/core';
import {TodoService} from "../todo.service";
import {priorities, Todo} from "../todo";
import {v4 as uuidv4} from "uuid";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit  {
  todosList: Todo[] = [];
  todosListDeleted: Todo[] = [];
  constructor(private todoService: TodoService, private toastr: ToastrService) {}

  ngOnInit() {
    this.getTodosList();
  }

  getTodosList() {
    this.todoService.getTodos({softDeleted: true})
      .subscribe({
        next: (todoItems) => {
          this.todosListDeleted = todoItems;
        },
        error: _ => this.showErrorMessage()
      })
    this.todoService.getTodos({softDeleted: false})
      .subscribe({
        next: (todoItems) => {
          this.todosList = todoItems;
        },
        error: _ => this.showErrorMessage()
      })
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo)
      .subscribe({
        next: (todos) => {
          this.todosList = this.todosList.filter(({id}) => id !== todo.id);
          this.toastr.warning("Todo was deleted",'Warning');
        },
        error: _ => this.showErrorMessage()
      })
  }

  addTodo(todoName: string) {
    this.todoService.addTodo({id: uuidv4(), name: todoName, complete: false, priority: priorities.low, softDeleted: false })
      .subscribe({
        next: (todo) => {
          this.todosList.push(todo);
          this.toastr.success("Todo was added",'Success');
        },
        error: _ => this.showErrorMessage()
      });
  }

  restoreTodo(todoItem: Todo) {
    const restoredTodo = {...todoItem, complete: false, softDeleted: false};
    this.todoService.updateTodo(restoredTodo)
      .subscribe({
        next: (todo) => {
          this.todosList.push(todo);
          this.todosListDeleted = this.todosListDeleted.filter((todoItem) => todoItem.id !== todo.id);
          this.toastr.success("Todo was restored",'Success');
        },
        error: _ => this.showErrorMessage()
      })
  }

  toggleDeprecatedClass(isComplete: boolean) {
    return isComplete ? 'textDeprecated' : '';
  }

  onCheckboxChange(todoItem: Todo) {
    const newTodo = {...todoItem, complete: !todoItem.complete, softDeleted: true};
    this.todoService.updateTodo(newTodo)
      .subscribe({
        next: (todo) => {
          this.todosList = this.todosList.filter((todo) => {
            return todo.id !== todoItem.id;
          });
          this.todosListDeleted.push(newTodo);
          this.toastr.success("Todo was marked as done",'Success');
        },
        error: _ => this.showErrorMessage()
      })
  }

  setBackgroundColorClass(priority: priorities) {
    switch (priority) {
      case priorities.high:
        return 'highPriority'
      case priorities.medium:
        return 'mediumPriority'
      case priorities.low:
        return 'lowPriority'
      default:
        return 'lowPriority'
    }
  }

  private showErrorMessage() {
    this.toastr.error("Something went wrong, for detail information check the console",'Error');
  }
}
