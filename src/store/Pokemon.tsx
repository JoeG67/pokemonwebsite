import React, { createContext, useState, useContext, useEffect } from 'react';

interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface PokemonDetailsContextType {
  abilities: Ability[];
  stats: Stat[];
  totalStats: number;
  fetchPokemonDetails: (pokemonId: number) => void;
}

// Create the context
const PokemonDetailsContext = createContext<PokemonDetailsContextType | undefined>(undefined);

// Custom hook for using the context
export const usePokemonDetailsStore = () => {
  const context = useContext(PokemonDetailsContext);
  if (!context) {
    throw new Error('usePokemonDetailsStore must be used within a PokemonDetailsProvider');
  }
  return context;
};

// Provider component
export const PokemonDetailsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [stats, setStats] = useState<Stat[]>([]);

  const fetchPokemonDetails = (pokemonId: number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        setAbilities(data.abilities);
        setStats(data.stats);
      })
      .catch(error => console.log(error));
  };

  // Calculate total base stats
  const totalStats = stats.reduce((total, stat) => total + stat.base_stat, 0);

  return (
    <PokemonDetailsContext.Provider value={{ abilities, stats, totalStats, fetchPokemonDetails }}>
      {children}
    </PokemonDetailsContext.Provider>
  );
};
