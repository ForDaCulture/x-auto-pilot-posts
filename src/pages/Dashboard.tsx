import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import EngagementChart from '../components/EngagementChart';

const Dashboard: React.FC = () => {
  const [engagementData, setEngagementData] = useState<
    { date: string; impressions: number; likes: number; retweets: number; replies: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEngagementData = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      const data = [
        { date: "2024-04-10", impressions: 1200, likes: 84, retweets: 35, replies: 18 },
        { date: "2024-04-11", impressions: 1420, likes: 105, retweets: 42, replies: 27 },
        { date: "2024-04-12", impressions: 980, likes: 67, retweets: 25, replies: 13 },
        { date: "2024-04-13", impressions: 1100, likes: 73, retweets: 30, replies: 20 },
        { date: "2024-04-14", impressions: 1540, likes: 118, retweets: 49, replies: 35 },
      ];
      setEngagementData(data);
      setLoading(false);
    };

    fetchEngagementData();
  }, []);

  const calculateTotal = (key: 'impressions' | 'likes' | 'retweets' | 'replies') =>
    engagementData.reduce((sum, data) => sum + data[key], 0);

  const calculateDailyChange = (key: 'impressions' | 'likes' | 'retweets' | 'replies') => {
    if (engagementData.length < 2) return 0;
    const latest = engagementData[engagementData.length - 1][key];
    const previous = engagementData[engagementData.length - 2][key];
    return latest - previous;
  };

  const formatChange = (change: number) => {
    const prefix = change > 0 ? '+' : '';
    const colorClass = change > 0 ? 'text-green-500' : 'text-red-500';
    return <span className={colorClass}>{`${prefix}${change}`}</span>;
  };

  const renderSummaryCard = (title: string, total: number, change: number, bgColorClass: string) => (
    <div className={`p-6 rounded-lg ${bgColorClass} shadow-md`}>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 mt-2">
        {total} {change !== 0 && <span className="text-sm ml-2">{formatChange(change)}</span>}
      </p>
    </div>
  );

  if (loading) {
    return (
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center">Engagement Dashboard</h1>
        <p className="text-center mt-8">Loading...</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center">Engagement Dashboard</h1>

      {engagementData.length > 0 && (
        <>


        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {/* Impressions Card */}
          <div className="p-6 rounded-lg bg-blue-100 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Impressions</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{totalImpressions}</p>
            {formatChange(calculateDailyChange('impressions'))}
          </div>

          {/* Likes Card */}
          <div className="p-6 rounded-lg bg-green-100 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Likes</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{totalLikes}</p>
            {formatChange(calculateDailyChange('likes'))}
          </div>

          {/* Retweets Card */}
          <div className="p-6 rounded-lg bg-yellow-100 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Retweets</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{totalRetweets}</p>
            {formatChange(calculateDailyChange('retweets'))}
          </div>

          {/* Replies Card */}
          <div className="p-6 rounded-lg bg-red-100 shadow-md">
            <h3 className="text-lg font-semibold text-gray-700">Total Replies</h3>
            <p className="text-2xl font-bold text-gray-800 mt-2">{totalReplies}</p>
            {formatChange(calculateDailyChange('replies'))}
          </div>
        </section>

        {/* Charts */}
        <section className="mt-8">
          <EngagementChart
          title="Impressions Over Time"
          dataKey="impressions"
          strokeColor="#8884d8"
          data={engagementData}
          />
          <EngagementChart
          title="Likes Over Time"
          dataKey="likes"
          strokeColor="#34D399"
          data={engagementData}
          />
          <EngagementChart title="Retweets Over Time" dataKey="retweets" strokeColor="#60A5FA" data={engagementData}/>
          <EngagementChart title="Replies Over Time" dataKey="replies" strokeColor="#F87171" data={engagementData}/>
        </section>
        </>
      )}
      </main>
  )
};

export default Dashboard;