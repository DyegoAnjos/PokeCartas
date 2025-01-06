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
            //Inserção do usuário
            $SQLComando = "INSERT INTO usuario (nome, e_mail, senha) VALUES (:nome, :email, :senha)";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(':nome', $usuarioNome, PDO::PARAM_STR);
            $stmt->bindParam(':email', $usuarioEmail, PDO::PARAM_STR);
            $stmt->bindParam(':senha', $hash, PDO::PARAM_STR);
            $stmt->execute();

            //Captura do id d usuário
            $SQLComando = "SELECT id_usuario FROM usuario WHERE e_mail = :usuarioEmail";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(":usuarioEmail", $usuarioEmail, PDO::PARAM_STR);
            $stmt->execute();

            $usuarioId = $stmt->fetch(PDO::FETCH_ASSOC);

            //Criação do Álbum
            $SQLComando = "INSERT INTO album (id_usuario) VALUES (:id_usuario)";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(':id_usuario', $usuarioId, PDO::PARAM_INT);
            $stmt->execute();

            $albumId = $stmt->fetch(PDO::FETCH_ASSOC);
            //Inserção dos Pokemon iniciais
            $SQLComando = "INSERT INTO album_carta (id_album, id_carta) 
                        VALUES (:album, 1), (:album, 7), (:album, 4), 
                                (:album, 25), (:album, 17), (:album, 12), 
                                (:album, 99), (:album, 128)";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(':album', $albumId, PDO::PARAM_INT);
            $stmt->execute();

            //Não retorna true, apenas indefinido 
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