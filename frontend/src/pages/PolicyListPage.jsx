import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function PolicyListPage() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Debounce search — waits 400ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchPolicies = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/api/policies');
      setPolicies(res.data);
    } catch (err) {
      console.error('Failed to fetch policies', err);
    } finally {
      setLoading(false);
    }
  }, []);
    
  const handleExportCsv = async () => {
  try {
    const res = await api.get('/api/policies/export', {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'policies.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (err) {
    console.error('Export failed', err);
  }
};

  useEffect(() => { fetchPolicies(); }, [fetchPolicies]);

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'INACTIVE': return 'bg-red-100 text-red-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Filter by search AND status
  const filtered = policies.filter(p => {
    const matchesSearch =
      p.policyName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      p.category?.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#1B4F8A] text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-bold">Regulatory Policy Alignment</h1>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm hover:underline"
          >
            Dashboard
          </button>
          <button
            onClick={logout}
            className="bg-white text-[#1B4F8A] text-sm px-3 py-1 rounded font-medium hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Policy Records
            <span className="ml-2 text-sm font-normal text-gray-400">
              ({filtered.length} results)
            </span>
          </h2>
          <div className="flex gap-3">
          <button
           onClick={handleExportCsv}
            className="border border-[#1B4F8A] text-[#1B4F8A] px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50"
          >
           ⬇ Export CSV
          </button>
          <button
           onClick={() => navigate('/policy/create')}
            className="bg-[#1B4F8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"
          >
           + New Policy
          </button>
          </div>
        {/* Search + Filter Bar */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <input
            type="text"
            placeholder="Search by name or category..."
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="PENDING">Pending</option>
          </select>
          {(search || statusFilter !== 'ALL') && (
            <button
              onClick={() => { setSearch(''); setStatusFilter('ALL'); }}
              className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            Loading policies...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">No policies found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
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
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((policy) => (
                  <tr key={policy.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-[#1B4F8A]">
                      {policy.policyName}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{policy.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {policy.aiScore ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {policy.createdDate
                        ? new Date(policy.createdDate).toLocaleDateString()
                        : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => navigate(`/policy/edit/${policy.id}`)}
                        className="text-[#1B4F8A] hover:underline text-xs font-medium"
                      >
                        Edit
                      </button>
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