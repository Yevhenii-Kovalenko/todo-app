import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "@/services/todoService";

export const TodoForm = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");

  const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: (newTodo) => {
      queryClient.setQueryData(["todos"], (oldData = []) => [
        { ...newTodo, id: uuidv4() },
        ...oldData,
      ]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    mutation.mutate({
      title,
      completed: false,
      userId: 1,
    });

    setTitle("");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <form className="my-5 flex items-center gap-3" onSubmit={handleSubmit}>
      <input
        name="todo"
        className="w-full rounded-full bg-gray-100 px-4 py-3 text-gray-800 shadow-md focus:ring-1 focus:ring-gray-500 focus:outline-none"
        type="text"
        value={title}
        onChange={handleChange}
        placeholder="New todo"
      />
      <button
        className="rounded-full bg-gray-100 px-6 py-3 font-medium text-gray-800 shadow-md transition-all focus:outline-none active:scale-95 active:shadow-none disabled:pointer-events-none disabled:opacity-50"
        type="submit"
        disabled={mutation.isLoading || !title.trim()}
      >
        {mutation.isLoading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};
