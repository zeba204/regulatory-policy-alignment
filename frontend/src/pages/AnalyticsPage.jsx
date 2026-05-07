import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

export default function AnalyticsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('ALL');

  useEffect(() => {
    api.get('/api/policy-records')
      .then(res => setPolicies(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filterByPeriod = (data) => {
    if (period === 'ALL') return data;
    const days = parseInt(period);
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return data.filter(p => p.createdDate && new Date(p.createdDate) >= cutoff);
  };

  const filtered = filterByPeriod(policies);

  const categoryMap = filtered.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const statusMap = filtered.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const statusData = Object.entries(statusMap)
    .map(([name, value]) => ({ name, value }));

  const COLORS = ['#22c55e', '#ef4444', '#eab308', '#3b82f6', '#8b5cf6'];

  const total = filtered.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#1B4F8A] text-white px-4 py-4 flex flex-wrap justify-between items-center shadow gap-2">
        <h1 className="text-lg font-bold">Regulatory Policy Alignment</h1>
        <div className="flex gap-4 items-center flex-wrap">
          <button onClick={() => navigate('/')} className="text-sm hover:underline">Policy List</button>
          <button onClick={() => navigate('/dashboard')} className="text-sm hover:underline">Dashboard</button>
          <button onClick={logout} className="bg-white text-[#1B4F8A] text-sm px-3 py-1 rounded font-medium hover:bg-gray-100">Logout</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
            <p className="text-gray-500 text-sm mt-1">Policy insights and breakdown</p>
          </div>
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <option value="ALL">All Time</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading analytics...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Status Pie Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Status Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                    {statusData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Bar Chart */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Policies by Category</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={categoryData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-35} textAnchor="end" tick={{ fontSize: 11 }} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#1B4F8A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl shadow p-6 md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-[#1B4F8A]">{total}</p>
                  <p className="text-sm text-gray-500 mt-1">Total Policies</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{statusMap['ACTIVE'] || 0}</p>
                  <p className="text-sm text-gray-500 mt-1">Active</p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-3xl font-bold text-yellow-600">{statusMap['PENDING'] || 0}</p>
                  <p className="text-sm text-gray-500 mt-1">Pending</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-600">{Object.keys(categoryMap).length}</p>
                  <p className="text-sm text-gray-500 mt-1">Categories</p>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}