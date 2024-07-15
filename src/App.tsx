import React, { useState, useEffect } from 'react';
import Card from './components/Card';

// Define a type for the Pokemon list items
interface PokemonListItem {
  url: string;
}

function App() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]); // Specify the type for pokemonList
  const limit = 150; // Set the number of Pokemon to load

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        setPokemonList(data.results);
      })
      .catch(error => console.log(error));
  }, [limit]);

  return (
    <div className="App bg-gray-100 min-h-screen py-8">
      <header className="App-header text-center">
        <h1 className="text-4xl font-bold text-gray-800">Pokedex Website</h1>
      </header>
      <div className="max-w-5xl mx-auto mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pokemonList.map(pokemon => (
          <Card key={pokemon.url} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
}

export default App;
