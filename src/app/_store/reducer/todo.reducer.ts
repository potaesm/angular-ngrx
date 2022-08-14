import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from '../action/todo.action';
import ToDoState, { initializeState } from '../state/todo.state';

export const intialState = initializeState();

const reducer = createReducer(
  intialState,
  on(ToDoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, toDos: payload };
  }),
  on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, toDos: payload };
  }),
  on(ToDoActions.SuccessUpdateToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, toDos: payload };
  }),
  on(ToDoActions.SuccessDeleteToDoAction, (state: ToDoState, { payload }) => {
    return { ...state, toDos: payload };
  }),
  on(ToDoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
    console.log(error);
    return { ...state, toDoError: error };
  })
);

export function ToDoReducer(
  state: ToDoState | undefined,
  action: Action
): ToDoState {
  return reducer(state, action);
}
