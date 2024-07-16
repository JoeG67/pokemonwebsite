import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { Pokemon } from './components/Pokemon'; // Import Pokemon interface
import PokemonDetails from './components/PokemonDetails';

interface PokemonListItem {
  url: string;
}

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const limit = 150; // Set the number of Pokemon to load

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
      })
      .catch(error => console.log(error));
  }, [limit]);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedPokemon(null);
  };

  const handlePokemonClick = (pokemonUrl: string) => {
    fetch(pokemonUrl)
      .then(response => response.json())
      .then(data => {
        setSelectedPokemon({
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          id: data.id,
          types: data.types.map((type: any) => ({
            name: type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1),
          })),
        });
        handleOpenPopup(); // Open the popup when Pokemon is selected
      })
      .catch(error => console.log(error));
  };

  return (
    <div className="App bg-gray-100 min-h-screen py-8">
      <header className="App-header text-center">
        <h1 className="text-4xl font-bold text-gray-800">Pokedex Website</h1>
      </header>
      <div className="max-w-5xl mx-auto mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonList.map(pokemon => (
          <div key={pokemon.url} onClick={() => handlePokemonClick(pokemon.url)}>
            <Card url={pokemon.url} onOpenPopup={handleOpenPopup} />
          </div>
        ))}
      </div>

      {/* Popup for PokemonDetails */}
      {showPopup && selectedPokemon && (
        <div className="popup-container">
          <div className="popup">
            <span className="close-popup" onClick={handleClosePopup}>
              &times;
            </span>
            <PokemonDetails pokemon={selectedPokemon} onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
