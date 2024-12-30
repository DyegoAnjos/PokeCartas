const CaixaPersonagemMeio = document.querySelector("#CaixaPersonagemMeio")
const CaixaPersonagemLado1 = document.querySelector("#CaixaPersonagemLado1")
const CaixaPersonagemLado2 = document.querySelector("#CaixaPersonagemLado2")

const carta = document.querySelectorAll(".carta")
const cartaIdPokemon = document.querySelectorAll(".cartaIdPokemon")
const carta_hp_value = document.querySelectorAll(".ValoVidaPokemon")
const cartaImagePokemon = document.querySelectorAll(".cartaImagePokemon")
const cartaNomePokemon = document.querySelectorAll(".cartaNomePokemon")
const carta_caixaAtributosPokemon = document.querySelectorAll(".caixaAtributosPokemon")
const cartaCaixaTipoPokemon = document.querySelectorAll(".cartaCaixaTipoPokemon")
const caixaVidaPokemon = document.querySelectorAll(".caixaVidaPokemon")

const sumario = document.querySelector("#textoResultado")
const botaoProximaRodada = document.querySelector("#botaoProximaRodada")


const telaFinal = document.querySelector("#divVitoria")
const buttonJogarNovamente = document.querySelector("#botaoLutarNovamente")
const buttonMenu = document.querySelector("#botaoMenu")

const cartas_meio = document.querySelector("#cartaAtivos");
const botaoVoltar = document.querySelector("#botaoVoltar");

var pokemonCries = [];

var vitorias = [0,0];

const pai_original = new Map();




const escolhaJogadores = [];
const valoresJogadores = [];
var rodada = 1;

buttonJogarNovamente.addEventListener('click', () =>{
    window.location.href =  '../../resourcs/views/Batalha.html';
})

buttonMenu.addEventListener('click', () =>{
    window.location.href =  '../../resourcs/views/Menu.html';
})

document.addEventListener('DOMContentLoaded', function() {
    for(i=4;i < carta.length;i++){
        fetchPokemon(PegarNumeroAleatorio(1, 1025), i);
    }

    fetch('../../app/php_batalha.php')
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

async function fetchPokemon(pokemon_id, cod_carta) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon_id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Pokémon não encontrado');
        }
        const pokemon = await response.json();
        inserirInfosPokemon(pokemon, cod_carta);
    } catch (error) {
        console.error(error.message);
    }
}

function inserirInfosPokemon(pokemon, cod_carta){
    carta[cod_carta].style.backgroundColor = typesMap.get(pokemon.types[0].type.name)?.color
    try{
        carta[cod_carta].style.borderColor = typesMap.get(pokemon.types[1].type.name)?.color
        caixaVidaPokemon[cod_carta].style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color
        cartaNomePokemon[cod_carta].style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color
        cartaIdPokemon[cod_carta].style.backgroundColor = typesMap.get(pokemon.types[1].type.name)?.color
    }
    catch{

    }

    cartaIdPokemon[cod_carta].innerText= pokemon.id;
    carta_hp_value[cod_carta].innerText = normalizar(pokemon.stats[0].base_stat, 20, 150)
    cartaImagePokemon[cod_carta].setAttribute("src", pokemon.sprites.other['official-artwork'].front_default);

    cartaNomePokemon[cod_carta].innerText = pokemon.name.toUpperCase()
    if(pokemon.stats[1].base_stat > pokemon.stats[3].base_stat)
        carta_caixaAtributosPokemon[cod_carta].children[0].innerText = `ATK: ${normalizar(pokemon.stats[1].base_stat, 10, 150)}`
    else
        carta_caixaAtributosPokemon[cod_carta].children[0].innerText = `ATK: ${normalizar(pokemon.stats[3].base_stat, 10, 150)}`

    if(pokemon.stats[2].base_stat > pokemon.stats[4].base_stat)
        carta_caixaAtributosPokemon[cod_carta].children[1].innerText = `DEF: ${normalizar(pokemon.stats[2].base_stat, 10, 150)}`
    else
        carta_caixaAtributosPokemon[cod_carta].children[1].innerText = `DEF: ${normalizar(pokemon.stats[4].base_stat, 10, 150)}`
    
    carta_caixaAtributosPokemon[cod_carta].children[2].innerText = `SPEED: ${normalizar(pokemon.stats[5].base_stat, 10, 150)}`

    for(let i=0; i < 2; i++){
        cartaCaixaTipoPokemon[cod_carta].children[i].style.display="none"
    }



    for(let i = 0; i <= pokemon.types.length-1;i++){
        cartaCaixaTipoPokemon[cod_carta].children[i].style.display = "block"
        cartaCaixaTipoPokemon[cod_carta].children[i].style.backgroundColor = typesMap.get(pokemon.types[i].type.name)?.color
        cartaCaixaTipoPokemon[cod_carta].children[i].innerText = pokemon.types[i].type.name.toUpperCase()
    }

   
}

