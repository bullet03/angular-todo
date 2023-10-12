import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../todo";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent {
  // @Output() getErrorMessageChild = new EventEmitter();
  @Output() updateTodoChildEvent = new EventEmitter();

  @Input() todoFormChild!: FormGroup;
  @Input() todoItemChild!: Todo;

  @Input() isDisabledChild!: true | null;
  @Input() tasksStatusChild: string = 'low';
  @Input() isCheckedChild: boolean = false;

  // onErrorChildHandle() {
  //   this.getErrorMessageChild.emit();
  // }

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
    console.log(this.todoFormChild)
    if (this.todoFormChild.hasError('required')) {
      return 'You must enter a value';
    }

    return this.todoFormChild.hasError('minlength') ? 'Too short, should be at least 3 symbols' : '';
  }
}
