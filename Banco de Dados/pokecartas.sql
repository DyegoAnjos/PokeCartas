-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 11-Dez-2024 às 19:13
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `pokecartas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `album`
--

CREATE TABLE `album` (
  `id_album` int(12) NOT NULL,
  `id_usuario` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `album`
--

INSERT INTO `album` (`id_album`, `id_usuario`) VALUES
(1, 9),
(2, 10),
(3, 11);

-- --------------------------------------------------------

--
-- Estrutura da tabela `album_carta`
--

CREATE TABLE `album_carta` (
  `id_album_carta` int(16) NOT NULL,
  `id_album` int(16) DEFAULT NULL,
  `id_carta` int(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `album_carta`
--

INSERT INTO `album_carta` (`id_album_carta`, `id_album`, `id_carta`) VALUES
(5, 1, 200),
(6, 1, 791),
(7, 1, 870),
(8, 1, 992),
(9, 1, 709),
(10, 1, 609),
(11, 1, 607),
(12, 1, 389),
(13, 1, 1006),
(14, 1, 606),
(15, 2, 806),
(16, 2, 55),
(17, 2, 401),
(18, 2, 808),
(19, 2, 469),
(20, 2, 81),
(21, 3, 115),
(22, 3, 676);

-- --------------------------------------------------------

--
-- Estrutura da tabela `carta`
--

CREATE TABLE `carta` (
  `id_carta` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `colecao`
--

CREATE TABLE `colecao` (
  `id_colecao` int(12) NOT NULL,
  `nome` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `colecao_carta`
--

CREATE TABLE `colecao_carta` (
  `id_colecao_carta` int(12) NOT NULL,
  `id_carta` int(12) DEFAULT NULL,
  `id_colecao` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `deck`
--

CREATE TABLE `deck` (
  `id_deck` int(12) NOT NULL,
  `nome` varchar(225) DEFAULT NULL,
  `id_usuario` int(12) DEFAULT NULL,
  `PokemonDestaque` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `deck_carta`
--

CREATE TABLE `deck_carta` (
  `id_deck_carta` int(12) NOT NULL,
  `id_deck` int(12) DEFAULT NULL,
  `id_usuario` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(12) NOT NULL,
  `nome` varchar(225) DEFAULT NULL,
  `e_mail` varchar(225) DEFAULT NULL,
  `senha` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nome`, `e_mail`, `senha`) VALUES
(1, 'Teste', 'Teste@gmail.com', 'Teste@1234'),
(2, 'Dyego', 'dyegocordeiro@gmail.com', 'An@45678'),
(3, 'Mestre Pokemon', 'mestrepokemon@gmail.com', 'MestrePokemon@69'),
(4, 'dyego2', 'dyego2@gmail.com', '12345678@An'),
(5, 'dyego3', 'dyego3@gmail.com', '123456789@An'),
(9, 'dyego4', 'dyego4@gmail.com', '123456789@An'),
(10, 'Pedro cavalo', 'pedindakaxeta@123.cl', '12345aB@'),
(11, 'HadesAnjos', 'hadesanjos@gmail.comm', 'H4d3s@nj0s');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario_carta`
--

CREATE TABLE `usuario_carta` (
  `id_usuario_cartas` int(12) NOT NULL,
  `id_usuario` int(12) DEFAULT NULL,
  `id_carta` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id_album`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `album_carta`
--
ALTER TABLE `album_carta`
  ADD PRIMARY KEY (`id_album_carta`),
  ADD KEY `id_album` (`id_album`);

--
-- Índices para tabela `carta`
--
ALTER TABLE `carta`
  ADD PRIMARY KEY (`id_carta`);

--
-- Índices para tabela `colecao`
--
ALTER TABLE `colecao`
  ADD PRIMARY KEY (`id_colecao`);

--
-- Índices para tabela `colecao_carta`
--
ALTER TABLE `colecao_carta`
  ADD PRIMARY KEY (`id_colecao_carta`),
  ADD UNIQUE KEY `id_carta` (`id_carta`),
  ADD UNIQUE KEY `id_colecao` (`id_colecao`);

--
-- Índices para tabela `deck`
--
ALTER TABLE `deck`
  ADD PRIMARY KEY (`id_deck`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `deck_carta`
--
ALTER TABLE `deck_carta`
  ADD PRIMARY KEY (`id_deck_carta`),
  ADD UNIQUE KEY `id_deck` (`id_deck`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `e_mail` (`e_mail`);

--
-- Índices para tabela `usuario_carta`
--
ALTER TABLE `usuario_carta`
  ADD PRIMARY KEY (`id_usuario_cartas`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD UNIQUE KEY `id_carta` (`id_carta`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `album`
--
ALTER TABLE `album`
  MODIFY `id_album` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `album_carta`
--
ALTER TABLE `album_carta`
  MODIFY `id_album_carta` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `colecao`
--
ALTER TABLE `colecao`
  MODIFY `id_colecao` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `colecao_carta`
--
ALTER TABLE `colecao_carta`
  MODIFY `id_colecao_carta` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `deck`
--
ALTER TABLE `deck`
  MODIFY `id_deck` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `deck_carta`
--
ALTER TABLE `deck_carta`
  MODIFY `id_deck_carta` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `usuario_carta`
--
ALTER TABLE `usuario_carta`
  MODIFY `id_usuario_cartas` int(12) NOT NULL AUTO_INCREMENT;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `album_carta`
--
ALTER TABLE `album_carta`
  ADD CONSTRAINT `album_carta_ibfk_1` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `colecao_carta`
--
ALTER TABLE `colecao_carta`
  ADD CONSTRAINT `colecao_carta_ibfk_1` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id_carta`) ON UPDATE CASCADE,
  ADD CONSTRAINT `colecao_carta_ibfk_2` FOREIGN KEY (`id_colecao`) REFERENCES `colecao` (`id_colecao`) ON UPDATE CASCADE;

--
-- Limitadores para a tabela `deck`
--
ALTER TABLE `deck`
  ADD CONSTRAINT `deck_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Limitadores para a tabela `deck_carta`
--
ALTER TABLE `deck_carta`
  ADD CONSTRAINT `deck_carta_ibfk_1` FOREIGN KEY (`id_deck`) REFERENCES `deck` (`id_deck`) ON UPDATE CASCADE,
  ADD CONSTRAINT `deck_carta_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Limitadores para a tabela `usuario_carta`
--
ALTER TABLE `usuario_carta`
  ADD CONSTRAINT `usuario_carta_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_carta_ibfk_2` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id_carta`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
