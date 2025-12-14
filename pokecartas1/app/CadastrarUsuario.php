<?php
    header('Content-Type: application/json');
    include 'ConectarBanco.php';

     //Armazenamento de dados
     $keySecurity = 'z3L9XvUu+L1tS';
     $usuarioSenha=md5($_POST["usuarioSenha"]);
     $hash = crypt($usuarioSenha, $keySecurity);
     
     $usuarioEmail=strtolower($_POST["usuarioEmail"]);
     $usuarioNome=strtoupper($_POST["usuarioNome"]);


    try{
        //Validação de existência do usuário 
        $SQLComando = "SELECT id_usuario FROM usuario WHERE e_mail = :usuarioEmail";
        $stmt = $pdo->prepare($SQLComando);
        $stmt->bindParam(":usuarioEmail", $usuarioEmail, PDO::PARAM_STR);
        $stmt->execute();

        $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

        if($resultados == false){
            // Inserção do usuário
    $SQLComando = "INSERT INTO usuario (nome, e_mail, senha) VALUES (:nome, :email, :senha)";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(':nome', $usuarioNome, PDO::PARAM_STR);
    $stmt->bindParam(':email', $usuarioEmail, PDO::PARAM_STR);
    $stmt->bindParam(':senha', $hash, PDO::PARAM_STR);
    $stmt->execute();

    // Captura do ID do usuário
    $SQLComando = "SELECT id_usuario FROM usuario WHERE e_mail = :email";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(':email', $usuarioEmail, PDO::PARAM_STR);
    $stmt->execute();
    $usuarioId = $stmt->fetch(PDO::FETCH_ASSOC)['id_usuario'];

    // Criação do Álbum
    $SQLComando = "INSERT INTO album (id_usuario) VALUES (:id_usuario)";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(':id_usuario', $usuarioId, PDO::PARAM_INT);
    $stmt->execute();

    // Captura do ID do álbum
    $albumId = $pdo->lastInsertId();

    // Inserção dos Pokémon iniciais
    $SQLComando = "INSERT INTO album_carta (id_album, id_carta) 
                   VALUES 
                   ($albumId, 1), ($albumId, 7), ($albumId, 4), 
                   ($albumId, 25), ($albumId, 17), ($albumId, 12), 
                   ($albumId, 99), ($albumId, 128)";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->execute();

    // Retorno de sucesso
    echo json_encode(['success' => true]);

        }

        else {
            echo json_encode(['success' => false]);
        }
    }
    catch (Exception $e) {
        echo json_encode(['error' => $e->getMessage()]);
    }
?>