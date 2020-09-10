import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ToDoActions from '../../_store/action/todo.action';
import ToDo from '../../_store/model/todo.model';
import ToDoState from '../../_store/state/todo.state';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  constructor(private store: Store<{ todos: ToDoState }>) {
    this.todo$ = store.pipe(select('todos'));
  }

  todo$: Observable<ToDoState>;
  toDoSubscription: Subscription;
  toDoList: ToDo[] = [];
  todoError: Error = null;

  title: string;
  detail: string;
  date: Date = new Date();

  ngOnInit(): void {
    this.toDoSubscription = this.todo$
      .pipe(
        map((state) => {
          this.toDoList = state.toDos;
          this.todoError = state.toDoError;
        })
      )
      .subscribe();

    this.store.dispatch(ToDoActions.BeginGetToDoAction());
  }

  createToDo(): void {
    const todo: ToDo = { title: this.title, detail: this.detail, date: this.date };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.title = '';
    this.detail = '';
    this.date = new Date();
  }

  ngOnDestroy(): void {
    if (this.toDoSubscription) {
      this.toDoSubscription.unsubscribe();
    }
  }
}
