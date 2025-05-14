import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./page/Register";
import Todo from "./page/Todo";
import Verify from "./page/Verify";
import Dashboard from "./page/Dashboard";
import { useAuthStore } from "./store/useauthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import DashboardLayout from "./components/DashboardLayout";
import LoginForm from "./page/Lgoin";


function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    const checkUserAuth = async () => {
      await checkAuth();
      // console.log("Auth User:", useAuthStore.getState().authUser);
    };

    checkUserAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            authUser ? <Navigate to="/dashboard" replace /> : <LoginForm />
          }
        />
        <Route
          path="/register"
          element={
            authUser ? <Navigate to="/dashboard" replace /> : <Register />
          }
        />
        <Route path="/verify/:token" element={<Verify />} />

        {/* Protected Routes (auth check inline) */}
        <Route
          path="/dashboard"
          element={
            authUser ? <DashboardLayout /> : <Navigate to="/login" replace />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="todo" element={<Todo />} />
        </Route>

        {/* Redirect root to dashboard if authenticated, otherwise to login */}
        <Route
          path="/"
          element={
            authUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* Redirect unknown routes to dashboard if authenticated, otherwise to login */}
        <Route
          path="*"
          element={
            authUser ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
