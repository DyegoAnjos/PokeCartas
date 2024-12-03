const input_senha_elemento = document.querySelector("#usuario_senha")
const botao_visuializar = document.querySelector(".button_visualizar i")

botao_visuializar.addEventListener('click', () => {
    if(botao_visuializar.className == "fa-solid fa-eye"){
        botao_visuializar.className = "fa-solid fa-eye-slash"
        input_senha_elemento.setAttribute("type","password")
    }
        

    else{
        botao_visuializar.className = "fa-solid fa-eye"
        input_senha_elemento.setAttribute("type","text")
    }
})
