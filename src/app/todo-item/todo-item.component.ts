import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {Todo} from "../todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todoItemsList: Todo[] = [];
  @Input() todoItem!: Todo;
  @Output() deleteTodoEvent = new EventEmitter<Todo>();
  @Output() updateTodoEvent = new EventEmitter<Todo>();

  isChecked: boolean = false;
  isDisabled: true | null =  null;
  taskStatus: string = 'low';

  todoForm: FormGroup = new FormGroup({
    todoItemForm: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  ngOnInit() {
    this.todoForm.setValue({todoItemForm: this.todoItem.name});
  }

  constructor(private todoService: TodoService) {
  }

  deleteTodo(todo: Todo) {
    this.deleteTodoEvent.emit(todo);
  }

  updateTodo(todo: Todo, val: string) {
    this.updateTodoEvent.emit({id: todo.id, name: val});
  }

  setInputBackground() {
    switch(this.taskStatus) {
      case 'high':
        return 'high';
      case 'medium':
        return 'medium';
      case 'low':
        return 'low';
      default:
        return '';
    }
  }

  setInputDecorations() {
    return this.isChecked ? 'textDepricated' : '';
  }

  setClasses() {
    return {
      [this.setInputDecorations()]: true,
      [this.setInputBackground()]: true
    };
  }

  onCheckboxChange() {
    this.isChecked = !this.isChecked;
    this.isDisabled = this.isDisabled ? null : true
  }

  onSelectChange(event: Event) {
    this.taskStatus = (event.target as unknown as HTMLInputElement).value;
  }

  getErrorMessage() {
    if (this.todoForm.hasError('required')) {
      return 'You must enter a value';
    }

    return this.todoForm.hasError('minlength') ? 'Too short, should be at least 3 symbols' : '';
  }
}
