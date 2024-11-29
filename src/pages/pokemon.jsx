import React, { useState, useEffect } from "react";
import axios from "axios";

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      ); // Ambil 10 Pokémon
      const results = response.data.results;

      // Ambil detail masing-masing Pokémon untuk mendapatkan gambar
      const detailedPokemon = await Promise.all(
        results.map(async (pokemon) => {
          const detailResponse = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            image: detailResponse.data.sprites.front_default,
          };
        })
      );

      setPokemonList(detailedPokemon);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
    }
  };

  return (
    <div>
      <h1>Pokemon List</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {pokemonList.map((pokemon, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokemon;
