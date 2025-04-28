import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchForm = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      navigate(`/search/${title.trim()}`);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-6 ">
      <input
        type="text"
        placeholder="Search recipes..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-4 py-2 rounded bg-gray-800 text-white"
      />
      <button type="submit" className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4 mb-4">
        Search
      </button>
    </form>
  );
};