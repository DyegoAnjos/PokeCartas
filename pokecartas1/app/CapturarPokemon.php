<?php
    include 'ConectarBanco.php';
        
        $SQLComando;
        $resultados;

        if (isset($_POST['id_pokemon'])) {
            $idPokemonCapturado = $_POST['id_pokemon'];
            
            session_start();
            
            if (isset($_SESSION['UsuarioLogadoEmail'])) {
                $usuarioEmail = $_SESSION['UsuarioLogadoEmail'];
                
                $SQLComando = "SELECT a.id_album FROM usuario u, album a WHERE a.id_usuario = u.id_usuario AND u.e_mail = :UsuarioLogadoEmail";
                $stmt = $pdo->prepare($SQLComando);
                $stmt->bindParam(":UsuarioLogadoEmail", $usuarioEmail, PDO::PARAM_STR); // Usando PDO::PARAM_STR para email
                $stmt->execute();
                
                $resultados = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($resultados) {
                    $SQLComando = "INSERT INTO `album_carta`(`id_album`, `id_carta`) VALUES (:id_album, :id_carta)";
                    $stmt = $pdo->prepare($SQLComando);
                    $stmt->bindParam(":id_album", $resultados['id_album'], PDO::PARAM_INT);
                    $stmt->bindParam(":id_carta", $idPokemonCapturado, PDO::PARAM_INT);
                    $stmt->execute();
                    
                    echo "Pokémon capturado com sucesso!";
                } else {
                    echo "Erro: Álbum não encontrado.";
                }
            } else {
                echo "Erro: Usuário não logado.";
            }
        } 
?>