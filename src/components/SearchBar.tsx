// SearchBar.tsx
import React from "react";
import { FaSearch } from "react-icons/fa"; // Import a search icon from react-icons
interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex justify-center mt-6">
      <div className="relative w-80">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search Pokémon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
          w-full px-10 py-2 
          border border-black rounded-full 
          text-gray-800 bg-white placeholder-gray-400 
          focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-400
          hover:border-black 
          transition-all duration-200 ease-in-out
          shadow-sm hover:shadow-md
        "
        />
      </div>
    </div>
  );
};

export default SearchBar;
