const caixaPokemonAlbum = document.querySelector('main');
const totalCartas = document.querySelector('#totalCartas');
const botaoVoltar = document.querySelector("#botaoVoltar");

document.addEventListener('DOMContentLoaded', function() {
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
            const cartaElemento = document.createElement('div');
            cartaElemento.classList.add('carta');

            cartaElemento.innerHTML = `
            <div class="carta">
                <div class="cartaDivCabecalho">
                    <h3 class="cartaIdPokemon">${carta.id_carta}</h3>
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
                </div>
            </div>
            `;
            caixaPokemonAlbum.appendChild(cartaElemento);
        });
        const carta = document.querySelectorAll(".carta");
            for(i=0;i < carta.length;i++){
                fetchPokemon(data[i].id_carta,carta[i]);
            }
        totalCartas.value = totalCartasContador;
    })
    .catch(error => {
        console.error('Erro ao fazer a requisição:', error);
    });
});



botaoVoltar.addEventListener('click', () =>{
    window.location.href = '../../resources/views/Menu.html';
})