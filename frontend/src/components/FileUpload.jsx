import { useState } from 'react';
import api from '../services/api';

export default function FileUpload({ policyId, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'text/plain'];
  const MAX_SIZE_MB = 5;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setError('');
    setSuccess('');

    if (!selected) return;

    if (!ALLOWED_TYPES.includes(selected.type)) {
      setError('Only PDF, JPG, PNG and TXT files are allowed');
      return;
    }

    if (selected.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size must be under ${MAX_SIZE_MB}MB`);
      return;
    }

    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('file', file);
      await api.post(`/api/policy-records/${policyId}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccess('File uploaded successfully!');
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        📎 Upload Document
      </h3>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png,.txt"
          className="hidden"
          id="file-input"
        />
        <label
          htmlFor="file-input"
          className="cursor-pointer text-sm text-gray-500 hover:text-[#1B4F8A]"
        >
          {file ? (
            <span className="text-[#1B4F8A] font-medium">{file.name}</span>
          ) : (
            <span>Click to select file (PDF, JPG, PNG, TXT — max 5MB)</span>
          )}
        </label>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-3 py-2 rounded text-sm mb-3">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 px-3 py-2 rounded text-sm mb-3">
          {success}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="w-full bg-[#1B4F8A] text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-800 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
}