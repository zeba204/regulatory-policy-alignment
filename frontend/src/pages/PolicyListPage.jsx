import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function PolicyListPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const fetchPolicies = async () => {
    try {
      const res = await api.get('/api/policies');
      setPolicies(res.data);
    } catch (err) {
      console.error('Failed to fetch policies', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPolicies(); }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filtered = policies.filter(p =>
    p.policyName?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'INACTIVE': return 'bg-red-100 text-red-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-primary text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-bold">Regulatory Policy Alignment</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/dashboard')} className="text-sm hover:underline">
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-primary text-sm px-3 py-1 rounded font-medium hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Policy Records</h2>
          <button
            onClick={() => navigate('/policy/create')}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"
          >
            + New Policy
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by name or category..."
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading policies...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No policies found.</div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Policy Name</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Category</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">AI Score</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((policy) => (
                  <tr key={policy.id} className="border-b hover:bg-gray-50 cursor-pointer">
                    <td className="px-4 py-3 font-medium text-primary">{policy.policyName}</td>
                    <td className="px-4 py-3 text-gray-600">{policy.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{policy.aiScore ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-400">
                      {policy.createdDate ? new Date(policy.createdDate).toLocaleDateString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}