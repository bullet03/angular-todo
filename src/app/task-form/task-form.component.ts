import { Component } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task = new FormControl('', [Validators.required, Validators.minLength(3)]);

  onSubmit() {
    console.log('submitted');
  }

  getErrorMessage() {
    if (this.task.hasError('required')) {
      return 'You must enter a value';
    }

    return this.task.hasError('minlength') ? 'Too short, should be at least 3 symbols' : '';
  }
}
