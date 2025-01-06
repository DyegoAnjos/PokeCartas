<?php
    header('Content-Type: application/json');
    include 'ConectarBanco.php';

    //Armazenamento de dados
    $keySecurity = 'z3L9XvUu+L1tS';
    $usuarioSenha=md5($_POST["usuarioSenha"]);
    $hash = crypt($usuarioSenha, $keySecurity);
     
    $usuarioEmail=strtolower($_POST["usuarioEmail"]);
    $usuarioNome=strtoupper($_POST["usuarioNome"]);

    //Validação de existência do usuário 
    $SQLComando = "SELECT id_usuario FROM usuario WHERE e_mail = :usuarioEmail";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(":usuarioEmail", $usuarioEmail, PDO::PARAM_STR);
    $stmt->execute();

    $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

    if($resultados != false){
        //Atualizar senha
        $SQLComando = "UPDATE usuario SET senha= :nova_senha WHERE e_mail = :email AND nome = :nome";
        $stmt = $pdo->prepare($SQLComando);
        $stmt ->bindParam(':nova_senha', $hash, PDO::PARAM_STR);
        $stmt ->bindParam(':email', $usuarioEmail, PDO::PARAM_STR);
        $stmt ->bindParam(':nome', $usuarioNome, PDO::PARAM_STR);
        $stmt->execute();

        echo json_encode(['success' => true]);
    }

    else{
        echo json_encode(['success' => false]);
    }

?>