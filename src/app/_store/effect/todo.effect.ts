import { TodoService } from '../../service/todo.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as ToDoActions from '../action/todo.action';
import ToDo from '../model/todo.model';

@Injectable()
export class ToDoEffects {
  constructor(private toDoService: TodoService, private action$: Actions) {}

  GetToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginGetToDoAction),
      mergeMap(() =>
        this.toDoService.readToDo().pipe(
          map((result: ToDo[]) => {
            return ToDoActions.SuccessGetToDoAction({ payload: result });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  CreateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginCreateToDoAction),
      mergeMap((action) =>
        this.toDoService.createToDo(action.payload).pipe(
          map((result: ToDo[]) => {
            return ToDoActions.SuccessCreateToDoAction({ payload: result });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  UpdateToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginUpdateToDoAction),
      mergeMap((action) =>
        this.toDoService.updateToDo(action.id, action.payload).pipe(
          map((result: ToDo[]) => {
            return ToDoActions.SuccessUpdateToDoAction({ payload: result });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );

  DeleteToDos$: Observable<Action> = createEffect(() =>
    this.action$.pipe(
      ofType(ToDoActions.BeginDeleteToDoAction),
      mergeMap((action) =>
        this.toDoService.deleteToDo(action.id).pipe(
          map((result: ToDo[]) => {
            return ToDoActions.SuccessDeleteToDoAction({ payload: result });
          }),
          catchError((error: Error) => {
            return of(ToDoActions.ErrorToDoAction(error));
          })
        )
      )
    )
  );
}
