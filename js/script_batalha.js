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

const sumario = document.querySelector("#resultado")
const button_finalizar = document.querySelector("#button_finalizar")


const telaFinal = document.querySelector("#vitoria")
const buttonJogarNovamente = document.querySelector("#lutar_novamente")
const buttonMenu = document.querySelector("#menu")

const cards_meio = document.querySelector("#card_ativos");
const button_voltar = document.querySelector("#button_voltar");

var pokemonCries = [];

var vitorias = [0,0];

const pai_original = new Map();




const escolhaJogadores = [];
const valoresJogadores = [];
var rodada = 1;

buttonJogarNovamente.addEventListener('click', () =>{
    window.location.href =  '../html/Batalha.html';
})

buttonMenu.addEventListener('click', () =>{
    window.location.href =  '../html/Menu.html';
})

document.addEventListener('DOMContentLoaded', function() {
    for(i=4;i < card.length;i++){
        fetchPokemon(PegarNumeroAleatorio(1, 1025), i);
    }

    fetch('../php/php_Batalha.php')
    .then(response =>{
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data =>{
        if(!Array.isArray(data)){
            console.error('A resposta não é um array:', data);
            return;
        }
        var indice = 0;
        data.forEach(carta =>{
            fetchPokemon(carta.id_carta,indice)
            indice++;
        })
    })

    .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
    });

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
    card[cod_card].style.backgroundColor = typesMap.get(pokemon.types[0].type.name)?.color
    try{
        card[cod_card].style.borderColor = typesMap.get(pokemon.types[1].type.name)?.color
        box_hp_pokemon[cod_card].style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color
        card_name_pokemon[cod_card].style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color
        card_id_pokemon[cod_card].style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color
    }
    catch{

    }

    card_id_pokemon[cod_card].innerText= pokemon.id;
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



    for(let i = 0; i <= pokemon.types.length-1;i++){
        card_box_type_pokemon[cod_card].children[i].style.display = "block"
        card_box_type_pokemon[cod_card].children[i].style.backgroundColor = typesMap.get(pokemon.types[i].type.name)?.color
        card_box_type_pokemon[cod_card].children[i].innerText = pokemon.types[i].type.name.toUpperCase()
    }

   
}


