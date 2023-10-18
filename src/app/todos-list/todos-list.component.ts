import {Component, OnInit} from '@angular/core';
import {TodoService} from "../todo.service";
import {priorities, Todo} from "../todo";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.css']
})
export class TodosListComponent implements OnInit  {
  todosList: Todo[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodosList();
  }

  getTodosList() {
    this.todoService.getTodos().subscribe((todoItems) => {
      this.todosList = todoItems;
    })
  }

  deleteTodo(todo: Todo) {
    this.todoService.deleteTodo(todo)
      .subscribe((todos) => {
        this.todosList = this.todosList.filter(({id}) => id !== todo.id)
      });
  }

  addTodo(todoName: string) {
    this.todoService.addTodo({id: uuidv4(), name: todoName, complete: false, priority: priorities.low })
      .subscribe((todo) => {
        this.todosList.push(todo);
      });
  }

  toggleDeprecatedClass(isComplete: boolean) {
    return isComplete ? 'textDeprecated' : '';
  }

  onCheckboxChange(todoItem: Todo) {
    const newTodo = {...todoItem, complete: !todoItem.complete};
    // this.todoService.updateTodo({...todo, complete: !todo.complete});
    // this.getTodosList();
    this.todoService.updateTodo(newTodo)
      .subscribe((todo) => {
        this.todosList = this.todosList.map((todo) => {
          if (todo.id === newTodo.id) {
            return newTodo;
          }
          return todo;
        })
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
}
