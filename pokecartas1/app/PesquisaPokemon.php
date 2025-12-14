<?php
    include 'ConectarBanco.php';

    $SQLComando;
    $resultados;
    
    $idPokemon = (int) $_POST['idPokemon'];


    session_start();
    $SQLComando = "SELECT ac.id_carta FROM album_carta ac, usuario u, album a WHERE u.id_usuario = a.id_usuario AND a.id_album = ac.id_album AND ac.id_carta = :idPokemon AND u.e_mail = :usuarioEmail";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(":idPokemon", $idPokemon, PDO::PARAM_INT);
    $stmt->bindParam(":usuarioEmail", $_SESSION['UsuarioLogadoEmail'], PDO::PARAM_STR);
    
    $stmt->execute();
    $resultados = $stmt->fetchALL(PDO::FETCH_ASSOC);

    // if (empty($resultados)) {
        
    // }
    echo json_encode($resultados);
?>