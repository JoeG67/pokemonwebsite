import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  region: string;
  setRegion: (region: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  region,
  setRegion,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const regions = [
    "Kanto",
    "Johto",
    "Hoenn",
    "Sinnoh",
    "Unova",
    "Kalos",
    "Alola",
    "Galar",
    "Paldea",
  ];

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
        </div>

        <div className="flex items-center px-10">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-black rounded-full px-3 py-1 font-pokemon bg-white shadow-sm
            transition-transform duration-300 ease-in-out hover:scale-[1.1]"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
