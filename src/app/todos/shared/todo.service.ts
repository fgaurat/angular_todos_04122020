import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../core/model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(environment.url_todos)
  }

  deleteTodo(todo: Todo): Observable<any> {
    const url_todo = `${environment.url_todos}/${todo.id}`

    return this.http.delete<any>(url_todo)
  }
  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(environment.url_todos, todo, this.httpOptions)
  }
}
