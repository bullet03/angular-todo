import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';
import {TodoService} from "../todo.service";
import {Todo} from "../todo";
import {map} from "rxjs";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  todoItem!: Todo;

  isChecked: boolean = false;
  isDisabled: true | null =  null;
  taskStatus: string = 'low';
  todoId: string = ''

  todoForm: FormGroup = new FormGroup({
    todoItemForm: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  ngOnInit() {
    this.route.params.pipe(map((param) => param['id'])).subscribe((result) => {
      this.todoId = result;
    });
    this.todoItem = this.todoService.getTodo(this.todoId) as Todo;
    this.todoForm.setValue({todoItemForm: this.todoItem!.name});
  }

  constructor(private todoService: TodoService, private location: Location, private route: ActivatedRoute,) {
  }

  updateTodo(todo: Todo, val: string) {
    this.todoService.updateTodo({id: todo.id, name: val});
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

  goBack(): void {
    this.location.back();
  }
}
