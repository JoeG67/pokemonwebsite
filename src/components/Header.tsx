import React from "react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  githubUrl: string;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  githubUrl,
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

        <div className="flex-1 flex justify-center">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
