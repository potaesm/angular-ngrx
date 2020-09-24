import ToDo from '../model/todo.model';

export default class ToDoState {
  toDos: Array<ToDo>;
  toDoError: Error;
}

export const initializeState = (): ToDoState => {
  return { toDos: new Array<ToDo>(), toDoError: null };
};
