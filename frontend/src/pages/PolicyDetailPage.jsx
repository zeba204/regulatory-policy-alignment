import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function PolicyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/api/policies/${id}`)
      .then(res => setPolicy(res.data))
      .catch(() => setError('Policy not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this policy?')) return;
    try {
      await api.delete(`/api/policies/${id}`);
      navigate('/');
    } catch (err) {
      setError('Failed to delete policy');
    }
  };

  const getScoreBadge = (score) => {
    if (!score) return { color: 'bg-gray-100 text-gray-600', label: 'N/A' };
    if (score >= 80) return { color: 'bg-green-100 text-green-700', label: `${score} — High` };
    if (score >= 60) return { color: 'bg-yellow-100 text-yellow-700', label: `${score} — Medium` };
    return { color: 'bg-red-100 text-red-700', label: `${score} — Low` };
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE': return 'bg-green-100 text-green-700';
      case 'INACTIVE': return 'bg-red-100 text-red-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading policy...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="bg-[#1B4F8A] text-white px-4 py-2 rounded-lg text-sm"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  const scoreBadge = getScoreBadge(policy?.aiScore);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-[#1B4F8A] text-white px-4 py-4 flex flex-wrap justify-between items-center shadow gap-2">
        <h1 className="text-lg font-bold">Regulatory Policy Alignment</h1>
        <div className="flex gap-4 items-center">
          <button onClick={() => navigate('/')} className="text-sm hover:underline">
            Policy List
          </button>
          <button onClick={() => navigate('/dashboard')} className="text-sm hover:underline">
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

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6 flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {policy?.policyName}
            </h2>
            <p className="text-gray-500 text-sm mt-1">{policy?.category}</p>
          </div>
          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/policy/edit/${id}`)}
              className="bg-[#1B4F8A] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800"
            >
              ✏️ Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Detail Card */}
        <div className="bg-white rounded-xl shadow p-6 space-y-5">

          {/* Status + AI Score Badges */}
          <div className="flex gap-3 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(policy?.status)}`}>
              {policy?.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${scoreBadge.color}`}>
              🤖 AI Score: {scoreBadge.label}
            </span>
          </div>

          {/* Description */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Description</p>
            <p className="text-gray-700">{policy?.description}</p>
          </div>

          {/* AI Description */}
          {policy?.aiDescription && (
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">AI Description</p>
              <p className="text-gray-700 text-sm">{policy?.aiDescription}</p>
            </div>
          )}

          {/* Meta Info */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-100">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Created By</p>
              <p className="text-gray-700 text-sm">{policy?.createdBy || '—'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Created Date</p>
              <p className="text-gray-700 text-sm">
                {policy?.createdDate
                  ? new Date(policy.createdDate).toLocaleDateString()
                  : '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Last Modified</p>
              <p className="text-gray-700 text-sm">
                {policy?.lastModified
                  ? new Date(policy.lastModified).toLocaleDateString()
                  : '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">Is Active</p>
              <p className="text-gray-700 text-sm">
                {policy?.isDeleted ? '❌ Deleted' : '✅ Active'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}