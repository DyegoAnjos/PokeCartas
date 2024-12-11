const button_batalhar = document.querySelector("#button_batalhar");
const button_album = document.querySelector("#button_album");

button_batalhar.addEventListener('click', () => {
    window.location.href =  '../html/Batalha.html';
});

button_album.addEventListener('click', () =>{
    window.open("../html/Album.html", "_self")
});