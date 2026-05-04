import { useState } from 'react';
import api from '../services/api';

export default function AiPanel({ policyId, policyName }) {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('describe');

  const handleFetch = async (type) => {
    setLoading(true);
    setError('');
    setActiveTab(type);
    try {
      let res;
      if (type === 'describe') {
        res = await api.post('/api/ai/describe', { policyId });
      } else if (type === 'recommend') {
        res = await api.post('/api/ai/recommend', { policyId });
      }
      setAiData(res.data);
    } catch (err) {
      setError('AI service unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🤖 AI Analysis
      </h3>

      {/* Tab Buttons */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleFetch('describe')}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'describe'
              ? 'bg-[#1B4F8A] text-white'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          📝 Describe
        </button>
        <button
          onClick={() => handleFetch('recommend')}
          disabled={loading}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            activeTab === 'recommend'
              ? 'bg-[#1B4F8A] text-white'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
          }`}
        >
          💡 Recommend
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-2 text-gray-400 py-4">
          <div className="w-4 h-4 border-2 border-[#1B4F8A] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm">AI is thinking...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded text-sm">
          {error}
        </div>
      )}

      {/* AI Response */}
      {aiData && !loading && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wide">
            AI Response
          </p>
          {typeof aiData === 'string' ? (
            <p className="text-sm text-gray-700 leading-relaxed">{aiData}</p>
          ) : (
            <pre className="text-sm text-gray-700 whitespace-pre-wrap">
              {JSON.stringify(aiData, null, 2)}
            </pre>
          )}
        </div>
      )}

      {/* Empty State */}
      {!aiData && !loading && !error && (
        <p className="text-sm text-gray-400">
          Click Describe or Recommend to get AI insights for this policy.
        </p>
      )}
    </div>
  );
}