function jogo(){
    if(cartas_meio.children.length == 2 && rodada > 4){
        rodada = 2
    }

    else if(rodada > 4){
        rodada = 1
    }
        
    switch(rodada){
        case 1:{
            //Fase de escolha de pokemon            
            botaoProximaRodada.disabled = true;
            EscreverTextoAosPoucos(sumario, "Jogadores\nEscolham seus Pokemon!\nDepois clique em finalizar",20);
            setTimeout(() =>{
                botaoProximaRodada.disabled = false;
            }, 2000)
        }break;
        case 2:{        
            //Fase de escolha do jogador 1   
            if(cartas_meio.children.length < 2){
                rodada=1;
                jogo();
            }
            else{
                
                botaoProximaRodada.disabled = true;
                EscreverTextoAosPoucos(sumario, "Jogador 1\nEscolha a ação do seu Pokemon\nDepois clique em finalizar",20);
                cartas_meio.children[0].style.display = "flex";
                cartas_meio.children[1].style.display = "none";
                const elemento = cartas_meio.children[0].children[4];
                setTimeout(() =>{
                    for (let i = 0; i < 3; i++) {
                        cartas_meio.children[1].children[4].children[i].disabled = true;
                        cartas_meio.children[0].children[4].children[i].disabled = false;
                    }
                    for (let i = 0; i < 3; i++) {
                        const filho = elemento.children[i];
                        filho.addEventListener('click', () => {
                            valoresJogadores[0] = Number(filho.innerText.match(/\d+/g));
                            escolhaJogadores[0] = i;
                            sumario.value= `Jogador 1\nEscolha a ação do seu Pokemon\nDepois clique em finalizar\n${filho.innerText}`
                            botaoProximaRodada.disabled = false;
                        });
                    }
                    
                }, 2000)
            }
            
            
        }break;
        case 3:{
            //Fase de escolha do jogador 2
            botaoProximaRodada.disabled = true;
            EscreverTextoAosPoucos(sumario, "Jogador 2\nEscolha a ação do seu Pokemon\nDepois clique em finalizar",20);
            cartas_meio.children[1].style.display = "flex";
            cartas_meio.children[0].style.display = "none";
            const elemento = cartas_meio.children[1].children[4];

            setTimeout(() =>{
                for (let i = 0; i < 3; i++) {
                    cartas_meio.children[0].children[4].children[i].disabled = true;
                    cartas_meio.children[1].children[4].children[i].disabled = false;
                }
                for (let i = 0; i < 3; i++) {
                    const filho = elemento.children[i];
                    filho.addEventListener('click', () => {
                        valoresJogadores[1] = Number(filho.innerText.match(/\d+/g));
                        escolhaJogadores[1] = i;
                        sumario.value= `Jogador 2\nEscolha a ação do seu Pokemon\nDepois clique em finalizar\n${filho.innerText}`
                        botaoProximaRodada.disabled = false;
                   });
                }
                
            }, 2000)
            
        }break;
        case 4:{
            //Fase de batalha
            for (let i = 0; i < 3; i++) {
                cartas_meio.children[1].children[4].children[i].disabled = true;
            }
            botaoProximaRodada.disabled = true;
            cartas_meio.children[1].style.display = "flex";
            cartas_meio.children[0].style.display = "flex";
            EscreverTextoAosPoucos(sumario, `O resultado foi ` + batalha() + `\nClique em Finalizar para a próxima rodada`,20);
            setTimeout(() =>{
                botaoProximaRodada.disabled = false;
            }, 3000)
            
            console.log(vitorias[0])
            console.log(vitorias[1])

            setTimeout(() =>{
                if((CaixaPersonagemLado1.children.length == 0 && CaixaPersonagemLado1.children.length == 0) && vitorias[0] == 4 && vitorias[1] == 4){
                    telaFinal.style.display = "flex";
                    telaFinal.children[0].children[0].innerText = "Parabéns para os dois";
                    telaFinal.children[0].children[1].innerText = "Deu empate!";
                }
    
                else if(CaixaPersonagemLado1.children.length == 0 && vitorias[1] == 4){
                    telaFinal.style.display = "flex";
                    telaFinal.children[0].children[0].innerText = "Parabéns Jogador 2";
                    telaFinal.children[0].children[1].innerText = "Jogador 2 venceu!";
                }
    
                else if (CaixaPersonagemLado2.children.length == 0 && vitorias[0] == 4){
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
    let vencedor=PedraPapelTesoura(escolhaJogadores[0], escolhaJogadores[1])
    if(vencedor === "empate"){
        let morto = [0,0] 
        let hpcartaDerrotado = [];
        hpcartaDerrotado[0] = cartas_meio.children[0].children[0].children[1].children[0];
        hpcartaDerrotado[1] = cartas_meio.children[1].children[0].children[1].children[0];
        
        morto[0] = VerificarEstarMorto(Number(hpcartaDerrotado[0].innerText) - valoresJogadores[1])
        morto[1] = VerificarEstarMorto(Number(hpcartaDerrotado[1].innerText) - valoresJogadores[0])

        TocarSom("../audio/Audio_Atacks/" + typesMap.get((cartas_meio.children[1].children[3].children[0].innerHTML).toLowerCase())?.som, 1)
        TocarSom("../audio/Audio_Atacks/" + typesMap.get((cartas_meio.children[0].children[3].children[0].innerHTML).toLowerCase())?.som, 1)
        TocarSomPokemon(cartas_meio.children[0].children[0].children[0].innerText);
        TocarSomPokemon(cartas_meio.children[1].children[0].children[0].innerText);

        cartas_meio.children[0].classList.add("ataque_carta_esquerda");
        cartas_meio.children[1].classList.add("ataque_carta_direita");
        
        setTimeout(() =>{
            cartas_meio.children[0].classList.add("dano_carta_esquerda");
            cartas_meio.children[1].classList.add("dano_carta_direita");
            TocarSom("../audio/Extra_SFX/damageSound.wav", 1);
            TocarSom("../audio/Extra_SFX/damageSound.wav", 1);
            hpcartaDerrotado[0].innerText = Number(hpcartaDerrotado[0].innerText) - valoresJogadores[1];
            hpcartaDerrotado[1].innerText = Number(hpcartaDerrotado[1].innerText) - valoresJogadores[0];            
            
        }, 2000)

        setTimeout(() =>{
            cartas_meio.children[0].classList.remove("ataque_carta_esquerda");
            cartas_meio.children[1].classList.remove("ataque_carta_direita");
            cartas_meio.children[0].classList.remove("dano_carta_esquerda");
            cartas_meio.children[1].classList.remove("dano_carta_direita");

            if (morto[0] && morto[1]) {
                CapturarPokemon(cartas_meio.children[1].children[0].children[0].innerText)
                cartas_meio.children[0].classList.add("morte");
                cartas_meio.children[1].classList.add("morte");
                setTimeout(() =>{
                    cartas_meio.children[0].remove();
                    cartas_meio.children[0].remove(); 
                }, 1000)
                vitorias[0]++;
                vitorias[1]++;
            }

            else if(morto[0]){
                setTimeout(() =>{
                    cartas_meio.children[0].remove(); 
                }, 1000)
                vitorias[1]++;
            }

            else if(morto[1]){
                CapturarPokemon(cartas_meio.children[1].children[0].children[0].innerText)
                setTimeout(() =>{
                    cartas_meio.children[1].remove(); 
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
        let cartaSelecionado = cartas_meio.children[1].children[0].children[1]
        let hp_carta_dano = cartaSelecionado.querySelector('.ValoVidaPokemon')     

        TocarSom("../audio/Audio_Atacks/" + typesMap.get((cartas_meio.children[0].children[3].children[0].innerHTML).toLowerCase())?.som, 1)
        TocarSomPokemon(cartas_meio.children[0].children[0].children[0].innerText);
        cartas_meio.children[0].classList.add("ataque_carta_esquerda");
        
        morto = VerificarEstarMorto(Number(hp_carta_dano.innerText) - valoresJogadores[0])

        setTimeout(() =>{
            hp_carta_dano.innerText = Number(hp_carta_dano.innerText) - valoresJogadores[0]
            cartas_meio.children[1].classList.add("dano_carta_direita");
            TocarSom("../audio/Extra_SFX/damageSound.wav", 1);
        }, 1000)

        setTimeout(() =>{
            cartas_meio.children[0].classList.remove("ataque_carta_esquerda");
            cartas_meio.children[1].classList.remove("dano_carta_direita");

            if(VerificarEstarMorto(Number(hp_carta_dano.innerText), cartaSelecionado)){
                cartas_meio.children[1].classList.add("morte");
                CapturarPokemon(cartas_meio.children[1].children[0].children[0].innerText)
                setTimeout(() =>{
                    cartas_meio.children[1].remove(); 
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
        let cartaSelecionado = cartas_meio.children[0].children[0].children[1]
        let hp_carta_dano = cartaSelecionado.querySelector('.ValoVidaPokemon')

        TocarSom("../audio/Audio_Atacks/" + typesMap.get((cartas_CaixaPersonagemMeio.children[1].children[3].children[0].innerHTML).toLowerCase())?.som, 1)
        TocarSomPokemon(cartas_meio.children[1].children[0].children[0].innerText);
        cartas_meio.children[1].classList.add("ataque_carta_direita");

        morto = VerificarEstarMorto(Number(hp_carta_dano.innerText) - valoresJogadores[1])

        setTimeout(() =>{
            cartas_meio.children[0].classList.add("dano_carta_esquerda");
            hp_carta_dano.innerText = Number(hp_carta_dano.innerText) - valoresJogadores[1]
            TocarSom("../audio/Extra_SFX/damageSound.wav", 1);
        }, 1000)
        
        setTimeout(() =>{
            cartas_meio.children[1].classList.remove("ataque_carta_direita");
            cartas_meio.children[0].classList.remove("dano_carta_esquerda");
            
            if(morto){
                cartas_meio.children[0].classList.add("morte");
                setTimeout(() =>{
                    cartas_meio.children[0].remove(); 
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

//FUnção de escolher pokemon
carta.forEach(cartaElement => {
    pai_original.set(cartaElement, cartaElement.parentElement);

    cartaElement.addEventListener('click', () => {
        if (rodada == 1) {
            if (cartaElement.parentElement.id !== "cartaAtivos") {
                let jaTemElementoDoMesmoPai = false;

                Array.from(cartas_meio.children).forEach(child => {
                    if (pai_original.get(child) === cartaElement.parentElement) {
                        jaTemElementoDoMesmoPai = true;
                    }
                });

                if (!jaTemElementoDoMesmoPai) {
                    if (cartaElement.parentElement === CaixaPersonagemLado1) {
                        cartaElement.classList.add("escolhido_sumindo");
                        setTimeout(() =>{
                            cartaElement.classList.remove("escolhido_sumindo");
                            cartaElement.classList.add("escolhido_aparecendo");
                            cartas_meio.prepend(cartaElement);
                            
                        }, 500)

                        setTimeout(() =>{
                            
                            cartaElement.classList.remove("escolhido_aparecendo");
                        }, 1000)
                        
                        
                    } else {
                        cartaElement.classList.add("escolhido_sumindo");
                        setTimeout(() =>{
                            cartaElement.classList.remove("escolhido_sumindo");
                            cartaElement.classList.add("escolhido_aparecendo");
                            cartas_meio.appendChild(cartaElement);
                            
                        }, 500)

                        setTimeout(() =>{
                            cartaElement.classList.remove("escolhido_aparecendo");
                        }, 1000)
                    }
                    TocarSomPokemon(cartaElement.children[0].children[0].innerText);
                }
            } else {
                const paiOriginal = pai_original.get(cartaElement);
                cartaElement.classList.add("escolhido_sumindo");
                setTimeout(() =>{
                    cartaElement.classList.remove("escolhido_sumindo");
                    cartaElement.classList.add("escolhido_aparecendo");
                    paiOriginal.appendChild(cartaElement);
                    
                }, 500)

                setTimeout(() =>{
                    cartaElement.classList.remove("escolhido_aparecendo");
                }, 1000)
                
            }
        }
    });
});

function VerificarEstarMorto(hpcarta){
    if(hpcarta <= 0){
        return 1
    }

    else
        return 0
}

function EscreverTextoAosPoucos(textarea, texto, tempo) {
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

//Função de adicionar o pokemon para o jogador
function CapturarPokemon(id_pokemon) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/php_Batalha.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id_pokemon=" + encodeURIComponent(parseInt(id_pokemon)));
}

//Tocar o som do pokemon
async function TocarSomPokemon(pokemonId) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        if (!response.ok) throw new Error("Pokémon não encontrado!");

        const data = await response.json();
        const cryUrl = data.cries.latest;

        TocarSom(cryUrl,1);
    } catch (error) {
        console.error("Erro ao tentar reproduzir o som:", error);
    }
}

//Envelopamento de tocar som
function TocarSom(caminho, volume){
    const audio = new Audio(caminho);
    audio.volume = volume;
    audio.play();
}

botaoProximaRodada.addEventListener('click', () =>{  
    rodada++
    jogo();    
})

//Função que retorna lógica de pedra, papel e tesoura
function PedraPapelTesoura(escolha1, escolha2){
    if(escolha1 === escolha2)
        return "empate"

    else if((escolha1 === 1 && escolha2 === 0) || (escolha1 === 2 && escolha2 === 1) ||(escolha1 === 0 && escolha2 === 2))
        return 1

    else   
        return 2
}

botaoVoltar.addEventListener('click', () =>{
    window.location.href = '../../resources/views/Menu.html'
})