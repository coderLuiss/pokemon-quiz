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
  } catch (e) {
    console.error(e);
  }
}


export async function getPokemonInfo(pokemon) {
  try {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemon;
    const pokemonData = await fetch(url);
    const pokemonDataJson = await pokemonData.json();
    let allTypes = [];
    for (const type of pokemonDataJson.types) {
      allTypes.push(type.type.name);
    }
    return allTypes;
  } catch(e) {
    console.error('Error: ' + e);
    exit(1);
  }
}

