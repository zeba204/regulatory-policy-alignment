import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import AiPanel from '../components/AiPanel';
import FileUpload from '../components/FileUpload';

export default function PolicyFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    policyName: '',
    description: '',
    category: '',
    status: 'ACTIVE',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fetchLoading, setFetchLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      api.get(`/api/policies/${id}`)
        .then(res => {
          setForm({
            policyName: res.data.policyName || '',
            description: res.data.description || '',
            category: res.data.category || '',
            status: res.data.status || 'ACTIVE',
          });
        })
        .catch(() => setError('Failed to load policy'))
        .finally(() => setFetchLoading(false));
    }
  }, [id]);

  const handleSubmit = async () => {
    if (!form.policyName || !form.description || !form.category) {
      setError('All fields are required');
      return;
    }
    setLoading(true);
    setError('');
    try {
      if (isEdit) {
        await api.put(`/api/policies/${id}`, form);
      } else {
        await api.post('/api/policies', form);
      }
      navigate('/');
    } catch (err) {
      setError(isEdit ? 'Failed to update policy' : 'Failed to create policy');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this policy?')) return;
    try {
      await api.delete(`/api/policies/${id}`);
      navigate('/');
    } catch (err) {
      setError('Failed to delete policy');
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-400">Loading policy...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-[#1B4F8A] text-white px-6 py-4 flex justify-between items-center shadow">
        <h1 className="text-lg font-bold">Regulatory Policy Alignment</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-white text-[#1B4F8A] text-sm px-3 py-1 rounded font-medium hover:bg-gray-100"
        >
          ← Back to List
        </button>
      </nav>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          {isEdit ? 'Edit Policy' : 'Create New Policy'}
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6 space-y-4">

          {/* Policy Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Policy Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
              value={form.policyName}
              onChange={(e) => setForm({ ...form, policyName: e.target.value })}
              placeholder="Enter policy name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter policy description"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Compliance, Finance, HR"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1B4F8A]"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
              <option value="PENDING">PENDING</option>
            </select>
          </div>

          {/* Buttons Row */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-[#1B4F8A] text-white py-2 rounded-lg font-medium hover:bg-blue-800 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : isEdit ? 'Update Policy' : 'Create Policy'}
            </button>

            {isEdit && (
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
              >
                Delete
              </button>
            )}

            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>

        </div>
      </div>

      {/* AI Panel — OUTSIDE form card, only on edit page */}
      {isEdit && (
        <div className="max-w-2xl mx-auto px-6 pb-8">
          <AiPanel policyId={id} policyName={form.policyName} />
        </div>
      )}
      {isEdit && (
        <div className="max-w-2xl mx-auto px-6 pb-8">
          <FileUpload policyId={id} />
      </div>
      )}

    </div>
  );
}