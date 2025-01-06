<?php
    include 'ConectarBanco.php';
    7
    $SQLComando;
    $resultados;

    if (isset($_POST['id_pokemon'])) {
        $id_pokemon_capturado = $_POST['id_pokemon'];
        
        session_start();
        
        if (isset($_SESSION['usuario_logado_email'])) {
            $usuarioEmail = $_SESSION['usuario_logado_email'];
            
            $SQLComando = "SELECT a.id_album FROM usuario u, album a WHERE a.id_usuario = u.id_usuario AND u.e_mail = :usuario_logado_email";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(":usuario_logado_email", $usuarioEmail, PDO::PARAM_STR); // Usando PDO::PARAM_STR para email
            $stmt->execute();
            
            $resultados = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($resultados) {
                $SQLComando = "INSERT INTO `album_carta`(`id_album`, `id_carta`) VALUES (:id_album, :id_carta)";
                $stmt = $pdo->prepare($SQLComando);
                $stmt->bindParam(":id_album", $resultados['id_album'], PDO::PARAM_INT);
                $stmt->bindParam(":id_carta", $id_pokemon_capturado, PDO::PARAM_INT);
                $stmt->execute();
                
                echo "Pokémon capturado com sucesso!";
            } else {
                echo "Erro: Álbum não encontrado.";
            }
        } else {
            echo "Erro: Usuário não logado.";
        }
    } 
    
    else{
        session_start();
        $SQLComando = "SELECT a.id_album FROM usuario u, album a WHERE u.id_usuario = a.id_usuario AND u.e_mail = :usuarioEmail";
        $stmt = $pdo->prepare($SQLComando);
        $stmt->bindParam(":usuarioEmail", $_SESSION['usuario_logado_email'], PDO::PARAM_STR);
        $stmt->execute();
        $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

        $SQLComando = 'SELECT ac.id_carta FROM album_carta ac WHERE ac.id_album = :id_album ORDER BY RAND() LIMIT 4';
        $stmt = $pdo->prepare($SQLComando);
        $stmt->bindParam(":id_album", $resultados['id_album'], PDO::PARAM_INT);
        $stmt->execute();
        $resultados = $stmt->fetchALL(PDO::FETCH_ASSOC);

        echo json_encode($resultados);
    }


    
?>