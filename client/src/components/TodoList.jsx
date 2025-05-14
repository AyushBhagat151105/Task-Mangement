import { useEffect, useState } from "react";

import TodoItem from "./TodoItem";
import { Loader } from "lucide-react";
import { useTodoStore } from "@/store/useTodoStore";

export default function TodoList() {
  const { todos, fetchTodos, isLoading, getTodosByStatus } = useTodoStore();
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos =
    statusFilter === "all" ? todos : getTodosByStatus(statusFilter);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-medium">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded text-sm"
        >
          <option value="all">All</option>
          <option value="PENDING">Pending</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
        </div>
      ) : filteredTodos.length === 0 ? (
        <p className="text-gray-500">No todos found.</p>
      ) : (
        <ul>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
