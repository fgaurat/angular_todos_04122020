import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, tap,filter } from 'rxjs/operators';
import { EventBusService } from 'src/app/shared/event-bus.service';
import { Todo } from '../core/model/todo';
import { TodoService } from '../shared/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todos$: Observable<Todo[]>
  displayedColumns: string[] = ['id', 'title', 'completed', 'dueDate', 'actions']
  constructor(private todoService: TodoService, private busService:EventBusService) { }

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos()
    this.busService.bus$.pipe(
      filter(action => action.type==='TODO_ADDED' )
    ).subscribe( actions => this.todos$ = this.todoService.getTodos())
  }

  deleteTodo(todo: Todo): void {

    this.todos$ = this.todoService.deleteTodo(todo).pipe(switchMap(() => this.todoService.getTodos()));

  }

}