function jogo(){
    if(cards_meio.children.length == 2 && rodada > 4){
        
        rodada = 2
    }

    else if(rodada > 4){
        rodada = 1
    }
        
    
    switch(rodada){
        case 1:{
            
            button_finalizar.disabled = true;
            escreverTextoAosPoucos(sumario, "Jogadores\nEscolham seus Pokemon!\nDepois clique em finalizar",20);
            setTimeout(() =>{
                button_finalizar.disabled = false;
            }, 2000)
        }break;
        case 2:{           
            if(cards_meio.children.length < 2){
                rodada=1;
                jogo();
            }
            else{
                
                button_finalizar.disabled = true;
                escreverTextoAosPoucos(sumario, "Jogador 1\nEscolha a ação do seu Pokemon\nDepois clique em finalizar",20);
                cards_meio.children[0].style.display = "flex";
                cards_meio.children[1].style.display = "none";
                const elemento = cards_meio.children[0].children[4];
                setTimeout(() =>{
                    for (let i = 0; i < 3; i++) {
                        cards_meio.children[1].children[4].children[i].disabled = true;
                        cards_meio.children[0].children[4].children[i].disabled = false;
                    }
                    for (let i = 0; i < 3; i++) {
                        const filho = elemento.children[i];
                        filho.addEventListener('click', () => {
                            valoresJogadores[0] = Number(filho.innerText.match(/\d+/g));
                            escolhaJogadores[0] = i;
                            sumario.value= `Jogador 1\nEscolha a ação do seu Pokemon\nDepois clique em finalizar\n${filho.innerText}`
                            button_finalizar.disabled = false;
                        });
                    }
                    
                }, 2000)
            }
            
            
        }break;
        case 3:{
            
            button_finalizar.disabled = true;
            escreverTextoAosPoucos(sumario, "Jogador 2\nEscolha a ação do seu Pokemon\nDepois clique em finalizar",20);
            cards_meio.children[1].style.display = "flex";
            cards_meio.children[0].style.display = "none";
            const elemento = cards_meio.children[1].children[4];

            setTimeout(() =>{
                for (let i = 0; i < 3; i++) {
                    cards_meio.children[0].children[4].children[i].disabled = true;
                    cards_meio.children[1].children[4].children[i].disabled = false;
                }
                for (let i = 0; i < 3; i++) {
                    const filho = elemento.children[i];
                    filho.addEventListener('click', () => {
                        valoresJogadores[1] = Number(filho.innerText.match(/\d+/g));
                        escolhaJogadores[1] = i;
                        sumario.value= `Jogador 2\nEscolha a ação do seu Pokemon\nDepois clique em finalizar\n${filho.innerText}`
                        button_finalizar.disabled = false;
                   });
                }
                
            }, 2000)
            
        }break;
        case 4:{
            for (let i = 0; i < 3; i++) {
                cards_meio.children[1].children[4].children[i].disabled = true;
            }
            button_finalizar.disabled = true;
            cards_meio.children[1].style.display = "flex";
            cards_meio.children[0].style.display = "flex";
            escreverTextoAosPoucos(sumario, `O resultado foi ` + batalha() + `\nClique em Finalizar para a próxima rodada`,20);
            setTimeout(() =>{
                button_finalizar.disabled = false;
            }, 3000)
            
            console.log(vitorias[0])
            console.log(vitorias[1])

            setTimeout(() =>{
                if((box_lado1.children.length == 0 && box_lado1.children.length == 0) && vitorias[0] == 4 && vitorias[1] == 4){
                    telaFinal.style.display = "flex";
                    telaFinal.children[0].children[0].innerText = "Parabéns para os dois";
                    telaFinal.children[0].children[1].innerText = "Deu empate!";
                }
    
                else if(box_lado1.children.length == 0 && vitorias[1] == 4){
                    telaFinal.style.display = "flex";
                    telaFinal.children[0].children[0].innerText = "Parabéns Jogador 2";
                    telaFinal.children[0].children[1].innerText = "Jogador 2 venceu!";
                }
    
                else if (box_lado2.children.length == 0 && vitorias[0] == 4){
                    telaFinal.style.display = "flex";
                    telaFinal.children[0].children[0].innerText = "Parabéns Jogador 1";
                    telaFinal.children[0].children[1].innerText = "Você venceu!";
                }
                    
    
                telaFinal.children[0].children[2].innerText = `O Jogador 1 capturou ${vitorias[0]} Pokemon`;
            }, 3000)
            
        }break;
        
    }
}

