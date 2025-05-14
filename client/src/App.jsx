import { Routes, Route } from "react-router-dom";
import Lgoin from "./page/Lgoin";
import Register from "./page/Register";
import Todo from "./page/Todo";
import Verify from "./page/verify";
import Dashboard from "./page/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStore } from "./store/useauthStore";
import { useEffect } from "react";

function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Lgoin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify/:token" element={<Verify />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Navbar />}>
            <Route index element={<Dashboard />} />
            <Route path="todo" element={<Todo />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
