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

  return (
    <li className="flex justify-between items-center border p-3 rounded mb-2">
      <div>
        <h3 className="font-medium">{todo.title}</h3>
        <p className="text-sm text-gray-500">{todo.status}</p>
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
