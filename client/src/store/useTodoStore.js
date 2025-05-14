import { create } from "zustand";
import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

const useTodoStore = create((set, get) => ({
  todos: [],
  isLoading: false,

  fetchTodos: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/todo/");

      set({ todos: res.data });
      toast.success(res.data.message);
    } catch (error) {
      console.log("Todo Fetching error:- ", error);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  addTodo: async (data) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/todo/create", data);

      toast.success(res.data.message);
      await get().fetchTodos();
    } catch (error) {
      console.log("Createing Todo error:- ", error);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTodo: async (data, id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch(`/todo/update/${id}`, data);

      toast.success(res.data.message);
      await get().fetchTodos();
    } catch (error) {
      console.log("Updateing Todo error:- ", error);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTodoStatus: async (data, id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.patch(`/todo/updatestatus/${id}`, data);

      toast.success(res.data.message);
      await get().fetchTodos();
    } catch (error) {
      console.log("Updateing Status Todo error:- ", error);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTodo: async (data, id) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.delete(`/todo/delete/${id}`, data);

      toast.success(res.data.message);
      await get().fetchTodos();
    } catch (error) {
      console.log("Deleting Todo error:- ", error);
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getTodosByStatus: (status) => {
    return get().todos.filter((todo) => todo.status === status);
  },
}));
