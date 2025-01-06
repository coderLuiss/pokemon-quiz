import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function getPokemonGenerationInput() {
    return new Promise((resolve, reject) => {
      rl.question('Pick a Pokemon Generation (1-9)\n', (pokemonGenerationInput) => {
        const generationNumber = parseInt(pokemonGenerationInput, 10);
        if (isNaN(generationNumber) || generationNumber < 1 || generationNumber > 9) {
          rl.close();
          reject(new Error('Invalid input. Please enter a number between 1 and 9.'));
        } else {
          resolve(generationNumber);
        }
      });
    });
}

export function getPokemonChoice(pokemon1, pokemon2, type) {
    return new Promise((resolve, reject) => {
        rl.question('Which pokemon is ' + type + ' type, ' + pokemon1 + ' or ' + pokemon2 + '?\n', (pokemonInput) => {
            if (pokemonInput !== pokemon1 && pokemonInput !== pokemon2) {
                rl.close();
                reject(new Error('Did not pick input of the two listed pokemon'));
            } else {
                rl.close();
                resolve(pokemonInput);
            }
        });
    });
}
