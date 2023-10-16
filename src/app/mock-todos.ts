import { v4 as uuidv4 } from 'uuid';
import { Todo, priorities } from "./todo";

export const TODOS: Todo[] = [
    { id: uuidv4(), name: 'Go shopping', complete: false, priority: priorities.low },
    { id: uuidv4(), name: 'Go swimming', complete: false, priority: priorities.low },
    { id: uuidv4(), name: 'Go running', complete: true, priority: priorities.medium }
];
