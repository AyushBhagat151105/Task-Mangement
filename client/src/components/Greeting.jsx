import { useAuthStore } from "@/store/useauthStore";
import { useDashboardStore } from "@/store/useDashboardStore";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Progress } from "./ui/progress";
import { useEffect } from "react";

function Greeting() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { todoCounts, getTodoRate, isLoading } = useDashboardStore();

  useEffect(() => {
    if (!authUser) checkAuth();
    getTodoRate();
  }, []);

  const name = authUser?.data?.profile?.name || "User";
  const counts = todoCounts?.data;
  const total = counts?.total || 0;
  const pending = counts?.padding || 0;
  const percentage = parseFloat(counts?.percentage) || 0;

  return (
    <Card className="mb-6 shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          👋 Hello, {isCheckingAuth ? <Skeleton className="w-20 h-6" /> : name}
        </CardTitle>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground space-y-2">
        {isLoading || !counts ? (
          <Skeleton className="w-full h-6" />
        ) : total === 0 ? (
          <p>You have no tasks yet. Start by adding one!</p>
        ) : pending === 0 ? (
          <p>🎉 All {total} tasks completed. Great job!</p>
        ) : (
          <>
            <p>
              You’ve completed <strong>{counts.completed}</strong> out of{" "}
              <strong>{total}</strong> tasks.
              <br />
              <span className="text-yellow-700 font-medium">
                {pending} task{pending > 1 ? "s" : ""} remaining.
              </span>
            </p>

            <div className="pt-2">
              <Progress value={percentage} className="h-2 rounded bg-muted" />
              <p className="text-xs text-muted-foreground pt-1">
                {percentage}% completed
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default Greeting;
