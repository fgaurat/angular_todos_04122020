import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Action } from './action';

@Injectable({
  providedIn: 'root'
})
export class EventBusService {


  private bus = new Subject<Action>()
  bus$ = this.bus.asObservable()

  constructor() { }

  dispatch(action:Action){
    this.bus.next(action)
  }

}
