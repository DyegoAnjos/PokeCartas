const caixaPokemonAlbum = document.querySelector('main');
const totalCartas = document.querySelector('#totalCartas');
const botaoVoltar = document.querySelector("#botaoVoltar");
const botaoPesquisarPokemon = document.querySelector("#BotaoPesquisar");
const botaoLimparPesquisa = document.querySelector("#BotaoLimparPesquisa");
const InputPesquisaPokemon = document.querySelector("#InputPesquisaPokemon");


botaoPesquisarPokemon.addEventListener('click', function() {
    var regex = /[._%+@:]/g;
    InputPesquisaPokemon.value = InputPesquisaPokemon.value.replace(regex, "");
    InputPesquisaPokemon.value = InputPesquisaPokemon.value.replace(" ","-");
    var dadosParaEnviar = {
        idPokemon: InputPesquisaPokemon.value.toLowerCase()
    }
    
    var regex2 = new RegExp("^[0-9]$");
    
        fetchPokemon(InputPesquisaPokemon.value).then(pokemon => {
            if (pokemon != null) {
                console.log(pokemon.id);
                dadosParaEnviar.idPokemon = pokemon.id;
                console.log(dadosParaEnviar);

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
            else {
                    popup_alert("Pokemon não encontrado");
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


document.addEventListener('DOMContentLoaded', function() {
    CarregarTodosPokemon();
});



botaoVoltar.addEventListener('click', () =>{
    window.location.href = '../../resources/views/Menu.html';
})