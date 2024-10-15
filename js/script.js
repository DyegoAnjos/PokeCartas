document.getElementById('form').addEventListener('submit', function(event) {
    event.preventDefault(); 
    fetchPokemon();
});

async function fetchPokemon() {
    const pokemonName = document.getElementById('namePokemon').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();
        displayPokemonStats(pokemon);
    } catch (error) {
        console.error(error.message);
    }
}

function displayPokemonStats(pokemon) {
    console.log(`Nome: ${pokemon.name.toUpperCase()}`);
    console.log(`Altura: ${pokemon.height / 10} m`);
    console.log(`Peso: ${pokemon.weight / 10} kg`);
    console.log('Status:');
    pokemon.stats.forEach(stat => {
        if(stat.stat.name === "hp"){
            console.log(`${stat.stat.name}: ${normalizar(stat.base_stat, 20, 150)}`);
        }
        console.log(`${stat.stat.name}: ${normalizar(stat.base_stat, 10, 150)}`);
    });
}

function normalizar(stat, limiteNormalizar, i){
    return Math.round(((stat - 1)/i * (limiteNormalizar-1) + 1))
}