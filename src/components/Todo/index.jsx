"use client";

import React from "react";
import { TodoForm } from "../Form";
import { TodoList } from "./TodoList";

export const Todo = () => {
  return (
    <div className="mx-auto h-210 w-full max-w-125 rounded-3xl bg-amber-200 p-4 shadow-xl">
      <h1 className="text-center text-3xl font-bold">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
};
