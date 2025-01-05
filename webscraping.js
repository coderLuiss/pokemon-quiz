import axios from 'axios';
import * as cheerio from 'cheerio';

async function scrapePokemonPage() {
  try {
    const url = 'https://www.serebii.net/pokemon/gen9pokemon.shtml';
    const pageData = await axios.get(url);
    const $ = cheerio.load(pageData.data);
    const pokemonTable = $('.dextable'); // Select the table with class 'dextable'
    let pokemonTableRows = pokemonTable.find('tr').toArray(); // Convert to array for traversal
    pokemonTableRows = pokemonTableRows.filter((_, index) => index % 2 === 0).slice(1); // Filter out the rows that are not Pokemon rows and remove the header row

    const firstPokemonIndex = Math.floor(Math.random() * pokemonTableRows.length); // Randomly select a row
    const secondPokemonIndex = Math.floor(Math.random() * pokemonTableRows.length); // Randomly select another row
    const firstPokemonName = $(pokemonTableRows[firstPokemonIndex]).find('td:nth-child(3)').text().trim(); // Adjust the selector based on the table structure
    const secondPokemonName = $(pokemonTableRows[secondPokemonIndex]).find('td:nth-child(3)').text().trim(); // Adjust the selector based on the table structure
    return { firstPokemonName, secondPokemonName };
  } catch (e) {
    console.error(e);
  }
}

export default scrapePokemonPage;