<?php
    include 'ConectarBanco.php';

    //Armazenamento de dados criptografados
    $keySecurity = 'z3L9XvUu+L1tS';
    $usuarioSenha=md5($_POST["usuarioSenha"]);
    $hash = crypt($usuarioSenha, $keySecurity);
    
    $usuarioEmail=strtolower($_POST["usuarioEmail"]);

    if (!isset($_POST['usuarioEmail']) || !isset($_POST['usuarioSenha'])) {
        echo json_encode(['error' => 'Dados incompletos']);
        exit;
    }

    //Validação de usuário
    $SQLComando = "SELECT id_usuario FROM usuario WHERE e_mail = :usuarioEmail AND senha = :usuarioSenha";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(":usuarioEmail", $usuarioEmail, PDO::PARAM_STR);
    $stmt->bindParam(":usuarioSenha", $hash, PDO::PARAM_STR);
    $stmt->execute();

    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($resultado) {
        session_start();
        $_SESSION['UsuarioLogadoEmail'] = $usuarioEmail;
        echo json_encode($resultado);
    } else {
        echo json_encode(['error' => 'Usuário não encontrado']);
    }
?>