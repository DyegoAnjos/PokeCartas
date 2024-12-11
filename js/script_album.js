const form_elemento = document.querySelector('form');
const button_pesquisar_elemento = document.querySelector('#button_pesquisar')
const input_pesquisar_elemento = document.querySelector('#input_pesquisar')
const box_pokemon_album_elemento = document.querySelector('main');
const total_cartas_elemento = document.querySelector('#total_cartas');

button_pesquisar_elemento.addEventListener('click', (e) =>{
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    e.preventDefault();

    if(regex.test(input_pesquisar_elemento.value) === false){
        popup_alert("Campo Inválido");
    }
});


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

            // Adicionando o elemento da carta no container
            box_pokemon_album_elemento.appendChild(cartaElemento);
            
        });
        const card = document.querySelectorAll(".card");
            for(i=0;i < card.length;i++){
                fetchPokemon(data[i].id_carta,card[i]);
            }
        console.log(totalCartasCount)
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

    // Acessando os elementos dentro do card
    const cardIdPokemon = card.querySelector('.card_id_pokemon');
    const cardImagePokemon = card.querySelector('.card_image_pokemon');
    const cardNamePokemon = card.querySelector('.card_name_pokemon');
    const boxHpPokemon = card.querySelector('.box_hp_pokemon');
    const cardBoxTypePokemon = card.querySelector('.card_box_type_pokemon');
    const cardBoxStatusPokemon = card.querySelector('.box_status_pokemon');

    // Configurando o fundo do card com base no tipo do Pokémon
    card.style.backgroundColor = typesColorsMap.get(pokemon.types[0].type.name);

    try {
        // Caso o Pokémon tenha dois tipos, ajusta as cores correspondentes
        card.style.borderColor = typesColorsMap.get(pokemon.types[1].type.name);
        boxHpPokemon.style.backgroundColor = typesColorsMap.get(pokemon.types[1].type.name);
        cardNamePokemon.style.backgroundColor = typesColorsMap.get(pokemon.types[1].type.name);
        cardIdPokemon.style.backgroundColor = typesColorsMap.get(pokemon.types[1].type.name);
    } catch (error) {
        // Caso não haja um segundo tipo, não faz nada
    }

    // Preenchendo o ID do Pokémon
    cardIdPokemon.innerText = pokemon.id;

    // Preenchendo o valor do HP (ajustado para uma escala de 20 a 150)
    const cardHpValue = boxHpPokemon.querySelector('.value_hp_pokemon');
    cardHpValue.innerText = normalizar(pokemon.stats[0].base_stat, 20, 150);

    // Configurando a imagem do Pokémon
    cardImagePokemon.setAttribute("src", pokemon.sprites.other['official-artwork'].front_default);

    // Preenchendo o nome do Pokémon
    cardNamePokemon.innerText = pokemon.name.toUpperCase();

    // Preenchendo os status do Pokémon (ATK, DEF, SPEED)
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

    // Escondendo os tipos do Pokémon que não estão presentes (caso o Pokémon tenha apenas um tipo)
    for (let i = 0; i < 2; i++) {
        cardBoxTypePokemon.children[i].style.display = "none";
    }

    // Preenchendo os tipos do Pokémon
    for (let i = 0; i < pokemon.types.length; i++) {
        cardBoxTypePokemon.children[i].style.display = "block";
        cardBoxTypePokemon.children[i].style.backgroundColor = typesColorsMap.get(pokemon.types[i].type.name);
        cardBoxTypePokemon.children[i].innerText = pokemon.types[i].type.name.toUpperCase();
    }
}


function normalizar(stat, limiteNormalizar, i){
    return Math.round(((stat - 1)/i * (limiteNormalizar-1) + 1))
}

function PegarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const typesColorsMap = new Map([
    ["fire", "#F08030"],
    ["water", "#6890F0"],
    ["grass", "#78C850"],
    ["electric", "#F8D030"],
    ["ice", "#98D8D8"],
    ["fighting", "#C03028"],
    ["poison", "#A040A0"],
    ["ground", "#E0C068"],
    ["flying", "#A890F0"],
    ["psychic", "#F85888"],
    ["bug", "#A8B820"],
    ["rock", "#B8A038"],
    ["ghost", "#705898"],
    ["dragon", "#7038F8"],
    ["dark", "#705848"],
    ["steel", "#B8B8D0"],
    ["fairy", "#EE99AC"]
]);