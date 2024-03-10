import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the query to the parent component for handling
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex border border-blue-500 rounded-lg overflow-hidden">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        className="px-4 py-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Search</button>
    </form>
  );
};

export default SearchBar;
