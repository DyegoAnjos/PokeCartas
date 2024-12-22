<?php
    $host = 'localhost';
    $banco = "pokecartas";
    $usuario = 'root';
    $senha = '';
    $dsn = "mysql:host={$host};port=3306;dbname={$banco}";

    try {
        $pdo = new PDO($dsn, $usuario, $senha);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Erro na conexão: " . $e->getMessage());
    }


    $keySecurity = 'z3L9XvUu+L1tS';
    $usuario_nome = $_POST["usuario_nome"];
    $usuario_email = strtolower($_POST["usuario_email"]);
    $usuario_senha = md5($_POST["usuario_senha"]);
    $hash = crypt($usuario_senha, $keySecurity);
    


    try {
        $SQLComando = "SELECT COUNT(*) AS total FROM usuario WHERE e_mail = :usuario_email";
        $stmt = $pdo->prepare($SQLComando);
        $stmt->bindParam(":usuario_email", $usuario_email, PDO::PARAM_STR);
        $stmt->execute();
        $resultados = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($resultados['total'] == 0) {
            $SQLComando = "INSERT INTO usuario (nome, e_mail, senha) VALUES (:nome, :email, :senha)";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(':nome', $usuario_nome, PDO::PARAM_STR);
            $stmt->bindParam(':email', $usuario_email, PDO::PARAM_STR);
            $stmt->bindParam(':senha', $hash, PDO::PARAM_STR);
            $stmt->execute();

            $SQLComando = "SELECT id_usuario FROM usuario WHERE e_mail = :usuario_email";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(":usuario_email", $usuario_email, PDO::PARAM_STR);
            $stmt->execute();
            $usuario_id = $stmt->fetch(PDO::FETCH_ASSOC)['id_usuario'];

            $SQLComando = "INSERT INTO album (id_usuario) VALUES (:id_usuario)";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(':id_usuario', $usuario_id, PDO::PARAM_INT);
            $stmt->execute();

            $id_album = $pdo->lastInsertId();

            $SQLComando = "INSERT INTO album_carta (id_album, id_carta) 
                        VALUES (:album, 1), (:album, 7), (:album, 4), 
                                (:album, 25), (:album, 17), (:album, 12), 
                                (:album, 99), (:album, 128)";
            $stmt = $pdo->prepare($SQLComando);
            $stmt->bindParam(':album', $id_album, PDO::PARAM_INT);
            $stmt->execute();

            header("Location: ../html/Login.html");
        }
        else {
            header("Location: ../html/Login.html");
        }
    } catch (PDOException $e) {
        die("Erro: " . $e->getMessage());
    }
?>