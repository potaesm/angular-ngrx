import { Injectable } from '@angular/core';
import ToDo from '../_store/model/todo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
    constructor() {
        // Choose type of the storage
        this.localStorage = window.sessionStorage;
        // this.localStorage = window.localStorage;
      }
    
      private localStorage: Storage;
      private key = 'toDo';
    
      createToDo(toDo: ToDo): Observable<ToDo[]> {
        const currentValue = this.getCurrentValue();
        const newValue = [...currentValue, toDo];
        this.localStorage.setItem(
          this.key,
          JSON.stringify(newValue)
        );
        return of(newValue);
      }
    
      readToDo(): Observable<ToDo[]> {
        const currentValue = this.getCurrentValue();
        return of(currentValue);
      }
    
      updateToDo(id: number, toDo: ToDo): Observable<ToDo[]> {
        const currentValue = this.getCurrentValue();
        currentValue.splice(id, 1, toDo);
        this.localStorage.setItem(
          this.key,
          JSON.stringify(currentValue)
        );
        return of(currentValue);
      }
    
      deleteToDo(id: number): Observable<ToDo[]> {
        const currentValue = this.getCurrentValue();
        currentValue.splice(id, 1);
        this.localStorage.setItem(
          this.key,
          JSON.stringify(currentValue)
        );
        return of(currentValue);
      }
    
      getCurrentValue(): any[] {
        const item = this.localStorage.getItem(this.key);
        if (!!item) {
          return JSON.parse(item);
        }
        return [];
      }
    
      get isLocalStorageSupported(): boolean {
        return !!this.localStorage;
      }
}
