import React from 'react';

interface PokemonType {
  name: string;
}

interface Pokemon {
  name: string;
  id: number;
  types: PokemonType[];
}

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ pokemon, onClose }) => {
  return (
    <div className="pokemon-details bg-white rounded-lg overflow-hidden shadow-md p-4">
      <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-2xl font-bold mb-4">{pokemon.name}</h2>
      <p className="text-lg mb-2">ID: {pokemon.id}</p>
      <div className="flex flex-wrap">
        {pokemon.types.map((type, index) => (
          <div
            key={index}
            className="type-box bg-gray-300 text-gray-700 px-2 py-1 rounded text-lg mr-2 mb-2 font-bold"
          >
            {type.name}
          </div>
        ))}
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default PokemonDetails;
