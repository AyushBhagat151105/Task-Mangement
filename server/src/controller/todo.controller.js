import { prisma } from "../client/index.js";
import { ApiError } from "../utils/apiErrors.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllTodos = asyncHandler(async (req, res) => {
  const user_id = req.user_id;

  const todos = await prisma.todo.findMany({
    where: {
      userId: user_id,
    },
  });

  if (!todos) throw new ApiError(400, "Todos not found");

  return res.status(200).json(
    new ApiResponse(200, "Todos fetched successfully", {
      todos: todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        status: todo.status,
        userId: todo.userId,
        createdAt: todo.createdAt,
        updatedAt: todo.updatedAt,
      })),
    })
  );
});

export const createTodo = asyncHandler(async (req, res) => {
  const userId = req.user_id;
  const { title, description } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const newTodo = await prisma.todo.create({
    data: {
      title: title,
      description: description,
      userId: userId,
    },
  });

  if (!newTodo) throw new ApiError(400, "Todo not created");

  return res.status(201).json(
    new ApiResponse(201, "Todo created successfully", {
      data: {
        id: newTodo.id,
        title: newTodo.title,
        description: newTodo.description,
        status: newTodo.status,
        createdAt: newTodo.createdAt,
        updatedAt: newTodo.updatedAt,
      },
    })
  );
});

export const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  if (!id) throw new ApiError(400, "Id is required");

  const updatedTodo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
    },
  });

  if (!updatedTodo) throw new ApiError(400, "Todo not Updated");

  console.log(updatedTodo);

  return res.status(200).json(
    new ApiResponse(200, "Todo Updated", {
      Todo: {
        id: updatedTodo.id,
        title: updatedTodo.title,
        description: updatedTodo.description,
        status: updatedTodo.status,
        createdAt: updatedTodo.createdAt,
        updatedAt: updatedTodo.updatedAt,
      },
    })
  );
});

export const updateStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!id) throw new ApiError(400, "Id is required");
  if (!status) throw new ApiError(400, "Status is required");

  const updatedTodo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      status: status,
    },
  });

  if (!updatedTodo) throw new ApiError(400, "Fail to Update");

  return res.status(200).json(
    new ApiResponse(200, "Todo Status changed", {
      updatedTodo: {
        id: updatedTodo.id,
        title: updatedTodo.title,
        description: updatedTodo.description,
        status: updatedTodo.status,
        createdAt: updatedTodo.createdAt,
        updatedAt: updatedTodo.updatedAt,
      },
    })
  );
});

export const DeleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, "Id is required");

  const DeleteTodo = await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  if (!DeleteTodo) throw new ApiError(400, "Fail to Delete");

  return res.status(200).json(new ApiResponse(200, "Todo Deleted"));
});
