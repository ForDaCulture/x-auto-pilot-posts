import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

interface EngagementChartProps {
  title: string;
  dataKey: string;
  strokeColor: string;
  data: { date: string; [key: string]: number }[];
}

const EngagementChart: React.FC<EngagementChartProps> = ({
  title,
  dataKey,
  strokeColor,
  data,
}) => {
  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey={dataKey} stroke={strokeColor} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EngagementChart;