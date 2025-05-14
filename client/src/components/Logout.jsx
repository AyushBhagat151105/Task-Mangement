import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useauthStore";

function LogoutButton() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <Button onClick={logout} variant="destructive">
      Logout
    </Button>
  );
}

export default LogoutButton;
