const button_batalhar = document.querySelector("#button_batalhar");
const button_album = document.querySelector("#button_album");
const button_alterarSenha = document.querySelector("#button_alterarSenha");
const button_voltar = document.querySelector("#button_voltar");

button_batalhar.addEventListener('click', () => {
    window.location.href =  '../html/Batalha.html';
});

button_album.addEventListener('click', () =>{
    window.location.href =  '../html/Album.html';
});

button_alterarSenha.addEventListener('click', () =>{
    window.location.href = '../html/AlterarSenha.html';
})

button_voltar.addEventListener('click', () =>{
    window.location.href = '../html/Login.html';
})