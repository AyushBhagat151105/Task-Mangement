import { useAuthStore } from "@/store/useauthStore";
import { Loader } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const authUser = useAuthStore((state) => state.authUser);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return authUser ? <Outlet /> : <Navigate to="/login" replace />;
}
