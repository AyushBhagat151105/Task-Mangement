import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  createTodo,
  DeleteTodo,
  getAllTodos,
  updateStatus,
  updateTodo,
} from "../controller/todo.controller.js";

export const todoRouter = Router();

todoRouter.get("/", isAuth, getAllTodos);
todoRouter.post("/create", isAuth, createTodo);
todoRouter.patch("/update/:id", isAuth, updateTodo);
todoRouter.patch("/updatestatus/:id", isAuth, updateStatus);
todoRouter.delete("/delete/:id", isAuth, DeleteTodo);
