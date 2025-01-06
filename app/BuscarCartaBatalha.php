<?php
    include 'ConectarBanco.php';
    
    $SQLComando;
    $resultados;

    
    session_start();
    $SQLComando = "SELECT a.id_album FROM usuario u, album a WHERE u.id_usuario = a.id_usuario AND u.e_mail = :usuarioEmail";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(":usuarioEmail", $_SESSION['UsuarioLogadoEmail'], PDO::PARAM_STR);
    $stmt->execute();
    $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

    $SQLComando = 'SELECT ac.id_carta FROM album_carta ac WHERE ac.id_album = :id_album ORDER BY RAND() LIMIT 4';
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(":id_album", $resultados['id_album'], PDO::PARAM_INT);
    $stmt->execute();
    $resultados = $stmt->fetchALL(PDO::FETCH_ASSOC);

    echo json_encode($resultados);
    
?>