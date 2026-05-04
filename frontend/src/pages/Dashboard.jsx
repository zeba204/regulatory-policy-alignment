import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [stats, setStats] = useState({
    total: 0, active: 0, inactive: 0, pending: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/policies')
      .then(res => {
        const policies = res.data;
        const active = policies.filter(p => p.status === 'ACTIVE').length;
        const inactive = policies.filter(p => p.status === 'INACTIVE').length;
        const pending = policies.filter(p => p.status === 'PENDING').length;
        setStats({ total: policies.length, active, inactive, pending });
        setChartData([
          { name: 'Active', value: active },
          { name: 'Inactive', value: inactive },
          { name: 'Pending', value: pending },
        ]);
      })
      .catch(err => console.error('Failed to fetch stats', err))
      .finally(() => setLoading(false));
  }, []);

  const COLORS = ['#22c55e', '#ef4444', '#eab308'];

  const cards = [
    { label: 'Total Policies', value: stats.total, color: 'bg-blue-50 border-blue-200', textColor: 'text-[#1B4F8A]', icon: '📋' },
    { label: 'Active', value: stats.active, color: 'bg-green-50 border-green-200', textColor: 'text-green-700', icon: '✅' },
    { label: 'Inactive', value: stats.inactive, color: 'bg-red-50 border-red-200', textColor: 'text-red-700', icon: '❌' },
    { label: 'Pending', value: stats.pending, color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-700', icon: '⏳' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1B4F8A] text-white px-4 py-4 flex flex-wrap justify-between items-center shadow gap-2">
        <h1 className="text-lg font-bold">Regulatory Policy Alignment</h1>
        <div className="flex gap-4 items-center flex-wrap">
          <button onClick={() => navigate('/')} className="text-sm hover:underline">Policy List</button>
          <button onClick={() => navigate('/analytics')} className="text-sm hover:underline">Analytics</button>
          <button onClick={logout} className="bg-white text-[#1B4F8A] text-sm px-3 py-1 rounded font-medium hover:bg-gray-100">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">Overview of all regulatory policies</p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading dashboard...</div>
        ) : (
          <>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {cards.map((card) => (
                <div key={card.label} className={`border rounded-xl p-6 ${card.color} flex flex-col gap-2`}>
                  <div className="text-2xl">{card.icon}</div>
                  <p className="text-sm text-gray-500 font-medium">{card.label}</p>
                  <p className={`text-4xl font-bold ${card.textColor}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Recharts Pie Chart */}
            <div className="bg-white rounded-xl shadow p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Policy Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="flex gap-4 flex-wrap">
                <button onClick={() => navigate('/policy/create')} className="bg-[#1B4F8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800">
                  + Create New Policy
                </button>
                <button onClick={() => navigate('/')} className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  View All Policies
                </button>
                <button onClick={() => navigate('/analytics')} className="border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50">
                  View Analytics
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}