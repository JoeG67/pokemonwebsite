import React, { useState, useEffect } from 'react';
import Card from './components/Card';
import { Pokemon } from './components/Pokemon'; // Import Pokemon interface
import PokemonDetails from './components/PokemonDetails';
import { PokemonDetailsProvider } from './store/Pokemon';

interface PokemonListItem {
  url: string;
}

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const limit = 500; // Set the number of Pokemon to load

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
      })
      .catch(error => console.log(error));
  }, [limit]);

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
    <div className="App bg-gradient-to-t from-red-200 to-red-600 min-h-screen py-8">
      <header className="App-header text-center">
        <h1 className="text-4xl font-bold text-gray-800">Pokedex</h1>
      </header>
      <div className="max-w-5xl mx-auto mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonList.map(pokemon => (
          <div key={pokemon.url}>
            <Card url={pokemon.url} onOpenPopup={handleOpenPopup} />
          </div>
        ))}
      </div>

      {showPopup && selectedPokemon && (
        <PokemonDetails pokemon={selectedPokemon} onClose={handleClosePopup} />
      )}
    </div>
    </PokemonDetailsProvider>
  );
}

export default App;
