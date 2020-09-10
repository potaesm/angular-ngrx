import { Injectable } from '@angular/core';
import ToDo from '../_store/model/todo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  private toDos: ToDo[] = [new ToDo('Initial data', 'Hello world', new Date())];

  createToDo(toDo: ToDo): Observable<ToDo> {
    this.toDos = this.toDos.concat(toDo);
    return of(toDo);
  }

  readToDo(): Observable<ToDo[]> {
    return of(this.toDos);
  }
}
