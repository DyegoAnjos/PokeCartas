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
const sumario = document.querySelector("#resultado")

const cards_meio = document.querySelector("#card_ativos");

const pai_original = new Map();

const escolhaJogadores = [];
const valoresJogadores = [];
var rodada = 1;

document.addEventListener('DOMContentLoaded', function() {
    for(i=0;i < card.length;i++){
        fetchPokemon(PegarNumeroAleatorio(1, 1025), i);
    }
    jogo()
});


async function fetchPokemon(pokemon_id, cod_card) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();
        inserirInfosPokemon(pokemon, cod_card);
    } catch (error) {
        console.error(error.message);
    }
}

function inserirInfosPokemon(pokemon, cod_card){
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

function PegarNumeroAleatorio(min, max) {
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

function jogo(){
    switch(rodada){
        case 1:{
            sumario.value = "Jogadores\nEscolham seus Pokemon!\nDepois clique em finalizar"
        }break;
        case 2:{
            sumario.value = "Jogador 1\nEscolha a ação do seu Pokemon\nDepois clique em finalizar";
            cards_meio.children[0].style.display = "flex";
            cards_meio.children[1].style.display = "none";
            const elemento = cards_meio.children[0].children[4];

            for (let i = 0; i < 3; i++) {
                const filho = elemento.children[i];
                filho.addEventListener('click', () => {
                    valoresJogadores[0] = Number(filho.innerText.match(/\d+/g));
                    escolhaJogadores[0] = i;
                    console.log(escolhaJogadores[0])
                    sumario.value = `Jogador 1\nEscolha a ação do seu Pokemon\nDepois clique em finalizar\n${filho.innerText}`;
               });
            }
        }break;
        case 3:{
            sumario.value = "Jogador 2\nEscolha a ação do seu Pokemon\nDepois clique em finalizar";
            cards_meio.children[1].style.display = "flex";
            cards_meio.children[0].style.display = "none";
            const elemento = cards_meio.children[1].children[4];

            for (let i = 0; i < 3; i++) {
                const filho = elemento.children[i];
                filho.addEventListener('click', () => {
                    valoresJogadores[1] = Number(filho.innerText.match(/\d+/g));
                    escolhaJogadores[1] = i;
                    console.log(escolhaJogadores[0])
                    sumario.value = `Jogador 2\nEscolha a ação do seu Pokemon\nDepois clique em finalizar\n${filho.innerText}`;
               });
            }
        }break;
        case 4:{
            cards_meio.children[1].style.display = "flex";
            cards_meio.children[0].style.display = "flex";
            sumario.value = `O resultado foi ` + batalha() + `\nClique em Finalizar para a próxima rodada`

        }break;
    }
}
function batalha(){
    let vencedor=Pedra_Papel_Tesoura(escolhaJogadores[0], escolhaJogadores[1])
    if(vencedor === "empate"){
        let morto = [0,0] 
        let cardSelecionado = cards_meio.children[0].children[0].children[1]
        let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon')

        hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[1]

        morto[0] += estaMorto(Number(hp_card_dano.innerText), cards_meio.children[0])

        cardSelecionado = cards_meio.children[1].children[0].children[1]
        hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon')

        hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[0]

        morto[1] += estaMorto(Number(hp_card_dano.innerText), cards_meio.children[0])

        if (morto[0] && morto[1]) {
            if (cards_meio.children.length > 0) {
                cards_meio.children[0].remove();
                cards_meio.children[0].remove();
            }
            return "empate, ambos tomaram dano. Ambos os pokemon foram derrotados";
        }
        

        else if(morto[0]){
            if (cards_meio.children.length > 0) {
                cards_meio.children[0].remove();
            }
            return "empate, ambos tomaram dano. O pokemon do Jogador 1 foi derrotado"
        }

        else if(morto[1]){
            
            if (cards_meio.children.length > 1) {
                cards_meio.children[1].remove();
            }
            return "empate, ambos tomaram dano. O pokemon do Jogador 2 foi derrotado"
        }

        else{
            return "empate, ambos tomaram dano. Nenhum pokemon foi derrotado"
        }
            
    }

    if(escolhaJogadores[0] === vencedor){
        let cardSelecionado = cards_meio.children[1].children[0].children[1]
        let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon')

        hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[0]

        return "O Jogador 1 ganhou!\nCausou dano no inimigo"
    }

    else{
        let cardSelecionado = cards_meio.children[0].children[0].children[1]
        let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon')

        hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[1]

        return "O Jogador 1 ganhou!\nCausou dano no inimigo"
    }
}

function estaMorto(hpCard, card){
    if(hpCard <= 0){
        return 1
    }

    else
        return 0
}

card.forEach(cardElement => {
    pai_original.set(cardElement, cardElement.parentElement);

    cardElement.addEventListener('click', () => {
        if(rodada==1){
            if (cardElement.parentElement.id !== "card_ativos") {
                let jaTemElementoDoMesmoPai = false;
    
                Array.from(cards_meio.children).forEach(child => {
                    if (pai_original.get(child) === cardElement.parentElement) {
                        jaTemElementoDoMesmoPai = true;
                    }
                });
    
                if (!jaTemElementoDoMesmoPai) {
                    if (cardElement.parentElement === lado1) {
                        cards_meio.prepend(cardElement);
                    } else {
                        cards_meio.appendChild(cardElement);
                    }
                }
            } else {
                const paiOriginal = pai_original.get(cardElement);
                paiOriginal.appendChild(cardElement);
            }
        }
       
    });
});

button_finalizar.addEventListener('click', () =>{
   // if(rodada === 1 && cards_meio.children.length === 2){
        if(rodada < 4){
            rodada++
        }
        else{
            rodada = 0;
        }
        jogo();
    //}
    
})


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