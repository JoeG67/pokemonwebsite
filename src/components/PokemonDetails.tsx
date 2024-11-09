import React, { useEffect } from "react";
import { usePokemonDetailsStore } from "../store/Pokemon"; // Import store hook
import { Pokemon } from "./Pokemon";

interface PokemonDetailsProps {
  pokemon: Pokemon;
  onClose: () => void;
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({
  pokemon,
  onClose,
}) => {
  const { abilities, stats, totalStats, fetchPokemonDetails } =
    usePokemonDetailsStore();

  useEffect(() => {
    fetchPokemonDetails(pokemon.id); // Fetch details from the store when Pokemon changes
  }, [pokemon.id, fetchPokemonDetails]);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-4 rounded-lg max-w-md w-full relative">
        <div className="text-center">
          <p className="text-gray-600 font-bold mb-2">NO: {pokemon.id}</p>
        </div>
        <div className="text-center">
          <div>
            {" "}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              className="mx-auto w-1/2" // Adjust the width here to reduce image size by half
            />
          </div>

          <h3 className="text-2xl font-bold mb-2">{pokemon.name}</h3>
          <div className="flex justify-center mb-4">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded mr-2 font-bold ${
                  typeColors[type.name.toLowerCase()]
                }`}
              >
                {type.name}
              </span>
            ))}
          </div>
          <div className="text-left">
          <h4 className="text-xl font-bold mb-2">Abilities</h4>
<div className="flex flex-wrap mb-4">
  {abilities.map((ability, index) => (
    <div
      key={index}
      className="flex items-center mr-4 mb-2"
    >
      <span className="text-gray-700 font-medium capitalize">
        {ability.ability.name.charAt(0).toUpperCase() +
          ability.ability.name.slice(1)}
      </span>
      {ability.is_hidden && (
        <span className="text-red-500 ml-2">(Hidden)</span>
      )}
    </div>
  ))}
</div>
            <h4 className="text-xl font-bold mb-2">Stats</h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
  {stats.map((stat, index) => (
    <div key={index} className="flex items-center">
      {/* Stat Name */}
      <div className="w-32">
        <span className="font-bold capitalize">{stat.stat.name}</span>
      </div>

      {/* Stat Bar */}
      <div className="flex-1 h-8 relative rounded-lg overflow-hidden bg-opacity-20">
        <div
          className={`absolute inset-0 ${getStatTextColor(stat.base_stat)} text-black`}
          style={{ width: `${(stat.base_stat / 250) * 100}%` }}
        >
          {/* Stat Value */}
          <span className="absolute left-2 top-1/2 transform -translate-y-1/2 font-semibold">
            {stat.base_stat}
          </span>
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

// Stat colors for individual stats (no change here)

const getStatTextColor = (statValue: number) => {
  if (statValue <= 50) {
    return "text-red-500"; // Low stats - red text
  } else if (statValue <= 100) {
    return "text-yellow-500"; // Mid-low stats - orange text
  } else if (statValue <= 150) {
    return "text-green-500"; // Mid stats - yellow text
  } else if (statValue <= 200) {
    return "text-blue-500"; // Mid-high stats - green text
  } else {
    return "text-orange-500"; // High stats - blue text
  }
};


export default PokemonDetails;
