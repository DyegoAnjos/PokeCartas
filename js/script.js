const box_meio = document.querySelector("#meio")
const box_lado1 = document.querySelector("#lado1")
const box_lado2 = document.querySelector("#lado2")
const card = document.querySelectorAll(".card")
const card_id_pokemon = document.querySelectorAll(".card_id_pokemon")
const card_hp_value = document.querySelectorAll(".value_hp_pokemon")
const card_image_pokemon = document.querySelectorAll(".card_image_pokemon")
const card_name_pokemon = document.querySelectorAll(".card_name_pokemon")
const card_box_status_pokemon = document.querySelectorAll(".box_status_pokemon")
const card_box_type_pokemon = document.querySelectorAll(".card_box_type_pokemon")
const box_hp_pokemon = document.querySelectorAll(".box_hp_pokemon")
const button_finalizar = document.querySelector("#button_finalizar")
const sumario = document.querySelector("#sumario")

const escolhaJogadores = [];
const valoresJogadores = [];
var rodada = 0;

document.addEventListener('DOMContentLoaded', function() {
    for(i=0;i < card.length;i++){
        fetchPokemon(getRandomInteger(1, 1025), i);
    }
});


async function fetchPokemon(pokemon_id, cod_card) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();
        displayPokemonStats(pokemon, cod_card);
    } catch (error) {
        console.error(error.message);
    }
}

function displayPokemonStats(pokemon, cod_card){

    for(let i=0; i <= typesColors.length-1;i++){
        if(pokemon.types[0].type.name === typesColors[i].name){
            card[cod_card].style.backgroundColor=typesColors[i].color
        }
        try{
            if(pokemon.types[1].type.name === typesColors[i].name){
                card[cod_card].style.borderColor=typesColors[i].color
                box_hp_pokemon[cod_card].style.backgroundColor=typesColors[i].color
                card_name_pokemon[cod_card].style.backgroundColor=typesColors[i].color
                card_id_pokemon[cod_card].style.backgroundColor=typesColors[i].color
            }
        }
        catch{

        }
        
    }

    card_id_pokemon[cod_card].innerText= pokemon.order;
    card_hp_value[cod_card].innerText = normalizar(pokemon.stats[0].base_stat, 20, 150)
    card_image_pokemon[cod_card].setAttribute("src", pokemon.sprites.other['official-artwork'].front_default);

    card_name_pokemon[cod_card].innerText = pokemon.name.toUpperCase()
    if(pokemon.stats[1].base_stat > pokemon.stats[3].base_stat)
        card_box_status_pokemon[cod_card].children[0].innerText = `ATK: ${normalizar(pokemon.stats[1].base_stat, 10, 150)}`
    else
        card_box_status_pokemon[cod_card].children[0].innerText = `ATK: ${normalizar(pokemon.stats[3].base_stat, 10, 150)}`

    if(pokemon.stats[2].base_stat > pokemon.stats[4].base_stat)
        card_box_status_pokemon[cod_card].children[1].innerText = `DEF: ${normalizar(pokemon.stats[2].base_stat, 10, 150)}`
    else
        card_box_status_pokemon[cod_card].children[1].innerText = `DEF: ${normalizar(pokemon.stats[4].base_stat, 10, 150)}`
    
    card_box_status_pokemon[cod_card].children[2].innerText = `SPEED: ${normalizar(pokemon.stats[5].base_stat, 10, 150)}`


    console.log(pokemon.types.length)


    for(let i=0; i < 2; i++){
        card_box_type_pokemon[cod_card].children[i].style.display="none"
    }

    for(let i=0; i <= pokemon.types.length-1;i++){
        card_box_type_pokemon[cod_card].children[i].style.display="block"
        for(let j=0; j <= typesColors.length-1;j++){
            
            if(pokemon.types[i].type.name === typesColors[j].name){
                card_box_type_pokemon[cod_card].children[i].style.backgroundColor=typesColors[j].color
            }

                card_box_type_pokemon[cod_card].children[i].innerText = pokemon.types[i].type.name.toUpperCase()
        }
    }
}



