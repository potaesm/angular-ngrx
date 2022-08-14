import { createAction, props } from '@ngrx/store';
import ToDo from '../model/todo.model';

export const BeginGetToDoAction = createAction('[ToDo] - Begin Get ToDo');

export const SuccessGetToDoAction = createAction(
  '[ToDo] - Success Get ToDo',
  props<{ payload: ToDo[] }>()
);

export const BeginCreateToDoAction = createAction(
  '[ToDo] - Begin Create ToDo',
  props<{ payload: ToDo }>()
);

export const SuccessCreateToDoAction = createAction(
  '[ToDo] - Success Create ToDo',
  props<{ payload: ToDo[] }>()
);

export const BeginUpdateToDoAction = createAction(
  '[ToDo] - Begin Update ToDo',
  props<{ id: number; payload: ToDo }>()
);

export const SuccessUpdateToDoAction = createAction(
  '[ToDo] - Success Update ToDo',
  props<{ payload: ToDo[] }>()
);

export const BeginDeleteToDoAction = createAction(
  '[ToDo] - Begin Delete ToDo',
  props<{ id: number }>()
);

export const SuccessDeleteToDoAction = createAction(
  '[ToDo] - Success Delete ToDo',
  props<{ payload: ToDo[] }>()
);

export const ErrorToDoAction = createAction('[ToDo] - Error', props<Error>());
