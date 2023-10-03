import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task = new FormControl('', [Validators.required, Validators.minLength(1)]);

  onSubmit() {
    console.log('submited');
  }

  getErrorMessage() {
    if (this.task.hasError('required')) {
      return 'You must enter a value';
    }

    return this.task.hasError('minLength') ? 'Too short task description' : '';
  }
}