function normalizar(stat, limiteNormalizar, i){
    return Math.round(((stat - 1)/i * (limiteNormalizar-1) + 1))
}

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const typesColors = [
    {
        name: "poison",
        color: "#9141cb"
    },
    {
        name: "psychic",
        color: "#ef4179"
    },
    {
        name: "steel",
        color: "#60a1b8"
    },
    {
        name: "rock",
        color: "#afa981"
    },
    {
        name: "normal",
        color: "#9fa19f"
    },
    {
        name: "fairy",
        color: "#ef70ef"
    },
    {
        name: "ice",
        color: "#3dcef3"
    },
    {
        name: "dark",
        color: "#624d4e"
    },
    {
        name: "ground",
        color: "#915121"
    },
    {
        name: "dragon",
        color: "#5060e0"
    },
    {
        name: "water",
        color: "#2980ef"
    },
    {
        name: "ghost",
        color: "#704170"
    },
    {
        name: "electric",
        color: "#fac000"
    },
    {
        name: "flying",
        color: "#81b9ef"
    },
    {
        name: "bug",
        color: "#91a119"
    },
    {
        name: "fighting",
        color: "#ff8000"
    },
    {
        name: "grass",
        color: "#3fa129"
    },
    {
        name: "fire",
        color: "#e62829"
    },
]

card.forEach(cardElement => {
    cardElement.addEventListener('click', () => {
        cardElement.classList.add('selecionado')
    });
});

// Itera sobre cada .box_status_pokemon
card_box_status_pokemon.forEach(boxStatusContainer => {
    // Pega o enésimo filho de cada .box_status_pokemon
    const enesimoFilho = boxStatusContainer.children[0]; // Substitua 2 pelo índice do filho desejado
    enesimoFilho.addEventListener('click', () => {
        escolhaJogadores[rodada] = 0
        valoresJogadores[rodada] = Number(boxStatusContainer.children[0].innerText.match(/\d+/g))
    });
});

card_box_status_pokemon.forEach(boxStatusContainer => {
    // Pega o enésimo filho de cada .box_status_pokemon
    const enesimoFilho = boxStatusContainer.children[1]; // Substitua 2 pelo índice do filho desejado
    enesimoFilho.addEventListener('click', () => {
        escolhaJogadores[rodada] = 1
        valoresJogadores[rodada] = Number(boxStatusContainer.children[1].innerText.match(/\d+/g))
    });
});

card_box_status_pokemon.forEach(boxStatusContainer => {
    // Pega o enésimo filho de cada .box_status_pokemon
    const enesimoFilho = boxStatusContainer.children[2]; // Substitua 2 pelo índice do filho desejado
    enesimoFilho.addEventListener('click', () => {
        escolhaJogadores[rodada] = 2
        valoresJogadores[rodada] = Number(boxStatusContainer.children[2].innerText.match(/\d+/g))
    });
});

button_finalizar.addEventListener('click', () =>{
    rodada++
    sumario.innerHTML = "Ação do Jogador 2 <br> Selecione a ação <br>e aperte em finalizar"
    if(rodada > 1){
        rodada = 0
        batalhar()
        sumario.innerHTML = "Ação do Jogador 1 <br> Selecione a ação <br>e aperte em finalizar"

    }
})

function batalhar(){
    let vencedor=Pedra_Papel_Tesoura(escolhaJogadores[0], escolhaJogadores[1])
    if(vencedor === "empate"){
        for(i=0;i<box_lado1.children.length;i++){
            if (box_lado1.children[i].classList.contains("selecionado")) {
                let cardSelecionado = box_lado1.children[i];
                let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon'); // Seleciona o elemento .value_hp_pokemon dentro do card selecionado
                
                hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[1]
            }

            if (box_lado2.children[i].classList.contains("selecionado")) {
                let cardSelecionado = box_lado2.children[i];
                let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon'); // Seleciona o elemento .value_hp_pokemon dentro do card selecionado
                
                hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[0]
            }
        }
    }

    else if(escolhaJogadores[0] === vencedor){
        for(i=0;i<box_lado2.children.length;i++){
            if (box_lado2.children[i].classList.contains("selecionado")) {
                let cardSelecionado = box_lado2.children[i];
                let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon'); // Seleciona o elemento .value_hp_pokemon dentro do card selecionado
                
                hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[0]
            }
        }
    }

    else{
        for(i=0;i<box_lado1.children.length;i++){
            if (box_lado1.children[i].classList.contains("selecionado")) {
                let cardSelecionado = box_lado1.children[i];
                let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon'); // Seleciona o elemento .value_hp_pokemon dentro do card selecionado
                
                hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[1]
            }
        }
    }

}

function Pedra_Papel_Tesoura(escola1, escolha2){
    if(escola1 === escolha2)
        return "empate"

    else if((escola1 === 0 && escolha2 === 1)||(escola1 === 1 && escolha2 === 0))
        return 1
    else if((escola1 === 1 && escolha2 === 2)||(escola1 === 2 && escolha2 === 1))
        return 2
    else
        return 0
}