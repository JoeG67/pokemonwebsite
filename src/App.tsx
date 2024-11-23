import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import { Pokemon } from "./components/Pokemon";
import PokemonDetails from "./components/PokemonDetails";
import { PokemonDetailsProvider } from "./store/Pokemon";
import SearchBar from "./components/SearchBar"; // Import SearchBar component

interface PokemonListItem {
  url: string;
  name: string;
}

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<
    PokemonListItem[]
  >([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 151;

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonList(data.results);
        setFilteredPokemonList(data.results);
      })
      .catch((error) => console.log(error));
  }, [limit]);

  useEffect(() => {
    setFilteredPokemonList(
      pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, pokemonList]);

  const handleOpenPopup = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPokemon(null);
  };

  return (
    <PokemonDetailsProvider>
   <header className="App-header text-center bg-white">
  <div className="flex items-center justify-between">
    <div className="flex items-center px-2">
      <img
        src="https://www.pngarts.com/files/4/Pokeball-PNG-Image-Transparent-Background.png"
        alt="Page Title"
        className="h-12 w-12" 
      />
    </div>

    <div className="flex-1 flex justify-center">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>

    <div className="flex items-center px-2">
      <a href="https://github.com/JoeG67" target="_blank" rel="noopener noreferrer">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
          alt="GitHub Link"
          className="h-12 w-12" 
        />
      </a>
    </div>
  </div>
</header>

      <section>
        <div className="App bg-red-600 min-h-screen py-8">
          <div className="max-w-6xl mx-auto mt-8 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredPokemonList.map((pokemon) => (
              <div key={pokemon.url}>
                <Card url={pokemon.url} onOpenPopup={handleOpenPopup} />
              </div>
            ))}
          </div>

          {showPopup && selectedPokemon && (
            <PokemonDetails
              pokemon={selectedPokemon}
              onClose={handleClosePopup}
            />
          )}
        </div>
      </section>
    </PokemonDetailsProvider>
  );
}

export default App;
