import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Professional color palette for the charts
const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#14b8a6",
  "#f59e0b",
  "#f43f5e",
  "#0ea5e9",
];

// Custom label function to show percentages on the Pie Chart
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show label if percentage is greater than 5% to avoid crowding
  if (percent < 0.05) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-bold drop-shadow-md"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ReChartSetup({ data }) {
  // Fallback if data is missing or empty
  if (!data || !data.dataPoints || data.dataPoints.length === 0) {
    return null;
  }

  // Extract chart preferences (defaults to pie if none provided)
  const { chartType = "pie", dataPoints, title } = data;

  const renderChart = () => {
    switch (chartType.toLowerCase()) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dataPoints}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fill: "#6b7280", fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Bar
                dataKey="value"
                fill="#6366f1"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "histogram":
        // A histogram is essentially a bar chart with no gaps between the bars
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={dataPoints}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barCategoryGap={0}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip
                cursor={{ fill: "#f3f4f6" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Bar
                dataKey="value"
                fill="#8b5cf6"
                stroke="#ffffff"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "pie":
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataPoints}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={110}
                dataKey="value"
                stroke="none"
              >
                {dataPoints.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                itemStyle={{ color: "#374151", fontWeight: 600 }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 w-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
      {title && (
        <h4 className="text-center text-gray-800 font-bold mb-6 text-lg tracking-tight">
          {title}
        </h4>
      )}
      {renderChart()}
    </div>
  );
}

export default ReChartSetup;
