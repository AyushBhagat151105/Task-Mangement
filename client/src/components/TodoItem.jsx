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
      className={`flex justify-between items-center border p-3 rounded mb-2 bg-[--color-card] text-[--color-foreground] border-[--color-border]`}
    >
      <div>
        <h3 className="font-medium text-lg">{todo.title}</h3>
        <p className="text-sm text-[--color-muted-foreground] mb-1">
          {todo.description}
        </p>
        <span
          className="text-xs font-semibold px-2 py-1 rounded-full"
          style={{
            backgroundColor: isCompleted
              ? "var(--color-status-completed-bg)"
              : "var(--color-status-pending-bg)",
            color: isCompleted
              ? "var(--color-status-completed-text)"
              : "var(--color-status-pending-text)",
          }}
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
