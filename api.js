import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapePokemonPage(generationInput) {
  try {
    const url = 'https://www.serebii.net/pokemon/gen' + generationInput + 'pokemon.shtml';
    const pageData = await axios.get(url);  // Get page data using axios
    const $ = cheerio.load(pageData.data);  // Load html page data using cheerio
    const pokemonTable = $('.dextable'); // Select the table that has all pokemon
    let pokemonTableRows = pokemonTable.find('tr').toArray(); // Convert the rows of the table to an array for traversal
    // Odd number rows are blank so filter them out of array and remove header row with slice
    pokemonTableRows = pokemonTableRows.filter((_, index) => index % 2 === 0).slice(1); 

    const firstPokemonIndex = Math.floor(Math.random() * pokemonTableRows.length);
    const secondPokemonIndex = Math.floor(Math.random() * pokemonTableRows.length);
    // Select the rows for both randomly selected indexes in array and get the name of the pokemon in the object row
    const firstPokemonName = $(pokemonTableRows[firstPokemonIndex]).find('td:nth-child(3)').text().trim(); 
    const secondPokemonName = $(pokemonTableRows[secondPokemonIndex]).find('td:nth-child(3)').text().trim();
    
    return { firstPokemonName, secondPokemonName };
  } catch (error) {
    console.error('Error in scrapePokemonPage:', error.message);
    throw error;
  }
}

export async function getPokemonInfo(pokemon) {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon; 
    const pokemonData = await fetch(url);  // Get response object that contains information on pokemon
    const pokemonDataJson = await pokemonData.json(); // Convert response object into json format
    let allTypes = [];
    for (const type of pokemonDataJson.types) { // Add the pokemons type(s) in the json object to an array
      allTypes.push(type.type.name);
    }
    return allTypes;  // Returns array of 'pokemon' type(s)
  } catch(error) {
    console.error('Error in getPokemonInfo:', error.message);
    throw error;
  }
}

