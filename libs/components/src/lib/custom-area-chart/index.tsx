import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  YAxis,
  Tooltip,
  TooltipProps,
} from "recharts";

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active) {
    return (
      <div className="flex flex-col rounded border border-black bg-white p-2 dark:bg-neutral-900">
        <span>${payload && payload[0].value}</span>
      </div>
    );
  }
  return null;
};

interface CustomAreaChartProps {
  data?: number[];
  color: string;
}

export const CustomAreaChart: React.FC<CustomAreaChartProps> = ({
  data,
  color,
}) => {
  const chartData = useMemo(() => data?.map((d) => ({ datapoint: d })), [data]);

  const fillUrl = "url(#" + color + ")";

  return (
    <ResponsiveContainer width="99%" height="100%">
      <AreaChart
        data={chartData}
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

        <Tooltip content={<CustomTooltip />} />
        <YAxis domain={["dataMin", "dataMax"]} hide />
        <Area type="linear" dataKey="datapoint" stroke={color} fill={fillUrl} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomAreaChart;
