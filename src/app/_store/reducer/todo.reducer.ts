import { Action, createReducer, on } from '@ngrx/store';
import * as ToDoActions from '../action/todo.action';
import ToDo from '../model/todo.model';
import ToDoState, { initializeState } from '../state/todo.state';

export const intialState = initializeState();

const reducer = createReducer(
    intialState,
    on(ToDoActions.GetToDoAction, state => state),
    on(ToDoActions.CreateToDoAction, (state: ToDoState, toDo: ToDo) => {
        return { ...state, toDos: [...state.toDos, toDo], toDoError: null };
    }),
    on(ToDoActions.SuccessGetToDoAction, (state: ToDoState, { payload }) => {
        return { ...state, toDos: payload };
    }),
    on(ToDoActions.SuccessCreateToDoAction, (state: ToDoState, { payload }) => {
        return { ...state, toDos: [...state.toDos, payload], toDoError: null };
    }),
    on(ToDoActions.ErrorToDoAction, (state: ToDoState, error: Error) => {
        console.log(error);
        return { ...state, toDoError: error };
    })
);

export function ToDoReducer(state: ToDoState | undefined, action: Action): object {
    return reducer(state, action);
}
