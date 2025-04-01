import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CoinPage = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCoinDetails = async () => {
    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const data = await res.json();
      setCoin(data);
    } catch (err) {
      console.error("Error fetching coin details:", err);
    }
  };

  const fetchChartData = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`
      );
      const data = await res.json();

      const formattedData = data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price,
      }));

      setChartData(formattedData);
    } catch (err) {
      console.error("Error fetching chart data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinDetails();
    fetchChartData();
  }, [coinId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">Fetching coin data...</p>
        </div>
      </div>
    );
  }

  if (!coin) {
    return <div className="text-center text-red-500 text-lg py-10">Error loading coin data.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-[140vh] mx-auto">
        
        {/* Coin Header */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <img src={coin.image?.large} alt={coin.name} className="w-20 h-20" />
            <div>
              <h1 className="text-3xl font-bold">{coin.name} ({coin.symbol.toUpperCase()})</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Rank #{coin.market_cap_rank}</p>
            </div>
          </div>
          <p className="text-xl font-semibold text-green-600">${coin.market_data?.current_price?.usd}</p>
        </div>

        {/* Chart Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Price Trend (Last 7 Days)</h2>
          <div className="w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <XAxis dataKey="date" stroke="#8884d8" />
                  <YAxis stroke="#82ca9d" />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#3182ce" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">No chart data available</p>
            )}
          </div>
        </div>

        {/* Coin Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">24h High</p>
            <p className="text-xl font-semibold">${coin.market_data?.high_24h?.usd}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">24h Low</p>
            <p className="text-xl font-semibold">${coin.market_data?.low_24h?.usd}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Market Cap</p>
            <p className="text-xl font-semibold">${coin.market_data?.market_cap?.usd.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-gray-600 dark:text-gray-300">Total Supply</p>
            <p className="text-xl font-semibold">{coin.market_data?.total_supply?.toLocaleString() || 'N/A'}</p>
          </div>
        </div>

        {/* All-Time High & Low */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">All-Time High & Low</h2>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300">ATH</p>
              <p className="text-lg font-semibold text-green-600">${coin.market_data?.ath?.usd}</p>
            </div>
            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300">ATL</p>
              <p className="text-lg font-semibold text-red-600">${coin.market_data?.atl?.usd}</p>
            </div>
          </div>
        </div>

        {/* Coin Description */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold">About {coin.name}</h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2 leading-relaxed" dangerouslySetInnerHTML={{ __html: coin.description?.en }} />
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