function batalha(){
    let vencedor=Pedra_Papel_Tesoura(escolhaJogadores[0], escolhaJogadores[1])
    if(vencedor === "empate"){
        let morto = [0,0] 
        let hpCardDerrotado = [];
        hpCardDerrotado[0] = cards_meio.children[0].children[0].children[1].children[0];
        hpCardDerrotado[1] = cards_meio.children[1].children[0].children[1].children[0];

        
        morto[0] = estaMorto(Number(hpCardDerrotado[0].innerText) - valoresJogadores[1])
        morto[1] = estaMorto(Number(hpCardDerrotado[1].innerText) - valoresJogadores[0])



        tocarSom("../audio/Audio_Atacks/" + typesMap.get((cards_meio.children[1].children[3].children[0].innerHTML).toLowerCase())?.sound, 1)
        tocarSom("../audio/Audio_Atacks/" + typesMap.get((cards_meio.children[0].children[3].children[0].innerHTML).toLowerCase())?.sound, 1)
        tocarCries(cards_meio.children[0].children[0].children[0].innerText);
        tocarCries(cards_meio.children[1].children[0].children[0].innerText);

        cards_meio.children[0].classList.add("ataque_card_esquerda");
        cards_meio.children[1].classList.add("ataque_card_direita");
        
        setTimeout(() =>{
            cards_meio.children[0].classList.add("dano_card_esquerda");
            cards_meio.children[1].classList.add("dano_card_direita");
            tocarSom("../audio/Extra_SFX/damageSound.wav", 1);
            tocarSom("../audio/Extra_SFX/damageSound.wav", 1);
            hpCardDerrotado[0].innerText = Number(hpCardDerrotado[0].innerText) - valoresJogadores[1];
            hpCardDerrotado[1].innerText = Number(hpCardDerrotado[1].innerText) - valoresJogadores[0];            
            
        }, 2000)

        setTimeout(() =>{
            cards_meio.children[0].classList.remove("ataque_card_esquerda");
            cards_meio.children[1].classList.remove("ataque_card_direita");
            cards_meio.children[0].classList.remove("dano_card_esquerda");
            cards_meio.children[1].classList.remove("dano_card_direita");

            if (morto[0] && morto[1]) {
                Capturar_Pokemon(cards_meio.children[1].children[0].children[0].innerText)
                cards_meio.children[0].classList.add("morte");
                cards_meio.children[1].classList.add("morte");
                setTimeout(() =>{
                    cards_meio.children[0].remove();
                    cards_meio.children[0].remove(); 
                }, 1000)
                vitorias[0]++;
                vitorias[1]++;
            }

            else if(morto[0]){
                setTimeout(() =>{
                    cards_meio.children[0].remove(); 
                }, 1000)
                vitorias[1]++;
            }

            else if(morto[1]){
                Capturar_Pokemon(cards_meio.children[1].children[0].children[0].innerText)
                setTimeout(() =>{
                    cards_meio.children[1].remove(); 
                }, 1000)
                vitorias[0]++;
            }
    
        }, 3000)

        if (morto[0] && morto[1]) {
            return "empate, ambos os pokemon tomaram dano. O Jogador 1 capturou o pokemon inimigo, mas foi derrotado junto";
        }

        else if(morto[0]){
            return "empate, ambos os pokemon tomaram dano. O pokemon do Jogador 1 foi derrotado"
        }

        else if(morto[1]){
            return "empate, ambos os pokemon tomaram dano.. O pokemon do Jogador 2 foi capturado"
        }

        else{
            return "empate, ambos os pokemon tomaram dano."
        }

        
            
    }

    else if(vencedor === 1){
        let morto; 
        let cardSelecionado = cards_meio.children[1].children[0].children[1]
        let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon')     

        tocarSom("../audio/Audio_Atacks/" + typesMap.get((cards_meio.children[0].children[3].children[0].innerHTML).toLowerCase())?.sound, 1)
        tocarCries(cards_meio.children[0].children[0].children[0].innerText);
        cards_meio.children[0].classList.add("ataque_card_esquerda");
        
        morto = estaMorto(Number(hp_card_dano.innerText) - valoresJogadores[0])

        setTimeout(() =>{
            hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[0]
            cards_meio.children[1].classList.add("dano_card_direita");
            tocarSom("../audio/Extra_SFX/damageSound.wav", 1);
        }, 1000)

        setTimeout(() =>{
            cards_meio.children[0].classList.remove("ataque_card_esquerda");
            cards_meio.children[1].classList.remove("dano_card_direita");

            if(estaMorto(Number(hp_card_dano.innerText), cardSelecionado)){
                cards_meio.children[1].classList.add("morte");
                Capturar_Pokemon(cards_meio.children[1].children[0].children[0].innerText)
                setTimeout(() =>{
                    cards_meio.children[1].remove(); 
                }, 1000)
            }
    
            
        }, 2000)  

        if(morto){
            vitorias[0]++;
            return "O Jogador 1 escolheu a ação vitoriosa\nCausando dano no pokemon inimigo e o Capturando"
            
        }   
        else{
            return "O Jogador 1 escolheu a ação vitoriosa\nCausando dano no pokemon inimigo"
        }
    }

    else if(vencedor === 2){
        let morto; 
        let cardSelecionado = cards_meio.children[0].children[0].children[1]
        let hp_card_dano = cardSelecionado.querySelector('.value_hp_pokemon')

        tocarSom("../audio/Audio_Atacks/" + typesMap.get((cards_meio.children[1].children[3].children[0].innerHTML).toLowerCase())?.sound, 1)
        tocarCries(cards_meio.children[1].children[0].children[0].innerText);
        cards_meio.children[1].classList.add("ataque_card_direita");

        morto = estaMorto(Number(hp_card_dano.innerText) - valoresJogadores[1])

        setTimeout(() =>{
            cards_meio.children[0].classList.add("dano_card_esquerda");
            hp_card_dano.innerText = Number(hp_card_dano.innerText) - valoresJogadores[1]
            tocarSom("../audio/Extra_SFX/damageSound.wav", 1);
        }, 1000)
        
        setTimeout(() =>{
            cards_meio.children[1].classList.remove("ataque_card_direita");
            cards_meio.children[0].classList.remove("dano_card_esquerda");
            
            if(morto){
                cards_meio.children[0].classList.add("morte");
                setTimeout(() =>{
                    cards_meio.children[0].remove(); 
                }, 1000)
            }   
        }, 2000)
        
        if(morto){
            vitorias[1]++;
            return "O Jogador 2 escolheu a ação vitoriosa\nCausando dano no pokemon inimigo e o derrotando"
            
        }   
        else {
            return "O Jogador 2 escolheu a ação vitoriosa\nCausando dano no pokemon inimigo"
        }
    }
}

