import { prisma } from "../client/index.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dayjs from "dayjs";

export const getTodosStatus = asyncHandler(async (req, res) => {
  const userId = req.user_id;

  const todos = await prisma.todo.findMany({
    where: { userId },
    select: { status: true },
  });

  const status = todos.reduce((acc, todo) => {
    acc[todo.status] = (acc[todo.status] || 0) + 1;
    return acc;
  }, {});

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo status stats fetched", status));
});

export const getTodosOverTime = asyncHandler(async (req, res) => {
  const userId = req.user_id;

  const todos = await prisma.todo.findMany({
    where: { userId },
    select: { createdAt: true },
  });

  const stats = {};

  todos.forEach((todo) => {
    const date = dayjs(todo.createdAt).format("YYYY-MM-DD");
    stats[date] = (stats[date] || 0) + 1;
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Todo over time fetched", stats));
});

export const getCompletionRate = asyncHandler(async (req, res) => {
  const userId = req.user_id;

  const total = await prisma.todo.count({
    where: { userId },
  });
  const completed = await prisma.todo.count({
    where: { userId, status: "COMPLETED" },
  });
  const padding = await prisma.todo.count({
    where: { userId, status: "PENDING" },
  });

  return res.status(200).json(
    new ApiResponse(200, "Completion rate fetched", {
      total,
      completed,
      padding,
      percentage: total ? ((completed / total) * 100).toFixed(2) : 0,
    })
  );
});
