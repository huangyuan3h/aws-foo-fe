import cuid from 'cuid';

export interface TodoType {
    id: string;
    text: string;
}

export let todoList: TodoType[] = [];


export const addItem = (text: string): TodoType => {
    const item = { id: cuid(), text } as TodoType;
    todoList.push(item)
    return item;
}


export const deleteItem = (cuid: string): void => {
    todoList = todoList.filter((i) => i.id !== cuid);
}

export const getAllTodoItems = () => {

    return [];
}