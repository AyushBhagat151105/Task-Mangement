import { create } from "zustand";

import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigninUp: false,
  isLoggingIn: false,
  isCheckingAuth: false,

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const res = await axiosInstance.get("/auth/");
      console.log(res);

      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checking auth", error);
      toast.error("Not Logedin");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);

      set({ authUser: res.data });

      toast.success(res.data.message);
    } catch (error) {
      console.log("Error in Login", error);
      toast.error("Email or Password wrong");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signup: async (data) => {
    set({ isSigninUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
      toast.success("Verification has been send...");
    } catch (error) {
      console.log("Error signing up", error);
      toast.error("Error signing up");
    } finally {
      set({ isSigninUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },

  verifyemail: async (token) => {
    try {
      await axiosInstance.post(`/auth/verify-email/${token}`);
      toast.success("verify-email successful");
    } catch (error) {
      console.log("Error logging out", error);
      toast.error("Error logging out");
    }
  },
}));
