import React, { useState, useEffect } from 'react';
import { Pokemon } from './Pokemon'; // Import Pokemon interface

interface CardProps {
  url: string;
  onOpenPopup: (pokemon: Pokemon) => void;
}

const Card: React.FC<CardProps> = ({ url, onOpenPopup }) => {
  const [pokemon, setPokemon] = useState<Pokemon>({
    name: '',
    id: 0,
    types: [],
  });

  const typeColors: { [key: string]: string } = {
    normal: "bg-[#9FA19F] text-white",
    fire: "bg-[#E62829] text-white",
    water: "bg-[#2980EF] text-white",
    electric: "bg-[#FAC000] text-white",
    grass: "bg-[#588d2a] text-white",
    ice: "bg-[#3DCEF3] text-white",
    fighting: "bg-[#FF8000] text-white",
    poison: "bg-[#9141CB] text-white",
    ground: "bg-[#915121] text-white",
    flying: "bg-[#81B9EF] text-white",
    psychic: "bg-[#EF4179] text-white",
    bug: "bg-[#91A119] text-white",
    rock: "bg-[#AFA981] text-white",
    ghost: "bg-[#704170] text-white",
    dragon: "bg-[#5060E1] text-white",
    dark: "bg-[#624D4E] text-white",
    steel: "bg-[#60A1B8] text-white",
    fairy: "bg-[#EF70EF] text-white",
  };

  useEffect(() => {
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`)
      .then(response => response.json())
      .then(data => {
        const fetchedPokemon = {
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          id: data.id,
          types: data.types.map((type: any) => ({
            name: type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1),
          })),
        };
        setPokemon(fetchedPokemon);
      })
      .catch(error => console.log(error));
  }, [url]);

  const handleCardClick = () => {
    onOpenPopup(pokemon);
  };

  return (
<div className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-black" onClick={handleCardClick}>
  <div className="pokemon-image relative">
    <img 
      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
      alt={pokemon.name} 
      className="mx-auto w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56" 
    />
  </div>
  <div className="p-4 bg-yellow-100 border-t border-black flex flex-col items-center text-center">
  {/* <p className="text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-2">NO: {pokemon.id}</p> */}
  <h3 className="text-base font-bold font-mono sm:text-lg md:text-xl lg:text-2xl mb-2">{pokemon.name}</h3>
  <div className="flex flex-wrap gap-2 justify-center">
    {pokemon.types.map((type, index) => (
      <div
        key={index}
        className={`type-box ${typeColors[type.name.toLowerCase()] || 'bg-gray-300 text-gray-700'} px-2 py-1 rounded text-xs sm:text-sm md:text-base lg:text-lg font-bold font-mono`}
      >
        {type.name}
      </div>
    ))}
  </div>
</div>

</div>

  );
};

export default Card;
