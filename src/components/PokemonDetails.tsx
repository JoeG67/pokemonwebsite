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

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center 
      transition-opacity duration-300 ease-in-out `}
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-red-300 p-4 rounded-lg max-w-md w-full relative border-black border-solid border-2`}
      >
        <div className="text-center">
          <div className="flex justify-center my-4 font-pokemon tracking-widest ">
            <p className="text-black font-bold font-pokemon tracking-widest text-sm sm:text-base md:text-lg lg:text-2xl mb-2">
              #{pokemon.id}
              <span className="text-2xl font-bold font-pokemon tracking-widest mb-2 mr-4">
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
              className="mx-auto w-1/2"
            />
          </div>

          <div>
            <div className="flex justify-center content-center">
              <h4 className="text-xl font-bold my-2 ml-2 font-pokemon tracking-widest text-black justify-center">
                Abilities:{" "}
              </h4>
            </div>
            {abilities.map((ability, index) => {
              const bgColor = ability.is_hidden
                ? "bg-red-500 text-white font-bold font-pokemon tracking-widest border-black border-solid border-2" // Red for hidden abilities
                : index % 2 === 0
                ? "bg-blue-500 text-white font-bold font-pokemon tracking-widest border-black border-solid border-2" // Blue for even-indexed non-hidden abilities
                : "bg-blue-300 text-white font-bold font-pokemon tracking-widest border-black border-solid border-2"; // Lighter blue for odd-indexed non-hidden abilities

              return (
                <div key={index} className={` my-1 py-1 rounded-lg ${bgColor}`}>
                  <span className="capitalize font-bold">
                    {ability.ability.name.charAt(0).toUpperCase() +
                      ability.ability.name.slice(1)}
                  </span>
                  {ability.is_hidden && <span className="ml-2">(Hidden)</span>}
                </div>
              );
            })}
          </div>
          <div className="">
            <div className="grid grid-cols-2 gap-4 mb-4 ">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-32">
                    <span className="font-bold capitalize font-pokemon tracking-widest text-black">
                      {stat.stat.name
                        .replace("hp", "Health")
                        .replace("special-attack", "Sp. Atk")
                        .replace("special-defense", "Sp. Def")}
                    </span>
                  </div>

                  <div className="flex-1 h-8 relative rounded-lg overflow-hidden bg-opacity-20">
                    <div
                      className={`absolute inset-0 font-bold  ${getStatTextColor(
                        stat.base_stat
                      )} text-black`}
                      style={{ width: `${(stat.base_stat / 250) * 100}%` }}
                    >
                      <span className="absolute left-2 top-1/2 transform -translate-y-1/2 font-bold font-pokemon text-shadow-lg tracking-widest">
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
                <span className="font-bold font-pokemon tracking-widest text-black">
                  Total Stats:{" "}
                </span>
              </div>
              <div className="font-bold font-pokemon tracking-widest">
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

const getStatTextColor = (statValue: number) => {
  if (statValue <= 50) {
    return "text-neutral-700";
  } else if (statValue <= 100) {
    return "text-lime-700";
  } else if (statValue <= 150) {
    return "text-emerald-700";
  } else if (statValue <= 200) {
    return "text-cyan-700";
  } else {
    return "text-violet-700";
  }
};

const getTotalStatsTextColor = (totalStats: number) => {
  if (totalStats <= 300) {
    return "text-pink-500";
  } else if (totalStats <= 400) {
    return "text-yellow-500";
  } else if (totalStats <= 500) {
    return "text-green-100";
  } else if (totalStats <= 600) {
    return "text-neutral-900";
  } else {
    return "text-purple-500";
  }
};

export default PokemonDetails;
