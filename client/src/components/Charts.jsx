import React, { useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useDashboardStore } from "@/store/useDashboardStore";

const COLORS = ["#22c55e", "#facc15"];

function Charts() {
  const { todoStatus, todoOverTime, getTodoStatus, getTodoOverTime } =
    useDashboardStore();

  useEffect(() => {
    getTodoStatus();
    getTodoOverTime();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Todo Status</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          {todoStatus && todoStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={todoStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {todoStatus.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          )}
        </CardContent>
      </Card>

      {/* Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Todos Over Time</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          {todoOverTime && todoOverTime.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={todoOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <RechartsTooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Charts;
