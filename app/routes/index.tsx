import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import type { TodoType } from "~/server/todo";
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

  console.log(todos);

  const [val, setVal] = useState<string>('');

  const handleClick = () => {
    addItem(val);
    setVal('');
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setVal(text);
  }

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>foo company todo app</h1>
      <input type="text" onChange={handleChange} value={val} /><button onClick={handleClick}>add</button>
      {
        todos && (
          todos.map(({ id, text }: TodoType) => {
            return <p key={id} >{text}</p>
          })
        )
      }
    </div>
  );
}
