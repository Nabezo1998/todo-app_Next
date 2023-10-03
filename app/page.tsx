"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";

export default function Home() {
  interface Todo {
    id: number | null;
    name: string | undefined;
  }
  const [todoInput, setTodoInput] = useState<Todo>({
    id: null,
    name: "",
  });
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      name: "study Next.js",
    },
    {
      id: 2,
      name: "study PHP",
    },
    {
      id: 3,
      name: "study Database",
    },
  ]);
  const [error, setError] = useState<boolean>(false);
  const clearInput = () => {
    setTodoInput({
      id: null,
      name: "",
    });
  };
  const inputTodo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTodoInput({
      id: todoInput.id || null,
      name: event.target.value,
    });
  };
  const handleAddTodo = () => {
    if (todoInput.name === "") {
      setError(true);
      return
    };
    setError(false);
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        name: todoInput.name,
      },
    ]);
    clearInput();
  };
  const handleDelete = (id: number | null): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleInput = (todo: Todo): void => {
    setTodoInput(todo);
    handleDelete(todo.id);
  };
  const handleUpdate = () => {
    if (todoInput.name === "") {
      setError(true);
      return
    };
    setError(false);
    setTodos([
      ...todos,
      {
        id: todoInput.id,
        name: todoInput.name,
      },
    ]);
    clearInput();
  };

  return (
    <>
      <header className={styles.header}>
        <Image
          src="/nextjs-icon.png"
          width={200}
          height={80}
          alt=""
          priority={true}
        ></Image>
      </header>
      <main className={styles.main}>
        <div>
          {error && (<p className={styles.error}>fill in the blank please</p>)}
          <input type="text" value={todoInput.name} onChange={inputTodo} />
          <button onClick={todoInput.id ? handleUpdate : handleAddTodo}>
            {todoInput.id ? "Update" : "Add"}
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li className={styles.list} key={todo.id}>
              {todo.name}
              <button onClick={() => handleInput(todo)}>Update</button>
              <button onClick={() => handleDelete(todo.id)}>Completed</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
