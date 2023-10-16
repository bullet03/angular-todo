export interface Todo {
  id: string;
  name: string;
  complete: boolean;
  priority: priorities;
}

export enum priorities {
  low = 'low',
  medium = 'medium',
  high = 'high'
}
