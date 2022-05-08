import React from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";

const mockData = [
  {
    datapoint: 4,
  },
  {
    datapoint: 3,
  },
  {
    datapoint: 4,
  },
  {
    datapoint: 4,
  },
  {
    datapoint: 5,
  },
  {
    datapoint: 5,
  },
  {
    datapoint: 6,
  },
  {
    datapoint: 7,
  },
  {
    datapoint: 8,
  },
];

interface CustomAreaChartProps {
  data?: { datapoint: number }[];
  color: string;
}

export const CustomAreaChart: React.FC<CustomAreaChartProps> = ({
  data = mockData,
  color,
}) => {
  const fillUrl = "url(#" + color + ")";
  return (
    <ResponsiveContainer width="99%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id={color} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor="rgb(38 38 38)" stopOpacity={0.2} />
          </linearGradient>
        </defs>

        <Area type="linear" dataKey="datapoint" stroke={color} fill={fillUrl} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
