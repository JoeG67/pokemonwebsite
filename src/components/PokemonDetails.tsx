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
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
      onClick={handleOverlayClick}
    >
      <div
        className={`${getCardBackground()}  p-4 rounded-lg max-w-md w-full relative border-black border-solid border-2`}
      >
        <div className="text-center">
          <div className="flex justify-center my-4 font-mono ">
            <p className="text-black font-bold font-mono text-sm sm:text-base md:text-lg lg:text-2xl mb-2">
              #{pokemon.id}
              <span className="text-2xl font-bold font-mono mb-2 mr-4">
                {" "}
                {pokemon.name}{" "}
              </span>
            </p>
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded mr-2 font-bold  border-2 border-black ${
                  typeColors[type.name.toLowerCase()]
                }`}
              >
                {type.name}
              </span>
            ))}
          </div>
          <div className="border-black border-solid border-2 rounded bg-blue-100">
            {" "}
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              alt={pokemon.name}
              className="mx-auto w-1/2" // Adjust the width here to reduce image size by half
            />
          </div>

          <div>
            <div className="flex justify-center content-center">
              <h4 className="text-xl font-bold my-2 ml-2 font-mono text-black justify-center">
                Abilities:{" "}
              </h4>
              </div>
              {abilities.map((ability, index) => {
                // Determine the background color based on hidden status and index
                const bgColor = ability.is_hidden
                  ? "bg-red-500 text-white font-bold font-mono border-black border-solid border-2" // Red for hidden abilities
                  : index % 2 === 0
                  ? "bg-blue-500 text-white font-bold font-mono border-black border-solid border-2" // Blue for even-indexed non-hidden abilities
                  : "bg-blue-300 text-white font-bold font-mono border-black border-solid border-2"; // Lighter blue for odd-indexed non-hidden abilities

                return (
                  <div
                    key={index}
                    className={` my-1 py-1 rounded-lg ${bgColor}`}
                  >
                    <span className="capitalize font-bold">
                      {ability.ability.name.charAt(0).toUpperCase() +
                        ability.ability.name.slice(1)}
                    </span>
                    {ability.is_hidden && (
                      <span className="ml-2">(Hidden)</span> // Additional styling if needed
                    )}
                  </div>
                );
              })}
            </div>
            <div className="">
              <div className="grid grid-cols-2 gap-4 mb-4 ">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center">
                    {/* Stat Name */}
                    <div className="w-32">
                      <span className="font-bold capitalize font-mono text-black">
                        {stat.stat.name
                          .replace("special-attack", "Sp. Atk")
                          .replace("special-defense", "Sp. Def")}
                      </span>
                    </div>

                    {/* Stat Bar */}
                    <div className="flex-1 h-8 relative rounded-lg overflow-hidden bg-opacity-20">
                      <div
                        className={`absolute inset-0 font-bold ${getStatTextColor(
                          stat.base_stat
                        )} text-black`}
                        style={{ width: `${(stat.base_stat / 250) * 100}%` }}
                      >
                        {/* Stat Value */}
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold font-mono">
                          {stat.base_stat}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <div className="w-32">
                  <span className="font-bold font-mono text-black">Total Stats</span>
                </div>
                <div className="flex-1 font-bold font-mono">
                  <span className={getTotalStatsTextColor(totalStats)}>
                    {totalStats}
                  </span>{" "}
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
    return "text-gray-500"; // Low stats - gray (neutral and distinct)
  } else if (statValue <= 100) {
    return "text-lime-500"; // Mid-low stats - lime (distinct from amber)
  } else if (statValue <= 150) {
    return "text-emerald-500"; // Mid stats - emerald (distinct from green)
  } else if (statValue <= 200) {
    return "text-cyan-500"; // Mid-high stats - cyan (distinct from blue)
  } else {
    return "text-violet-500"; // High stats - violet (distinct from teal)
  }
};


const getTotalStatsTextColor = (totalStats: number) => {
  if (totalStats <= 300) {
    return "text-pink-500"; // Low total stats - pink text
  } else if (totalStats <= 400) {
    return "text-yellow-500"; // Mid-low total stats - yellow text
  } else if (totalStats <= 500) {
    return "text-indigo-500"; // Mid total stats - indigo text
  } else if (totalStats <= 600) {
    return "text-black"; // Mid-high total stats - black text
  } else {
    return "text-purple-500"; // High total stats - purple text
  }
};


export default PokemonDetails;
