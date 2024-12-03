-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 03/12/2024 às 01:23
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `poke_cartas`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `album`
--

CREATE TABLE `album` (
  `id_album` int(12) NOT NULL,
  `id_usuario` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `album_carta`
--

CREATE TABLE `album_carta` (
  `id_album_carta` int(12) NOT NULL,
  `id_album` int(12) DEFAULT NULL,
  `id_carta` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `carta`
--

CREATE TABLE `carta` (
  `id_carta` int(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `colecao`
--

CREATE TABLE `colecao` (
  `id_colecao` int(12) NOT NULL,
  `nome` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `colecao_carta`
--

CREATE TABLE `colecao_carta` (
  `id_colecao_carta` int(12) NOT NULL,
  `id_carta` int(12) DEFAULT NULL,
  `id_colecao` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `deck`
--

CREATE TABLE `deck` (
  `id_deck` int(12) NOT NULL,
  `nome` varchar(225) DEFAULT NULL,
  `id_usuario` int(12) DEFAULT NULL,
  `PokemonDestaque` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `deck_carta`
--

CREATE TABLE `deck_carta` (
  `id_deck_carta` int(12) NOT NULL,
  `id_deck` int(12) DEFAULT NULL,
  `id_usuario` int(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(12) NOT NULL,
  `nome` varchar(225) DEFAULT NULL,
  `e_mail` varchar(225) DEFAULT NULL,
  `senha` varchar(225) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario_carta`
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
-- Índices de tabela `album`
--
ALTER TABLE `album`
  ADD PRIMARY KEY (`id_album`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `album_carta`
--
ALTER TABLE `album_carta`
  ADD PRIMARY KEY (`id_album_carta`),
  ADD UNIQUE KEY `id_album` (`id_album`),
  ADD UNIQUE KEY `id_carta` (`id_carta`);

--
-- Índices de tabela `carta`
--
ALTER TABLE `carta`
  ADD PRIMARY KEY (`id_carta`);

--
-- Índices de tabela `colecao`
--
ALTER TABLE `colecao`
  ADD PRIMARY KEY (`id_colecao`);

--
-- Índices de tabela `colecao_carta`
--
ALTER TABLE `colecao_carta`
  ADD PRIMARY KEY (`id_colecao_carta`),
  ADD UNIQUE KEY `id_carta` (`id_carta`),
  ADD UNIQUE KEY `id_colecao` (`id_colecao`);

--
-- Índices de tabela `deck`
--
ALTER TABLE `deck`
  ADD PRIMARY KEY (`id_deck`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `deck_carta`
--
ALTER TABLE `deck_carta`
  ADD PRIMARY KEY (`id_deck_carta`),
  ADD UNIQUE KEY `id_deck` (`id_deck`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `e_mail` (`e_mail`),
  ADD UNIQUE KEY `senha` (`senha`);

--
-- Índices de tabela `usuario_carta`
--
ALTER TABLE `usuario_carta`
  ADD PRIMARY KEY (`id_usuario_cartas`),
  ADD UNIQUE KEY `id_usuario` (`id_usuario`),
  ADD UNIQUE KEY `id_carta` (`id_carta`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `album`
--
ALTER TABLE `album`
  MODIFY `id_album` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `album_carta`
--
ALTER TABLE `album_carta`
  MODIFY `id_album_carta` int(12) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id_usuario` int(12) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuario_carta`
--
ALTER TABLE `usuario_carta`
  MODIFY `id_usuario_cartas` int(12) NOT NULL AUTO_INCREMENT;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `album_carta`
--
ALTER TABLE `album_carta`
  ADD CONSTRAINT `album_carta_ibfk_1` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`) ON UPDATE CASCADE,
  ADD CONSTRAINT `album_carta_ibfk_2` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id_carta`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `colecao_carta`
--
ALTER TABLE `colecao_carta`
  ADD CONSTRAINT `colecao_carta_ibfk_1` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id_carta`) ON UPDATE CASCADE,
  ADD CONSTRAINT `colecao_carta_ibfk_2` FOREIGN KEY (`id_colecao`) REFERENCES `colecao` (`id_colecao`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `deck`
--
ALTER TABLE `deck`
  ADD CONSTRAINT `deck_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `deck_carta`
--
ALTER TABLE `deck_carta`
  ADD CONSTRAINT `deck_carta_ibfk_1` FOREIGN KEY (`id_deck`) REFERENCES `deck` (`id_deck`) ON UPDATE CASCADE,
  ADD CONSTRAINT `deck_carta_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Restrições para tabelas `usuario_carta`
--
ALTER TABLE `usuario_carta`
  ADD CONSTRAINT `usuario_carta_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `usuario_carta_ibfk_2` FOREIGN KEY (`id_carta`) REFERENCES `carta` (`id_carta`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
