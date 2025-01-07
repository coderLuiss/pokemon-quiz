import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Method that tracks the what pokemon generation number the user inputs
export function getPokemonGenerationInput() {
    return new Promise((resolve, reject) => {
      rl.question('Pick a Pokemon Generation (1-9)\n', (pokemonGenerationInput) => {
        const generationNumber = parseInt(pokemonGenerationInput, 10);  // Converts input user entered into number
        // Checks that the input is a number and a between 1-9 (because those are the only pokemon generations)
        if (isNaN(generationNumber) || generationNumber < 1 || generationNumber > 9) {  // Throws an error if not valid number
          rl.close();
          reject(new Error('Invalid input. Please enter a number between 1 and 9.'));
        } else {  // Returns with number if its is between 1 and 9
          resolve(generationNumber);
        }
      });
    });
}

// Method that tracks what choice the user picks between two pokemon based on the question asked about the type
export function getPokemonChoice(pokemon1, pokemon2, type) {
    return new Promise((resolve, reject) => {
        rl.question('Which pokemon is ' + type + ' type ' + pokemon1 + ' or ' + pokemon2 + '?\n', (pokemonInput) => {
          // Checks that the user inputed a pokemon that was one of the ones listed   
          if (pokemonInput !== pokemon1 && pokemonInput !== pokemon2) {   // Throws error if user did not enter a valid pokemon
                rl.close();
                reject(new Error('Did not pick input of the two listed pokemon'));
            } else {  // Otherwise returns the users choice
                rl.close();
                resolve(pokemonInput);
            }
        });
    });
}
