import React, { useEffect } from "react";
import { usePokemonDetailsStore } from "../store/Pokemon";
import { Pokemon } from "./Pokemon";
import { typeColors } from "../constants/typeColors";

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
    fetchPokemonDetails(pokemon.id);
  }, [pokemon.id, fetchPokemonDetails]);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const getCardBackground = () => {
    if (pokemon.types.length >= 1) {
      return typeColors[pokemon.types[0].name.toLowerCase()] || "bg-gray-300";
    }
    return "bg-gray-300";
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ease-in-out z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`${getCardBackground()}/90 p-6 sm:p-8 rounded-xl max-w-md sm:max-w-lg md:max-w-xl w-full relative border-black border-2 shadow-xl`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6 font-pokemon tracking-widest">
          <p className="text-black font-bold text-lg sm:text-xl md:text-2xl">
            <span className="mr-2">#{pokemon.id}</span>
            {pokemon.name}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.types.map((type, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded border-2 border-black ${
                  typeColors[type.name.toLowerCase()]
                } transition-all duration-300 ease-in-out hover:scale-[1.05]`}
              >
                {type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="border-black border-2 rounded bg-gray-100 p-2 mb-6">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            alt={pokemon.name}
            className="mx-auto w-1/2 transition-all duration-300 ease-in-out hover:scale-[1.05]"
          />
        </div>

<div className="mb-6">
  <h4 className="text-xl font-bold mb-2 font-pokemon tracking-widest text-black text-center">
    Abilities
  </h4>
  <div className="flex flex-col gap-2">
    {abilities.map((ability, index) => {
      let bgColor = ""
      if (index === 0) bgColor = "bg-indigo-600 text-white"
      else if (index === 1) bgColor = "bg-teal-600 text-white"
      if (ability.is_hidden) bgColor = "bg-pink-600 text-white"
      return (
        <div
          key={index}
          className={`py-1 rounded-lg ${bgColor} font-bold font-pokemon tracking-widest border-black border-2 text-center transition-all duration-300 ease-in-out hover:scale-[1.02]`}
        >
          <span className="capitalize">
            {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
          </span>
          {ability.is_hidden && <span className="ml-2">(Hidden)</span>}
        </div>
      )
    })}
  </div>
</div>


        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const barColor = getStatTextColor(stat.base_stat);
              return (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-32">
                    <span className="font-bold capitalize font-pokemon tracking-widest text-black">
                      {stat.stat.name
                        .replace("hp", "Health")
                        .replace("special-attack", "Sp. Atk")
                        .replace("special-defense", "Sp. Def")}
                    </span>
                  </div>
                  <div className="flex-1 h-6 relative rounded-lg overflow-hidden bg-gray-200/50 border border-black">
                    <div
                      className={`h-full ${barColor} flex items-center pl-2 font-bold font-pokemon tracking-widest`}
                      style={{ width: `${(stat.base_stat / 250) * 100}%` }}
                    >
                      {stat.base_stat}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="w-32">
              <span className="font-bold font-pokemon tracking-widest text-black">
                Total Stats:
              </span>
            </div>
            <div className="font-bold font-pokemon tracking-widest">
              <span className={getTotalStatsTextColor(totalStats)}>
                {totalStats}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getStatTextColor = (statValue: number) => {
  if (statValue <= 50) return "bg-red-600 text-white";
  if (statValue <= 100) return "bg-yellow-500 text-white";
  if (statValue <= 150) return "bg-green-600 text-white";
  if (statValue <= 200) return "bg-emerald-400 text-white";
  return "bg-purple-600 text-white";
};

const getTotalStatsTextColor = (totalStats: number) => {
  if (totalStats <= 300) return "text-red-600";
  if (totalStats <= 400) return "text-yellow-500";
  if (totalStats <= 500) return "text-green-600";
  if (totalStats <= 600) return "text-emerald-400";
  return "text-indigo-600";
};

export default PokemonDetails;
