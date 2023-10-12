import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Todo} from "../todo";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent {
  @Output() getErrorMessageChild = new EventEmitter();
  @Output() updateTodoChildEvent = new EventEmitter();
  @Output() updateClassesChild = new EventEmitter();

  @Input() todoFormChild!: FormGroup;
  @Input() isDisabledChild!: true | null;
  @Input() todoItemChild!: Todo;

  onErrorChildHandle() {
    this.getErrorMessageChild.emit();
  }

  onStylesChange():any {
    this.updateClassesChild.emit();
  }

  onChildInputChange(todo: Todo, val: string) {
    this.updateTodoChildEvent.emit({id: todo.id, name: val});
  }
}
