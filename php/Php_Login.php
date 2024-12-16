<?php
    $host = 'localhost';
    $banco = "pokecartas";
    $usuario = 'root';
    $senha = '';
    $dsn = "mysql:host={$host};port=3306;dbname={$banco}";
    try{
        $pdo = new PDO($dsn, $usuario, $senha);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    catch (PDOException $e){
         die($e->getMessage());
    }

    $keySecurity = 'z3L9XvUu+L1tS';
    $usuario_email=strtolower($_POST["usuario_email"]);
    $usuario_senha=md5($_POST["usuario_senha"]);
    $hash = crypt($usuario_senha, $keySecurity);
    $SQLComando;
    $resultados;

    $SQLComando = "SELECT COUNT(*) FROM usuario WHERE e_mail = :usuario_email AND senha = :usuario_senha";
    $stmt = $pdo->prepare($SQLComando);
    $stmt ->bindParam(":usuario_email", $usuario_email, PDO::PARAM_STR);
    $stmt ->bindParam(":usuario_senha", $hash, PDO::PARAM_STR);
    $stmt->execute();
    $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

    if($resultados['COUNT(*)'] == 0){
        header("Location: ../html/AlterarSenha.html");
    }

    else{
        session_start();
        $_SESSION['usuario_logado_email'] = $usuario_email;
        header("Location: ../html/Menu.html");
    }
?>