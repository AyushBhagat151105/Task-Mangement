import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useDashboardStore = create((set, get) => ({
  todoStatus: [],
  todoOverTime: [],
  todoCounts: null,
  isLoading: false,

  getTodoStatus: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/dashboard/todo-status");
      set({ todoStatus: res.data.data });
    } catch (error) {
      console.log("Error whaile geting Todo Status:- ", error);
      toast.error("Error whaile geting Todo Status");
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getTodoOverTime: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/dashboard/todo-over-time");
      set({ todoOverTime: res.data.data });
    } catch (error) {
      console.log("Error whaile geting Todo Status:- ", error);
      toast.error("Error whaile geting Todo Status");
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getTodoRate: async () => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get("/dashboard/completion-rate");
      set({ todoCounts: res.data });
    } catch (error) {
      console.log("Error whaile geting Todo Status:- ", error);
      toast.error("Error whaile geting Todo Status");
      set({ isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
