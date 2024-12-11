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

    $usuario_nome=$_POST["usuario_nome"];
    $usuario_email=strtolower($_POST["usuario_email"]);
    $usuario_senha=$_POST["usuario_senha"];
    $SQLComando;
    $resultados;

   

    $SQLComando = "SELECT COUNT(*) FROM usuario WHERE e_mail = :usuario_email";
    $stmt = $pdo->prepare($SQLComando);
    $stmt ->bindParam(":usuario_email", $usuario_email, PDO::PARAM_STR);
    $stmt->execute();
    $resultados = $stmt->fetch(PDO::FETCH_ASSOC);




    
    if($resultados['COUNT(*)'] == 0){
        $SQLComando = "INSERT INTO usuario (nome,e_mail,senha) VALUES(:nome,:email,:senha)";
    
        $stmt = $pdo->prepare($SQLComando);
        $stmt ->bindParam(':nome', $usuario_nome, PDO::PARAM_STR);
        $stmt ->bindParam(':email', $usuario_email, PDO::PARAM_STR);
        $stmt ->bindParam(':senha', $usuario_senha, PDO::PARAM_STR);

        $stmt->execute();

        $SQLComando = "SELECT u.id_usuario FROM usuario u WHERE u.e_mail =:usuario_email";
        $stmt = $pdo->prepare($SQLComando);
        $stmt ->bindParam(":usuario_email", $usuario_email, PDO::PARAM_STR);
        $stmt->execute();
        $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

        $SQLComando = "INSERT INTO `album`(`id_usuario`) VALUES (:id_usuario)";
    
        $stmt = $pdo->prepare($SQLComando);
        $stmt ->bindParam(':id_usuario', $resultados['id_usuario'], PDO::PARAM_STR);
        $stmt->execute();

        echo "Cadastrado";
    }

    else{
        //header("Location: ../html/Cadastro.html?erro=nome_existente");
        //exit();
        echo "E-mail já cadastrado";
    }
    

       
       
?>