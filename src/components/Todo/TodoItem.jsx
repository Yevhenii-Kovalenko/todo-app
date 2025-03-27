"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "@/services/todoService";

export const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const [isVisible, setIsVisible] = useState(true);

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deletedId) => {
      setIsVisible(false);
      setTimeout(() => {
        queryClient.setQueryData(["todos"], (oldData) => {
          if (!oldData) return [];
          return oldData.filter((todo) => todo.id !== deletedId);
        });
      }, 300);
    },
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.li
          initial={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50, transition: { duration: 0.3 } }}
          className="mb-2 flex items-center justify-between rounded-xl bg-white p-4 shadow-md transition-all"
        >
          <span className="w-full max-w-100 break-words text-gray-800">
            {todo.title}
          </span>
          <button
            className="text-red-700 transition-all duration-300 hover:scale-85 active:scale-80"
            title="Delete"
            onClick={() => deleteMutation.mutate(todo.id)}
          >
            ❌
          </button>
        </motion.li>
      )}
    </AnimatePresence>
  );
};
