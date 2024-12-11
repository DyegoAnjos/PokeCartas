const form_elemento = document.querySelector("form")

const input_email_elemento = document.querySelector("#usuario_email")
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

form_elemento.addEventListener("submit", (e)=>{
    var regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    console.log(input_email_elemento.value)
    if(regex.test(input_email_elemento.value) === false){
        e.preventDefault()
        popup_alert("E-mail ou senha inválidos")
    }
    
    regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    if (regex.test(input_senha_elemento.value) === false){
        e.preventDefault()
        popup_alert("E-mail ou senha inválidos")
    }
})
