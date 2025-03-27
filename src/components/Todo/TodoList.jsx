import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "@/services/todoService";
import { TodoItem } from "./TodoItem";
import { Spinner } from "../Spinner";

export const TodoList = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 5000,
  });

  if (isLoading) return <Spinner />;
  if (error) return <p>Error loading data</p>;

  return (
    <>
      {data?.length === 0 ? (
        <p className="text-center text-2xl font-semibold">Todo list empty...</p>
      ) : (
        <ul className="h-160 overflow-y-auto pr-2">
          {data?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </>
  );
};
