import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { TodoService } from "../todo.service";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task = new FormControl('', [Validators.required, Validators.minLength(3)]);

  constructor(private todoService: TodoService) {
  }
  onSubmit() {
    this.todoService.addTodo(this.task.value!);
  }

  getErrorMessage() {
    if (this.task.hasError('required')) {
      return 'You must enter a value';
    }

    return this.task.hasError('minlength') ? 'Too short, should be at least 3 symbols' : '';
  }
}