card.forEach(cardElement => {
    pai_original.set(cardElement, cardElement.parentElement);

    cardElement.addEventListener('click', () => {
        if (rodada == 1) {
            if (cardElement.parentElement.id !== "card_ativos") {
                let jaTemElementoDoMesmoPai = false;

                Array.from(cards_meio.children).forEach(child => {
                    if (pai_original.get(child) === cardElement.parentElement) {
                        jaTemElementoDoMesmoPai = true;
                    }
                });

                if (!jaTemElementoDoMesmoPai) {
                    if (cardElement.parentElement === lado1) {
                        cardElement.classList.add("escolhido_sumindo");
                        setTimeout(() =>{
                            cardElement.classList.remove("escolhido_sumindo");
                            cardElement.classList.add("escolhido_aparecendo");
                            cards_meio.prepend(cardElement);
                            
                        }, 500)

                        setTimeout(() =>{
                            
                            cardElement.classList.remove("escolhido_aparecendo");
                        }, 1000)
                        
                        
                    } else {
                        cardElement.classList.add("escolhido_sumindo");
                        setTimeout(() =>{
                            cardElement.classList.remove("escolhido_sumindo");
                            cardElement.classList.add("escolhido_aparecendo");
                            cards_meio.appendChild(cardElement);
                            
                        }, 500)

                        setTimeout(() =>{
                            cardElement.classList.remove("escolhido_aparecendo");
                        }, 1000)
                    }
                    tocarCries(cardElement.children[0].children[0].innerText);
                }
            } else {
                const paiOriginal = pai_original.get(cardElement);
                cardElement.classList.add("escolhido_sumindo");
                setTimeout(() =>{
                    cardElement.classList.remove("escolhido_sumindo");
                    cardElement.classList.add("escolhido_aparecendo");
                    paiOriginal.appendChild(cardElement);
                    
                }, 500)

                setTimeout(() =>{
                    cardElement.classList.remove("escolhido_aparecendo");
                }, 1000)
                
            }
        }
    });
});

function estaMorto(hpCard){
    if(hpCard <= 0){
        return 1
    }

    else
        return 0
}

function escreverTextoAosPoucos(textarea, texto, tempo) {
    let index = 0; 
  
    function typeText() {
      if (index < texto.length) {
        textarea.value += texto.charAt(index); 
        index++;
        setTimeout(typeText, tempo); 
      }
    }
  
    textarea.value = ""; 
    typeText(); 
  }
  
function normalizar(stat, limiteNormalizar, i){
    return Math.round(((stat - 1)/i * (limiteNormalizar-1) + 1))
}

function PegarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Capturar_Pokemon(id_pokemon) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/php_Batalha.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id_pokemon=" + encodeURIComponent(parseInt(id_pokemon)));
}


async function tocarCries(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error("Pokémon não encontrado!");

        const data = await response.json();
        const cryUrl = data.cries.latest;

        tocarSom(cryUrl,1);
    } catch (error) {
        console.error("Erro ao tentar reproduzir o som:", error);
    }
}

function tocarSom(caminho, volume){
    const audio = new Audio(caminho);
    audio.volume = volume;
    audio.play();
}



button_finalizar.addEventListener('click', () =>{  
    rodada++
    jogo();    
})


function Pedra_Papel_Tesoura(escolha1, escolha2){
    if(escolha1 === escolha2)
        return "empate"

    else if((escolha1 === 1 && escolha2 === 0) || (escolha1 === 2 && escolha2 === 1) ||(escolha1 === 0 && escolha2 === 2))
        return 1

    else   
        return 2
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
});