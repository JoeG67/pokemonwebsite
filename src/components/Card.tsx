import React, { useState, useEffect } from "react";
import { Pokemon } from "./Pokemon"; // Import Pokemon interface

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

  const typeColors: { [key: string]: string } = {
    normal: "bg-[#9FA19F] text-white",
    fire: "bg-[#E03A3A] text-white",
    water: "bg-[#1e90ff] text-white",
    electric: "bg-[#FAC000] text-white",
    grass: "bg-[#50C878] text-white",
    ice: "bg-[#3DCEF3] text-white",
    fighting: "bg-[#bf5858] text-white",
    poison: "bg-[#9141CB] text-white",
    ground: "bg-[#915121] text-white",
    flying: "bg-[#81B9EF] text-white",
    psychic: "bg-[#EF4179] text-white",
    bug: "bg-[#91A119] text-white",
    rock: "bg-[#AFA981] text-white",
    ghost: "bg-[#704170] text-white",
    dragon: "bg-[#882eff] text-white",
    dark: "bg-[#624D4E] text-white",
    steel: "bg-[#60A1B8] text-white",
    fairy: "bg-[#EF70EF] text-white",
  };

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
    
      return "bg-red-300"; // Default background for other cases
    };


  return (
    <section>
      <div
        className="card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl border border-black"
        onClick={handleCardClick}
      >
        <div className="pokemon-image bg-blue-100 relative">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            className="mx-auto w-8 sm:w-12 md:w-24 lg:w-32 xl:w-44"
          />
        </div>
        <div className={`p-4 ${getCardBackground()} border-t  border-black flex flex-col items-center text-center`}>
        {/* <p className="text-black font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-2">NO: {pokemon.id}</p> */}
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
