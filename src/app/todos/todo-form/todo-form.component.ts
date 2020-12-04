import { Component, OnInit } from '@angular/core';
import { Action } from 'src/app/shared/action';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Todo } from '../core/model/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  todoForm: Todo = {
    title: "",
    completed: false,
    dueDate: 0
  }

  constructor(private todoService: TodoService, private busService:EventBusService) { }

  ngOnInit(): void {
  }


  addTodo() {

    const todo = {
      ...this.todoForm,
      dueDate: new Date(this.todoForm.dueDate).getTime()
    }

    this.todoService.addTodo(todo).subscribe( () => {
      const action:Action = {type:"TODO_ADDED"}
      this.busService.dispatch(action)
    } )

  }
}
