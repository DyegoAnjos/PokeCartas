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

    $SQLComando = "SELECT ac.id_carta FROM album a, album_carta ac WHERE  a.id_album = ac.id_album AND a.id_album = :id_album";
    $stmt = $pdo->prepare($SQLComando);
    $stmt->bindParam(":id_album", $resultados['id_album'], PDO::PARAM_INT);
    $stmt->execute();
    $resultados = $stmt->fetchALL(PDO::FETCH_ASSOC);

    echo json_encode($resultados);
?>