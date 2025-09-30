import React from "react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  githubUrl: string;
  limit: number;
  setLimit: (limit: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  githubUrl,
  limit,
  setLimit,
}) => {
  return (
    <header className="App-header text-center bg-[#e0e0e0]">
      <div className="flex items-center justify-between">
        <div className="flex items-center px-10">
          <img
            src="https://www.pngarts.com/files/4/Pokeball-PNG-Image-Transparent-Background.png"
            alt="Page Title"
            className="h-12 w-12"
          />
        </div>

<div className="flex-1 flex justify-center items-center gap-x-4">
  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
  <input
    type="number"
    placeholder="Limit"
    value={limit}
    onChange={(e) => {
      const value = Number(e.target.value);
      setLimit(isNaN(value) || value < 0 ? 0 : value);
    }}
    className="border border-black rounded px-3 py-1 w-20 text-center font-pokemon bg-white shadow-sm"
  />
</div>


        <div className="flex items-center px-10">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub Link"
              className="h-12 w-12"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
