import readline from 'readline';
import {getPokemonInfo, scrapePokemonPage } from './api.js';
import { getPokemonGenerationInput, getPokemonChoice } from './cmdline-input-funcs.js';

const rl = readline.createInterface({
  input: process.stdin,
});


async function main() {
  try {
    // Asks user for a pokemon generation and saves input if it is valid
    const generationInput = await getPokemonGenerationInput();
    // Gets two random pokemon from that generation
    const { firstPokemonName, secondPokemonName } = await scrapePokemonPage(generationInput);
    const randomPick = Math.floor(Math.random() * 2); // Randomly chooses a number between 0 and 1
    let correctPokemon;
    if(randomPick === 0) {
      correctPokemon = firstPokemonName;
    } else {
      correctPokemon = secondPokemonName;
    }
    // Gets type of pokemon that was randomly choosen of the two
    const correctAnswerType = await getPokemonInfo(correctPokemon.toLowerCase());
    // Asks user to choose which of the two pokemon matches with the types displayed and saves users input
    const userChoice = await getPokemonChoice(firstPokemonName, secondPokemonName, correctAnswerType);
    // Output based on if user choose correctly or not
    if(userChoice === correctPokemon) {
      console.log('Congratulation, you got the answer right! You must be a pokemon expert.');
    } else {
      console.log('Sorry the right answer was ' + correctPokemon + '.');
    }
  } catch (error) { // Catches any errors with fetching data from api's or invalid user inputs
    console.error(error.message);
  }
}

main();