const divPopup = document.querySelector(".popup")
const TextPopup = document.querySelector(".popup p")
const botaoFechar = document.querySelector(".popup i")
const audioMusica = document.querySelector("#audioMusica")

if(audioMusica !== null)
    console.log("oii")

document.addEventListener('visibilitychange', () => {
    console.log("oi")
    if (document.hidden) {
        console.log("olá")
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

