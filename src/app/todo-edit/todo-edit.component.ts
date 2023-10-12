import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from "../todo";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  @Output() updateTodoChildEvent = new EventEmitter();

  @Input() todoItemChild!: Todo;

  @Input() isDisabledChild!: true | null;
  @Input() tasksStatusChild: string = 'low';
  @Input() isCheckedChild: boolean = false;

  formControlChild = new FormControl('', [Validators.required, Validators.minLength(3)])

  ngOnInit() {
    this.formControlChild.setValue(this.todoItemChild.name);
  }

  onChildInputChange(todo: Todo, val: string) {
    this.updateTodoChildEvent.emit({id: todo.id, name: val});
  }

  setInputBackground() {
    switch(this.tasksStatusChild) {
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
    return this.isCheckedChild ? 'textDeprecated' : '';
  }

  setClasses() {
    return {
      [this.setInputDecorations()]: true,
      [this.setInputBackground()]: true
    };
  }

  getErrorMessage() {
    if (this.formControlChild.hasError('required')) {
      return 'You must enter a value';
    }

    return this.formControlChild.hasError('minlength') ? 'Too short, should be at least 3 symbols' : '';
  }
}
