import { useTodoStore } from "@/store/useTodoStore";
import React from "react";
import { Button } from "./ui/button";

function TodoItem({ todo }) {
  const { deleteTodo, updateTodoStatus } = useTodoStore();

  const handleDelete = () => deleteTodo(null, todo.id);
  const handleToggle = () => {
    const newStatus = todo.status === "COMPLETED" ? "PENDING" : "COMPLETED";
    updateTodoStatus({ status: newStatus }, todo.id);
  };

  const isCompleted = todo.status === "COMPLETED";

  return (
    <li
      className={`flex justify-between items-center border p-3 rounded mb-2 ${
        isCompleted ? "bg-green-100" : "bg-yellow-100"
      }`}
    >
      <div>
        <h3 className="font-medium text-lg">{todo.title}</h3>
        <p className="text-sm text-gray-700 mb-1">{todo.description}</p>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            isCompleted ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
          }`}
        >
          {todo.status.toUpperCase()}
        </span>
      </div>
      <div className="flex gap-2">
        <Button onClick={handleToggle} variant="outline">
          Toggle
        </Button>
        <Button onClick={handleDelete} variant="destructive">
          Delete
        </Button>
      </div>
    </li>
  );
}

export default TodoItem;
