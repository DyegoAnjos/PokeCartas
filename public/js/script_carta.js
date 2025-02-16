async function fetchPokemon(pokemonId) { 
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;  
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        } 
        const pokemon = await response.json(); 
        return pokemon;
    } 
    catch (error) { 
        console.error(error);
        throw error;
    } 
}

async function fetchPokemonParaCarta(pokemonId, carta) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();
        inserirInfosPokemon(pokemon, carta);
    } catch (error) {
    }
}

function criarCarta(codPokemon) {
    const cartaCriada = document.createElement('div');
    cartaCriada.classList.add('carta');
    cartaCriada.innerHTML = `
        <div class="cartaDivCabecalho">
            <h3 class="cartaIdPokemon">${codPokemon}</h3>
            <div class="caixaVidaPokemon">
                <h3 class="ValoVidaPokemon">???</h3>
                <h3 class="textoVidaPokemon">HP</h3>
            </div>
        </div>
        <img src="../../public/favicon.png"  class="cartaImagePokemon">
        <h2 class="cartaNomePokemon">???</h2>
        <div class="cartaCaixaTipoPokemon">
            <p class="tipo1Pokemon">???</p>
            <p class="tipo2Pokemon">???</p>
        </div>
        <div class="caixaAtributosPokemon">
            <button type="button" class="ataquePokemon">
                ATK: ???
            </button>
            <button type="button" class="defesaPokemon">
                DEF: ???
            </button>
            <button type="button" class="velocidadePokemon">
                SPEED: ???
            </button>
        </div>`;
        fetchPokemonParaCarta(codPokemon, cartaCriada);
        return cartaCriada;
}

function inserirInfosPokemon(pokemon, carta) {
    const cartaIdPokemon = carta.querySelector('.cartaIdPokemon');
    const cartaImagePokemon = carta.querySelector('.cartaImagePokemon');
    const cartaNomePokemon = carta.querySelector('.cartaNomePokemon');
    const cartaCaixaVidaPokemon = carta.querySelector('.caixaVidaPokemon');
    const cartaCaixaTipoPokemon = carta.querySelector('.cartaCaixaTipoPokemon');
    const cartaCaixaAtributosPokemon = carta.querySelector('.caixaAtributosPokemon');

    carta.style.backgroundColor = tiposPokemon.get(pokemon.types[0].type.name)?.cor;

    try {
        carta.style.borderColor = tiposPokemon.get(pokemon.types[1].type.name)?.cor;
        cartaCaixaVidaPokemon.style.backgroundColor = tiposPokemon.get(pokemon.types[1].type.name)?.cor;
        cartaNomePokemon.style.backgroundColor = tiposPokemon.get(pokemon.types[1].type.name)?.cor;
        cartaIdPokemon.style.backgroundColor = tiposPokemon.get(pokemon.types[1].type.name)?.cor;
    } catch (error) {

    }

    cartaIdPokemon.innerText = pokemon.id;

    const cartaVidaValor = cartaCaixaVidaPokemon.querySelector('.ValoVidaPokemon');
    cartaVidaValor.innerText = Normalizar(pokemon.stats[0].base_stat, 20, 150);

    cartaImagePokemon.setAttribute("src", pokemon.sprites.other['official-artwork'].front_default);

    cartaNomePokemon.innerText = pokemon.name.toUpperCase();

    if (pokemon.stats[1].base_stat > pokemon.stats[3].base_stat) {
        cartaCaixaAtributosPokemon.children[0].innerText = `ATK: ${Normalizar(pokemon.stats[1].base_stat, 10, 150)}`;
    } else {
        cartaCaixaAtributosPokemon.children[0].innerText = `ATK: ${Normalizar(pokemon.stats[3].base_stat, 10, 150)}`;
    }

    if (pokemon.stats[2].base_stat > pokemon.stats[4].base_stat) {
        cartaCaixaAtributosPokemon.children[1].innerText = `DEF: ${Normalizar(pokemon.stats[2].base_stat, 10, 150)}`;
    } else {
        cartaCaixaAtributosPokemon.children[1].innerText = `DEF: ${Normalizar(pokemon.stats[4].base_stat, 10, 150)}`;
    }

    cartaCaixaAtributosPokemon.children[2].innerText = `SPEED: ${Normalizar(pokemon.stats[5].base_stat, 10, 150)}`;

    for (let i = 0; i < 2; i++) {
        cartaCaixaTipoPokemon.children[i].style.display = "none";
    }

    for (let i = 0; i < pokemon.types.length; i++) {
        cartaCaixaTipoPokemon.children[i].style.display = "block";
        cartaCaixaTipoPokemon.children[i].style.backgroundColor = tiposPokemon.get(pokemon.types[i].type.name)?.cor;
        cartaCaixaTipoPokemon.children[i].innerText = pokemon.types[i].type.name.toUpperCase();
    }
}

function Normalizar(stat, limiteNormalizar, i){
    return Math.round(((stat - 1)/i * (limiteNormalizar-1) + 1))
}

function PegarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const tiposPokemon = new Map([
    ["normal", { cor: "#9FA19E", som: "Tackle.mp3" }],
    ["fire", { cor: "#F08030", som: "BlastBurn.mp3" }],
    ["water", { cor: "#6890F0", som: "Bubble.mp3" }],
    ["grass", { cor: "#78C850", som: "BulletSeed.mp3" }],
    ["electric", { cor: "#F8D030", som: "Electrify.mp3" }],
    ["ice", { cor: "#98D8D8", som: "Blizzard.mp3" }],
    ["fighting", { cor: "#C03028", som: "BulletPunch.mp3" }],
    ["poison", { cor: "#A040A0", som: "AcidSpray.mp3" }],
    ["ground", { cor: "#E0C068", som: "Dig.mp3" }],
    ["flying", { cor: "#A890F0", som: "Acrobatics.mp3" }],
    ["psychic", { cor: "#F85888", som: "CalmMind.mp3" }],
    ["bug", { cor: "#A8B820", som: "BugBite.mp3" }],
    ["rock", { cor: "#B8A038", som: "RockTomb.mp3" }],
    ["ghost", { cor: "#705898", som: "Astonish.mp3" }],
    ["dragon", { cor: "#7038F8", som: "DragonDance.mp3" }],
    ["dark", { cor: "#705848", som: "DarkPulse.mp3" }],
    ["steel", { cor: "#B8B8D0", som: "AnchorShot.mp3" }],
    ["fairy", { cor: "#EE99AC", som: "FairyWind.mp3" }]
]);