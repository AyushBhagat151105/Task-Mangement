import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  getCompletionRate,
  getTodosOverTime,
  getTodosStatus,
} from "../controller/dashboard.controller.js";

export const dashboardRouter = Router();

dashboardRouter.get("/todo-status", isAuth, getTodosStatus);
dashboardRouter.get("/todo-over-time", isAuth, getTodosOverTime);
dashboardRouter.get("/completion-rate", isAuth, getCompletionRate);
