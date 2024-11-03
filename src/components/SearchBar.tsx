// SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center mt-6">
      <input
        type="text"
        placeholder=""
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-80 px-4 py-2 
          border border-black rounded-full 
          text-gray-800 bg-white placeholder-gray-400 
          focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400
          hover:border-black 
          transition-all duration-200 ease-in-out
          shadow-sm hover:shadow-md
        "
      />
    </div>
  );
};

export default SearchBar;
