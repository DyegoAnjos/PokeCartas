const div_elemento_popup = document.querySelector(".popup")
const text_elemento_popup = document.querySelector(".popup p")
const close_button = document.querySelector(".popup i")

close_button.addEventListener("click", () =>{
    div_elemento_popup.style.display = "none"
})


function popup_alert(mensagem){
    div_elemento_popup.style.display = "flex"
    text_elemento_popup.textContent = mensagem
}