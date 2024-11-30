import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pokemon.css";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [limit, setLimit] = useState(10); // Default limit set to 10
  const [offset, setOffset] = useState(0); // Offset for pagination
  const [loading, setLoading] = useState(false); // Loading state
  const [hasMore, setHasMore] = useState(true); // State to track if more Pokémon are available

  // Fetch Pokémon list based on the current limit and offset
  const fetchPokemonList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );

      const newPokemon = response.data.results;

      // If we get less than the requested limit, it means we have loaded all available Pokémon
      if (newPokemon.length < limit) {
        setHasMore(false);
      }

      // Fetch detailed data for each Pokémon (name and image)
      const detailedPokemon = await Promise.all(
        newPokemon.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: detailResponse.data.sprites.front_default,
            url: pokemon.url, // Add the URL to avoid duplicates
          };
        })
      );

      // Add new Pokémon to the list, checking for duplicates based on the URL
      setPokemonList((prev) => {
        const updatedList = [...prev];
        detailedPokemon.forEach((pokemon) => {
          if (!updatedList.some((p) => p.url === pokemon.url)) {
            updatedList.push(pokemon); // Add only unique Pokémon
          }
        });
        return updatedList;
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setLoading(false);
    }
  };

  // Handle changes in the limit input field
  const handleLimitChange = (e) => {
    const newLimit = Math.max(1, parseInt(e.target.value) || 10);
    setLimit(newLimit);
    setOffset(0); // Reset offset when limit is changed
    setHasMore(true); // Reset the "hasMore" flag
    setPokemonList([]); // Clear the current list to load the new set
  };

  // Fetch Pokémon list on mount and when limit/offset changes
  useEffect(() => {
    fetchPokemonList();
  }, [limit, offset]);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center mb-6">Pokemon List</h1>

      {/* Limit Controls */}
      <div className="mb-6 text-center">
        <label className="mr-2">Show:</label>
        <input
          type="number"
          placeholder="Enter limit"
          className="input input-bordered w-full max-w-xs"
          value={limit}
          onChange={handleLimitChange}
        />
      </div>

      {/* Pokemon list display */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pokemonList.map((pokemon, index) => (
          <div
            key={pokemon.url} // Use URL as a unique key
            className="hover:text-white card card-bordered bg-base-100 shadow-xl text-center transform transition duration-300 hover:scale-105 hover:bg-neutral hover:shadow-2xl"
          >
            <div className="card-body">
              <h2 className="card-title text-lg font-semibold">{pokemon.name}</h2>
              <img
                className="w-24 h-24 mx-auto transform transition duration-300 hover:scale-110"
                src={pokemon.image}
                alt={pokemon.name}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center mt-6">
          <div className="loader"></div> {/* Custom loader */}
        </div>
      )}

      
    </div>
  );
};

export default Pokemon;
