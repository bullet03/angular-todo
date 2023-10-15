import { Todo } from "./todo";
import { v4 as uuidv4 } from 'uuid';

export const TODOS: Todo[] = [
    { id: uuidv4(), name: 'Go shopping', complete: false },
    { id: uuidv4(), name: 'Go swimming', complete: false }
];
