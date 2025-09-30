import React, { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`App-header sticky top-0 z-50 text-center transition-colors duration-300 ${
        scrolled ? "bg-red-300/90 shadow-md backdrop-blur" : "bg-red-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center px-10">
          <img
            src="https://www.pngarts.com/files/4/Pokeball-PNG-Image-Transparent-Background.png"
            alt="Page Title"
            className="h-12 w-12 transition-transform duration-300 ease-in-out hover:scale-[1.1]"
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
            className="border border-black rounded-full px-3 py-1 w-20 text-center font-pokemon bg-white shadow-sm
            transition-transform duration-300 ease-in-out hover:scale-[1.1]"
          />
        </div>

        <div className="flex items-center px-10 ">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <img
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
              alt="GitHub Link"
              className="h-12 w-12 transition-transform duration-300 ease-in-out hover:scale-[1.1]"
            />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
