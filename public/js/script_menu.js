const botaoBatalhar = document.querySelector("#botaoBatalhar");
const botaoAlbum = document.querySelector("#botaoAlbum");
const botaoAterarSenha = document.querySelector("#botaoAterarSenha");
const botaoDeslogar = document.querySelector("#botaoDeslogar");

botaoBatalhar.addEventListener('click', () => {
    window.location.href =  '../../resources/views/Batalha.html';
});

botaoAlbum.addEventListener('click', () =>{
    window.location.href =  '../../resources/views/Album.html';
});

botaoAterarSenha.addEventListener('click', () =>{
    window.location.href = '../../resources/views/AlterarSenha.html';
})

botaoDeslogar.addEventListener('click', () =>{
    window.location.href = '../../resources/views/Index.html';
})