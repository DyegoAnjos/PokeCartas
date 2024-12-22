const box_pokemon_album_elemento = document.querySelector('main');
const total_cartas_elemento = document.querySelector('#total_cartas');
const button_voltar = document.querySelector("#button_voltar");

document.addEventListener('DOMContentLoaded', function() {
    fetch('../php/php_album.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        var totalCartasCount = 0;
        if (!Array.isArray(data)) {
            console.error('A resposta não é um array:', data);
            return;
        }

        data.forEach(carta => {
            totalCartasCount++;
            const cartaElemento = document.createElement('div');
            cartaElemento.classList.add('card');

            cartaElemento.innerHTML = `
                <div class="card_cabecalho">
                    <h3 class="card_id_pokemon">${carta.id_carta}</h3>
                    <div class="box_hp_pokemon">
                        <h3 class="value_hp_pokemon">10</h3>
                        <h3 class="name_hp_pokemon">HP</h3>
                    </div>
                </div>
                <img src="https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/911.png" alt="Pokemon Imagem" class="card_image_pokemon">
                <h2 class="card_name_pokemon">Pikachu</h2>
                <div class="card_box_type_pokemon">
                    <p class="type1_pokemon">FIRE</p>
                    <p class="type2_pokemon">GHOST</p>
                </div>
                <div class="box_status_pokemon">
                    <p class="atk_pokemon">ATK: 100</p>
                    <p class="def_pokemon">DEF: 100</p>
                    <p class="spe_pokemon">SPEED: 100</p>
                </div>
            `;

            box_pokemon_album_elemento.appendChild(cartaElemento);
            
        });
        const card = document.querySelectorAll(".card");
            for(i=0;i < card.length;i++){
                fetchPokemon(data[i].id_carta,card[i]);
            }
        total_cartas_elemento.value = totalCartasCount;
    })
    .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
    });
});

async function fetchPokemon(pokemon_id, card) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();
        inserirInfosPokemon(pokemon, card,pokemon_id);
    } catch (error) {
    }
}

function inserirInfosPokemon(pokemon, card,pokemon_id) {

    const cardIdPokemon = card.querySelector('.card_id_pokemon');
    const cardImagePokemon = card.querySelector('.card_image_pokemon');
    const cardNamePokemon = card.querySelector('.card_name_pokemon');
    const boxHpPokemon = card.querySelector('.box_hp_pokemon');
    const cardBoxTypePokemon = card.querySelector('.card_box_type_pokemon');
    const cardBoxStatusPokemon = card.querySelector('.box_status_pokemon');

    card.style.backgroundColor = typesMap.get(pokemon.types[0].type.name)?.color;

    try {
        card.style.borderColor = typesMap.get(pokemon.types[1].type.name)?.color;
        boxHpPokemon.style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color;
        cardNamePokemon.style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color;
        cardIdPokemon.style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color;
    } catch (error) {

    }

    cardIdPokemon.innerText = pokemon.id;

    const cardHpValue = boxHpPokemon.querySelector('.value_hp_pokemon');
    cardHpValue.innerText = normalizar(pokemon.stats[0].base_stat, 20, 150);

    cardImagePokemon.setAttribute("src", pokemon.sprites.other['official-artwork'].front_default);

    cardNamePokemon.innerText = pokemon.name.toUpperCase();

    if (pokemon.stats[1].base_stat > pokemon.stats[3].base_stat) {
        cardBoxStatusPokemon.children[0].innerText = `ATK: ${normalizar(pokemon.stats[1].base_stat, 10, 150)}`;
    } else {
        cardBoxStatusPokemon.children[0].innerText = `ATK: ${normalizar(pokemon.stats[3].base_stat, 10, 150)}`;
    }

    if (pokemon.stats[2].base_stat > pokemon.stats[4].base_stat) {
        cardBoxStatusPokemon.children[1].innerText = `DEF: ${normalizar(pokemon.stats[2].base_stat, 10, 150)}`;
    } else {
        cardBoxStatusPokemon.children[1].innerText = `DEF: ${normalizar(pokemon.stats[4].base_stat, 10, 150)}`;
    }

    cardBoxStatusPokemon.children[2].innerText = `SPEED: ${normalizar(pokemon.stats[5].base_stat, 10, 150)}`;

    for (let i = 0; i < 2; i++) {
        cardBoxTypePokemon.children[i].style.display = "none";
    }

    for (let i = 0; i < pokemon.types.length; i++) {
        cardBoxTypePokemon.children[i].style.display = "block";
        cardBoxTypePokemon.children[i].style.backgroundColor = typesMap.get(pokemon.types[i].type.name)?.color;
        cardBoxTypePokemon.children[i].innerText = pokemon.types[i].type.name.toUpperCase();
    }
}


function normalizar(stat, limiteNormalizar, i){
    return Math.round(((stat - 1)/i * (limiteNormalizar-1) + 1))
}

function PegarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const typesMap = new Map([
    ["normal", { color: "#9FA19E", sound: "Tackle.mp3" }],
    ["fire", { color: "#F08030", sound: "BlastBurn.mp3" }],
    ["water", { color: "#6890F0", sound: "Bubble.mp3" }],
    ["grass", { color: "#78C850", sound: "BulletSeed.mp3" }],
    ["electric", { color: "#F8D030", sound: "Electrify.mp3" }],
    ["ice", { color: "#98D8D8", sound: "Blizzard.mp3" }],
    ["fighting", { color: "#C03028", sound: "BulletPunch.mp3" }],
    ["poison", { color: "#A040A0", sound: "AcidSpray.mp3" }],
    ["ground", { color: "#E0C068", sound: "Dig.mp3" }],
    ["flying", { color: "#A890F0", sound: "Acrobatics.mp3" }],
    ["psychic", { color: "#F85888", sound: "CalmMind.mp3" }],
    ["bug", { color: "#A8B820", sound: "BugBite.mp3" }],
    ["rock", { color: "#B8A038", sound: "RockTomb.mp3" }],
    ["ghost", { color: "#705898", sound: "Astonish.mp3" }],
    ["dragon", { color: "#7038F8", sound: "DragonDance.mp3" }],
    ["dark", { color: "#705848", sound: "DarkPulse.mp3" }],
    ["steel", { color: "#B8B8D0", sound: "AnchorShot.mp3" }],
    ["fairy", { color: "#EE99AC", sound: "FairyWind.mp3" }]
]);
button_voltar.addEventListener('click', () =>{
    window.location.href = '../html/Menu.html';
})