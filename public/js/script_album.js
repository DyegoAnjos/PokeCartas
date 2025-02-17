const caixaPokemonAlbum = document.querySelector('main');
const totalCartas = document.querySelector('#totalCartas');
const botaoVoltar = document.querySelector("#botaoVoltar");
const botaoPesquisarPokemon = document.querySelector("#BotaoPesquisar");
const botaoLimparPesquisa = document.querySelector("#BotaoLimparPesquisa");
const InputPesquisaPokemon = document.querySelector("#InputPesquisaPokemon");

/* Funções de Ordenação */


/* Funções de pesquisa */
InputPesquisaPokemon.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        botaoPesquisarPokemon.click();
    }
});

botaoPesquisarPokemon.addEventListener('click', function() {
    InputPesquisaPokemon.value = InputPesquisaPokemon.value.replace(" ","-");
    var dadosParaEnviar = {
        idPokemon: InputPesquisaPokemon.value.toLowerCase()
    }    

    fetchPokemon(InputPesquisaPokemon.value).then(pokemon => {
        if (pokemon != null) {
            dadosParaEnviar.idPokemon = pokemon.id;
            fetch('../../app/PesquisaPokemon.php' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(dadosParaEnviar).toString(),
            })
                
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição');
                }
                return response.json();
            })
            .then(data => {
                var totalCartasContador = 0;
                if (!Array.isArray(data)) {
                    console.error('A resposta não é um array:', data);
                    return;
                }
                if(data.length === 0) {
                    caixaPokemonAlbum.innerHTML = "";
                    popup_alert("Pokemon não encontrado");
                    CarregarTodosPokemon();
                }
                else{
                    caixaPokemonAlbum.innerHTML = "";
                    data.forEach(carta => {
                        totalCartasContador++;
                        caixaPokemonAlbum.appendChild(criarCarta(carta.id_carta));
                    });
                    totalCartas.value = totalCartasContador;
                }
                    
            })
            .catch(error => {
                console.error('Erro ao fazer a requisição:', error);
            });
            }
        else{
                caixaPokemonAlbum.innerHTML = "";
                popup_alert("Pokemon não encontrado");
                CarregarTodosPokemon();
            }
        }
    );
        

    
})

botaoLimparPesquisa.addEventListener('click', function() {
    InputPesquisaPokemon.value = "";
    CarregarTodosPokemon();
})

function CarregarTodosPokemon(){
    fetch('../../app/BuscarCartasAlbum.php')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        return response.json();
    })
    .then(data => {
        var totalCartasContador = 0;
        if (!Array.isArray(data)) {
            console.error('A resposta não é um array:', data);
            return;
        }

        data.forEach(carta => {
            totalCartasContador++;
            caixaPokemonAlbum.appendChild(criarCarta(carta.id_carta));
        });
        totalCartas.value = totalCartasContador;
    })
    .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
    });
}

/* funções estruturais */

document.addEventListener('DOMContentLoaded', function() {
    CarregarTodosPokemon();
});



botaoVoltar.addEventListener('click', () =>{
    window.location.href = '../../resources/views/Menu.html';
})