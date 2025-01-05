import readline from 'readline';
import scrapePokemonPage from './webscraping.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function pokemonGenerationInput() {
  return new Promise((resolve, reject) => {
    rl.question('Pick a Pokemon Generation (1-9)\n', (pokemonGenerationInput) => {
      const generationNumber = parseInt(pokemonGenerationInput, 10); // Convert the input to a number
      if (isNaN(generationNumber) || generationNumber < 1 || generationNumber > 9) {
        rl.close();
        reject(new Error('Invalid input. Please enter a number between 1 and 9.'));
      } else {
        rl.close();
        resolve(generationNumber);
      }
    });
  });
}

async function main() {
  try {
    const generationInput = await pokemonGenerationInput();
    console.log(`You picked generation ${generationInput}`);
    console.log(await scrapePokemonPage());
    console.log('trying something');

  } catch (error) {
    console.error(error.message);
  }

}
main();