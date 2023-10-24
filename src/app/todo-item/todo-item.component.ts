import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {TodoService} from "../todo.service";
import {priorities, Todo} from "../todo";
import {map} from "rxjs";
import {MatSelectChange} from "@angular/material/select";

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  inputName: string = '';
  todoItem!: Todo;
  isDisabled: boolean =  true;
  isComplete!: boolean;
  isSoftDeleted: boolean = false;
  todoPriority = priorities.low;
  todoId: string = ''
  todoForm: FormGroup = new FormGroup({
    todoItemInputForm: new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(3)]),
    todoItemCheckboxForm: new FormControl({value: true, disabled: true})
  });

  ngOnInit() {
    this.route.params.pipe(map((param) => param['id'])).subscribe((result) => {
      this.todoId = result;
    });
    this.todoService.getTodo(this.todoId)
      .subscribe((todo) => {
        this.todoItem = todo;
        this.todoForm.setValue({todoItemInputForm: this.todoItem!.name, todoItemCheckboxForm: this.todoItem!.complete});
        this.inputName = this.todoItem.name;
        this.todoPriority = this.todoItem.priority;
        this.isComplete = this.todoItem.complete;
      });
  }

  constructor(private todoService: TodoService, private location: Location, private route: ActivatedRoute,) {
  }

  onInputChange(val: string) {
    this.inputName = val;
  }

  setBackgroundColorClass() {
    switch (this.todoPriority) {
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

  setInputDecorations() {
    return this.isComplete? 'textDeprecated' : '';
  }

  setClasses() {
    return {
      [this.setInputDecorations()]: true,
      [this.setBackgroundColorClass()]: true
    };
  }

  onCheckboxChange() {
    this.isComplete = !this.isComplete;
    this.isSoftDeleted = !this.isSoftDeleted;
  }

  onSelectChange(event: MatSelectChange) {
    this.todoPriority = event.value;
  }

  getErrorMessage() {
    const formEl = this.todoForm.controls['todoItemInputForm'];
    if (formEl.hasError('required')) {
      return 'You must enter a value';
    }
    return formEl.hasError('minlength') ? 'Too short, should be at least 3 symbols' : '';
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.todoService.updateTodo({
      id: this.todoItem.id,
      name: this.inputName,
      complete: this.isComplete,
      priority: this.todoPriority,
      softDeleted: this.isSoftDeleted,
    })
      .subscribe(() => {
        this.disableControl();
        this.goBack();
      })
  }

  disableControl() {
    this.todoForm.get('todoItemInputForm')?.disable();
    this.todoForm.get('todoItemCheckboxForm')?.disable();
    this.isDisabled = !this.isDisabled;
  }

  enableControl() {
    this.todoForm.get('todoItemInputForm')?.enable();
    this.todoForm.get('todoItemCheckboxForm')?.enable();
    this.isDisabled = !this.isDisabled;
  }

  resetValues() {
    this.inputName = this.todoItem.name;
    this.todoPriority = this.todoItem.priority;
    this.isComplete = this.todoItem.complete;
    this.todoForm.setValue({todoItemInputForm: this.todoItem!.name, todoItemCheckboxForm: this.todoItem!.complete});
  }
}
