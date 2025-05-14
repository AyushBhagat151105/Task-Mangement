import AddTodoDrawer from "@/components/AddTodoDrawer";
import TodoList from "@/components/TodoList";
import React from "react";

export default function Todo() {
  return (
    <div>
      <AddTodoDrawer />
      <hr className="mt-5 mb-5" />
      <TodoList />
    </div>
  );
}
