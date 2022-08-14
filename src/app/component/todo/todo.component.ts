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
  constructor(private store: Store<{ appState: ToDoState }>) {
    this.todo$ = store.pipe(select('appState'));
  }

  todo$: Observable<ToDoState>;
  toDoSubscription: Subscription = new Subscription();
  toDoList: ToDo[] = [];
  todoError: Error = new Error();

  title: string = '';
  detail: string = '';

  ngOnInit(): void {
    this.store.dispatch(ToDoActions.BeginGetToDoAction());
    this.toDoSubscription = this.todo$
      .pipe(
        map((state) => {
          this.toDoList = state.toDos;
          this.todoError = state.toDoError;
        })
      )
      .subscribe();
  }

  selectRow(todo: ToDo): void {
    this.title = todo.title;
    this.detail = todo.detail;
  }

  createToDo(): void {
    const currentDate = new Date();
    const todo: ToDo = {
      title: this.title,
      detail: this.detail,
      date: currentDate.toISOString(),
    };
    this.store.dispatch(ToDoActions.BeginCreateToDoAction({ payload: todo }));
    this.title = '';
    this.detail = '';
  }

  updateToDo(i: number): void {
    const currentDate = new Date();
    const todo: ToDo = {
      title: this.title,
      detail: this.detail,
      date: currentDate.toISOString(),
    };
    this.store.dispatch(
      ToDoActions.BeginUpdateToDoAction({ id: i, payload: todo })
    );
    this.title = '';
    this.detail = '';
  }

  deleteToDo(i: number): void {
    this.store.dispatch(ToDoActions.BeginDeleteToDoAction({ id: i }));
    this.title = '';
    this.detail = '';
  }

  ngOnDestroy(): void {
    if (this.toDoSubscription) {
      this.toDoSubscription.unsubscribe();
    }
  }
}
