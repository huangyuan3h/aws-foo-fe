import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import type { TodoType } from "~/server/todo";
import { deleteItem } from "~/server/todo";
import { addItem } from "~/server/todo";
import { getAllTodoItems } from "~/server/todo";


export const loader = async () => {

  const todos: TodoType[] = await getAllTodoItems();
  return json({
    todos,
  });
};


export default function Index() {

  const { todos } = useLoaderData();

  const [todoList, setTodoList] = useState(todos);

  const [val, setVal] = useState<string>('');

  const handleClick = () => {
    const item = addItem(val);
    setVal('');
    setTodoList([...todoList, item]);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setVal(text);
  }

  const handleDeleteClick = (cuid: string) => {
    deleteItem(cuid);
    const filteredResult = todoList.filter(({ id }: TodoType) => id !== cuid);
    setTodoList(filteredResult);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>foo company todo app</h1>
      <input type="text" onChange={handleChange} value={val} /><button onClick={handleClick}>add</button>
      {
        todoList && (
          todoList.map(({ id, text }: TodoType) => {
            return (<><p key={id} >{text}<button onClick={() => handleDeleteClick(id)}>x</button></p></>)
          })
        )
      }
    </div>
  );
}
