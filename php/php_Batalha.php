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

    $SQLComando;
    $resultados;

    if (isset($_POST['id_pokemon'])) {
        $id_pokemon_capturado = $_POST['id_pokemon'];
        
        // Iniciando a sessão
        session_start();
        
        // Verificando se o usuário está logado e pegando o email da sessão
        if (isset($_SESSION['usuario_logado_email'])) {
            $usuario_email = $_SESSION['usuario_logado_email'];
            
            // Preparando a consulta SQL para buscar o id_album do usuário
            $SQLComando = "SELECT a.id_album FROM usuario u, album a WHERE a.id_usuario = u.id_usuario AND u.e_mail = :usuario_logado_email";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(":usuario_logado_email", $usuario_email, PDO::PARAM_STR); // Usando PDO::PARAM_STR para email
            $stmt->execute();
            
            // Buscando os resultados da consulta
            $resultados = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($resultados) {
                // Inserindo o Pokémon capturado no álbum
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
    else {
        echo "Erro: id_pokemon não foi enviado.";
    }
    

?>