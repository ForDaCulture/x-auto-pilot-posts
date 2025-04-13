import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const Dashboard: React.FC = () => {
  const engagementData = [
    { date: "2024-04-10", impressions: 1200, likes: 84, retweets: 35, replies: 18 },
    { date: "2024-04-11", impressions: 1420, likes: 105, retweets: 42, replies: 27 },
    { date: "2024-04-12", impressions: 980, likes: 67, retweets: 25, replies: 13 },
    { date: "2024-04-13", impressions: 1100, likes: 73, retweets: 30, replies: 20 },
    { date: "2024-04-14", impressions: 1540, likes: 118, retweets: 49, replies: 35 },
  ];

  const EngagementChart = ({ title, dataKey, strokeColor }: { title: string, dataKey: string, strokeColor: string }) => (
    <div className="mt-8 p-6 bg-white rounded-xl shadow border">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={engagementData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={strokeColor}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center">Engagement Dashboard</h1>
        <EngagementChart title="Impressions Over Time" dataKey="impressions" strokeColor="#8884d8" />
        <EngagementChart title="Likes Over Time" dataKey="likes" strokeColor="#34D399" />
        <EngagementChart title="Retweets Over Time" dataKey="retweets" strokeColor="#60A5FA" />
        <EngagementChart title="Replies Over Time" dataKey="replies" strokeColor="#F87171" />
      </main>
  )
};

export default Dashboard;