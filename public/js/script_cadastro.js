const formularioCadastro = document.querySelector("form")

const campoNome = document.querySelector("#usuarioNome")
const campoEmail = document.querySelector("#usuarioEmail")
const campoSenha = document.querySelector("#usuarioSenha")
const botaoVisualizar = document.querySelector(".botaoVisualizar i")


botaoVisualizar.addEventListener('click', () => {
    if(botaoVisualizar.className == "fa-solid fa-eye"){
        botaoVisualizar.className = "fa-solid fa-eye-slash"
        campoSenha.setAttribute("type","password")
    }
        

    else{
        botaoVisualizar.className = "fa-solid fa-eye"
        campoSenha.setAttribute("type","text")
    }
})

formularioCadastro.addEventListener("submit", (e)=>{
    e.preventDefault()
    if(ValidarRegex() == true){
        const dadosParaEnviar = {
            usuarioNome: campoNome.value.trim(),
            usuarioSenha: campoSenha.value.trim(),
            usuarioEmail: campoEmail.value.trim(),
        }

        //Envio de dados
        fetch('../../app/CadastrarUsuario.php' , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  // Corrigido
            },
            body: new URLSearchParams(dadosParaEnviar).toString(),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro na requisição');
            }
            return response.json();
        })
        .then((data) => {
                if (data.success == false){
                popup_alert("Usuário já cadastrado");
            }

            else {
                window.location.href = '../../resources/views/Menu.html';
            }
        })
        .catch((error) => {
            console.error('Erro ao fazer a requisição:', error);
        });
    }
})

//Função de validação regex
function ValidarRegex(){
    if(campoNome.value.trim() == ""){
        popup_alert("Nome inválido")
        return false;
    }

    var regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    if(regex.test(campoEmail.value.trim()) === false){
        popup_alert("E-mail inválido")
        return false;
    }
    
    regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    if (regex.test(campoSenha.value.trim()) === false){
        popup_alert("Senha inválida")
        return false;
    }

    return true;
}