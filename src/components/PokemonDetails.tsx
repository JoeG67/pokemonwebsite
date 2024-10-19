import React, { useEffect } from 'react';
import { usePokemonDetailsStore } from '../store/Pokemon'; // Import store hook
import { Pokemon } from './Pokemon';

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, onClose }) => {
  const { abilities, stats, totalStats, fetchPokemonDetails } = usePokemonDetailsStore();

  useEffect(() => {
    fetchPokemonDetails(pokemon.id); // Fetch details from the store when Pokemon changes
  }, [pokemon.id, fetchPokemonDetails]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center" onClick={handleOverlayClick}>
      <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
        <div className="text-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            className="mx-auto w-1/2" // Adjust the width here to reduce image size by half
          />
          <h3 className="text-2xl font-bold mb-2">{pokemon.name}</h3>
          <p className="text-gray-600 font-bold mb-2">NO: {pokemon.id}</p>
          <div className="flex justify-center mb-4">
            {pokemon.types.map((type, index) => (
              <span key={index} className={`px-2 py-1 rounded mr-2 font-bold ${typeColors[type.name.toLowerCase()]}`}>
                {type.name}
              </span>
            ))}
          </div>
          <div className="text-left">
            <h4 className="text-xl font-bold mb-2">Abilities (Hidden Ability in Red)</h4>
            <ul className="list-disc list-inside mb-4">
              {abilities.map((ability, index) => (
                <li key={index} className="text-gray-700 ">
                  {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                  {ability.is_hidden && <span className="text-red-500 ml-2">(Hidden)</span>}
                </li>
              ))}
            </ul>
            <h4 className="text-xl font-bold mb-2">Stats</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32">
                    <span className="font-bold">{stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}</span>
                  </div>
                  <div className="flex-1 h-8 relative rounded-lg overflow-hidden bg-gray-200">
                    <div
                      className={`absolute inset-0 ${statColors[stat.stat.name.toLowerCase()]} text-white`}
                      style={{ width: `${(stat.base_stat / 250) * 100}%` }}
                    >
                      <span className="absolute left-2">{stat.base_stat}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <div className="w-32">
                  <span className="font-bold">Total Stats</span>
                </div>
                <div className="flex-1">
                  <span>{totalStats}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Type colors for Pokemon types (no change here)
const typeColors: { [key: string]: string } = {
  // Type color definitions...
};

// Stat colors for individual stats (no change here)
const statColors: { [key: string]: string } = {
  // Stat color definitions...
};

export default PokemonDetails;
