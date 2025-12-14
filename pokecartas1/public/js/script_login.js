const formularioLogin = document.querySelector("form");

const campoEmail = document.querySelector("#usuarioEmail");
const campoSenha = document.querySelector("#usuarioSenha");
const botaoVisualizar = document.querySelector(".botaoVisualizar i")

//Função de visualizar a senha
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

formularioLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    if (ValidarRegex() === true) {
        const dadosParaEnviar = {
            usuarioSenha: campoSenha.value.trim(),
            usuarioEmail: campoEmail.value.trim(),
        };
        //Envio de dados
        fetch('../../app/LogarUsuario.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
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
            if (!data || data.length === 0) {
                console.error('Nenhum usuário encontrado:', data);
                return;
            }

            if (data.id_usuario != null) {
                window.location.href = '../../resources/views/Menu.html'
            }
            else {
                popup_alert("Usuário não encontrado ou senha incorreta");
            }
        })
        .catch((error) => {
            console.error('Erro ao fazer a requisição:', error);
        });
    }
});

//Função de validação com regex
function ValidarRegex(){
    var regex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    if(regex.test(campoEmail.value.trim()) === false){
        popup_alert("E-mail inválido")
        return false;
    }

    regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$");
    if (regex.test(campoSenha.value.trim()) === false){
        popup_alert("Senha inválida")
        return false;
    }
    return true;
}