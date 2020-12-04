import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Action } from 'src/app/shared/action';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Todo } from '../core/model/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-reactive-form',
  templateUrl: './todo-reactive-form.component.html',
  styleUrls: ['./todo-reactive-form.component.css']
})
export class TodoReactiveFormComponent implements OnInit {

  todoForm = this.fb.group({
    'todoTitle':['',Validators.required],
    'todoDueDate':['',Validators.required],
    'todoCompleted':[false]
  })


  constructor(private fb:FormBuilder,private todoService: TodoService, private busService:EventBusService) { }

  ngOnInit(): void {
  }

  addTodo(){
    const form = this.todoForm.value
    const todo:Todo = {
      title:form.todoTitle,
      dueDate:new Date(form.todoDueDate).getTime(),
      completed:form.todoCompleted
    }
    this.todoService.addTodo(todo).subscribe( () => {
      const action:Action = {type:"TODO_ADDED"}
      this.busService.dispatch(action)
    } )

  }

}
