export type TodoItem = { id: number; text: string; completed?: boolean };
export type Action = { type: string; [propName: string]: any };
export interface IDispatchShape {
  (action: Action): void;
}

export interface IStoreShape {
  state: IStateShape;
  dispatch: IDispatchShape;
}
export interface IStateShape {
  index: number;
  todolist: TodoItem[];
}

export interface IReducerShape {
  (state: IStateShape | {}, action: Action): IStateShape;
}

export interface IDispatchActionShape {
  (...args: any[]): void;
}

export interface IBoundActionShape {
  [propName: string]: (...args: any[]) => void;
}

export interface IActionCreatorsShape {
  [propName: string]: (...args: any[]) => Action;
}
