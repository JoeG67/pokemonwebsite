import React, { useState, useEffect } from "react";
import { Pokemon } from "./Pokemon";
import { typeColors } from "../constants/typeColors";

interface CardProps {
  url: string;
  onOpenPopup: (pokemon: Pokemon) => void;
}

const Card: React.FC<CardProps> = ({ url, onOpenPopup }) => {
  const [pokemon, setPokemon] = useState<Pokemon>({
    name: "",
    id: 0,
    types: [],
  });

  useEffect(() => {
    const pokemonIndex = url.split("/")[url.split("/").length - 2];
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`)
      .then((response) => response.json())
      .then((data) => {
        const fetchedPokemon = {
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          id: data.id,
          types: data.types.map((type: any) => ({
            name:
              type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1),
          })),
        };
        setPokemon(fetchedPokemon);
      })
      .catch((error) => console.log(error));
  }, [url]);

  const handleCardClick = () => {
    onOpenPopup(pokemon);
  };

  const getCardBackground = () => {
    if (pokemon.types.length === 1) {
      return typeColors[pokemon.types[0].name.toLowerCase()] || "bg-gray-300";
    }

    if (pokemon.types.length === 2) {
      return typeColors[pokemon.types[0].name.toLowerCase()] || "bg-gray-300";
    }

    return "bg-red-300";
  };

  return (
    <section>
      <div
        className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-black 
        transition-all duration-300 ease-in-out hover:scale-[1.1]"
        onClick={handleCardClick}
      >
        <div className="pokemon-image bg-blue-100 relative">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            className="mx-auto w-8 sm:w-12 md:w-24 lg:w-32 xl:w-44"
          />
        </div>
        <div
          className={`p-4 ${getCardBackground()} border-t  border-black flex flex-col items-center text-center`}
        >
          <h3 className="text-base text-black font-bold font-pokemon tracking-widest sm:text-lg md:text-xl lg:text-2xl mb-2">
            {pokemon.name}
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((type, index) => (
              <div
                key={index}
                className={`type-box ${
                  typeColors[type.name.toLowerCase()] ||
                  "bg-gray-300 text-gray-700"
                } px-1 py-1 rounded text-[10px] sm:text-xs md:text-sm lg:text-base font-bold font-pokemon tracking-widest border-2 border-black`}
              >
                {type.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
