import React from "react";
import { motion } from "framer-motion";
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
        <motion.ul
          className="h-160 overflow-y-auto pt-2 pr-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {data?.map((todo) => (
            <motion.li
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              <TodoItem key={todo.id} todo={todo} />
            </motion.li>
          ))}
        </motion.ul>
      )}
    </>
  );
};
