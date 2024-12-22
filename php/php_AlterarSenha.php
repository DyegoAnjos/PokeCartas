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
    $usuario_nome=$_POST["usuario_nome"];
    $usuario_email=strtolower($_POST["usuario_email"]);
    $nova_senha=md5($_POST["nova_senha"]);
    $hash = crypt($nova_senha, $keySecurity);
    $SQLComando;
    $resultados;

    $SQLComando = "SELECT COUNT(*) FROM usuario WHERE e_mail = :usuario_email";
    $stmt = $pdo->prepare($SQLComando);
    $stmt ->bindParam(":usuario_email", $usuario_email, PDO::PARAM_STR);
    $stmt->execute();
    $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

    if($resultados['COUNT(*)'] > 0){
        $SQLComando = "UPDATE usuario SET senha= :nova_senha WHERE e_mail = :email AND nome = :nome";
    
        $stmt = $pdo->prepare($SQLComando);
        $stmt ->bindParam(':nova_senha', $hash, PDO::PARAM_STR);
        $stmt ->bindParam(':email', $usuario_email, PDO::PARAM_STR);
        $stmt ->bindParam(':nome', $usuario_nome, PDO::PARAM_STR);
        $stmt->execute();

        header("Location: ../html/Login.html");
    }

?>