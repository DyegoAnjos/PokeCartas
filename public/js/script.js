const divPopup = document.querySelector(".popup")
const TextPopup = document.querySelector(".popup p")
const botaoFechar = document.querySelector(".popup i")
const audioMusica = document.querySelector("#audioMusica")

if(audioMusica !== null)

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        audioMusica.pause(); // Pausa o áudio quando a aba for ocultada
    }
});

botaoFechar.addEventListener("click", () =>{
    divPopup.style.display = "none"
})


function popup_alert(mensagem){
    divPopup.style.display = "flex"
    TextPopup.textContent = mensagem
}

