import readline from 'readline';
import {getPokemonInfo, scrapePokemonPage } from './api.js';
import { getPokemonGenerationInput, getPokemonChoice } from './cmdline-input-funcs.js';

const rl = readline.createInterface({
  input: process.stdin,
});


async function main() {
  try {
    const generationInput = await getPokemonGenerationInput();
    console.log(`You picked generation ${generationInput}`);
    const { firstPokemonName, secondPokemonName } = await scrapePokemonPage(generationInput);
    const randomPick = Math.floor(Math.random() * 2);
    let correctPokemon;
    if(randomPick === 0) {
      correctPokemon = firstPokemonName;
    } else {
      correctPokemon = secondPokemonName;
    }
    const correctAnswerType = await getPokemonInfo(correctPokemon.toLowerCase());
    const userChoice = await getPokemonChoice(firstPokemonName, secondPokemonName, correctAnswerType);
    if(userChoice === correctPokemon) {
      console.log('Congratulation, you got the answer right! You must be a pokemon expert.');
    } else {
      console.log('Sorry the right answer was ' + correctPokemon + '.');
    }
  } catch (error) {
    console.error(error.message);
  }

}

main();