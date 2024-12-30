-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17-Dez-2024 às 18:48
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
(1, 1),
(2, 2),
(3, 3);

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
(1, 1, 1),
(2, 1, 7),
(3, 1, 4),
(4, 1, 25),
(5, 1, 17),
(6, 1, 12),
(7, 1, 99),
(8, 1, 128),
(9, 1, 799),
(10, 1, 668),
(11, 1, 608),
(12, 1, 557),
(13, 1, 728),
(14, 1, 656),
(15, 1, 661),
(16, 1, 612),
(17, 1, 1005),
(18, 1, 282),
(19, 1, 483),
(20, 1, 584),
(21, 1, 85),
(22, 1, 785),
(23, 1, 800),
(24, 1, 607),
(25, 1, 766),
(26, 1, 379),
(27, 1, 788),
(28, 1, 830),
(29, 1, 962),
(30, 1, 791),
(31, 1, 757),
(32, 1, 479),
(33, 1, 242),
(34, 1, 477),
(35, 1, 722),
(36, 1, 772),
(37, 1, 792),
(38, 1, 709),
(39, 1, 727),
(40, 1, 109),
(41, 1, 869),
(42, 1, 904),
(43, 1, 612),
(44, 1, 708),
(45, 1, 577),
(46, 1, 829),
(47, 1, 1025),
(48, 1, 987),
(49, 1, 1009),
(50, 1, 911),
(51, 1, 787),
(52, 1, 895),
(53, 1, 855),
(54, 1, 484),
(55, 1, 984),
(56, 1, 724),
(57, 1, 925),
(58, 1, 416),
(59, 1, 737),
(60, 1, 737),
(61, 1, 402),
(62, 1, 1002),
(63, 1, 124),
(64, 1, 737),
(65, 1, 69),
(66, 1, 498),
(67, 1, 116),
(68, 1, 960),
(69, 1, 1000),
(70, 1, 415),
(71, 1, 174),
(72, 1, 491),
(73, 1, 107),
(74, 1, 94),
(75, 1, 215),
(76, 1, 303),
(77, 1, 126),
(78, 1, 664),
(79, 1, 922),
(80, 1, 936),
(81, 1, 593),
(82, 1, 803),
(83, 1, 894),
(84, 1, 331),
(85, 1, 681),
(86, 1, 720),
(87, 1, 957),
(88, 1, 760),
(89, 1, 259),
(90, 1, 866),
(91, 1, 964),
(92, 1, 119),
(93, 1, 40),
(94, 1, 441),
(95, 1, 322),
(96, 1, 89),
(97, 1, 742),
(98, 1, 847),
(99, 1, 851),
(100, 1, 223),
(101, 1, 765),
(102, 1, 370),
(103, 1, 884),
(104, 1, 916),
(105, 1, 577),
(106, 1, 840),
(107, 1, 1009),
(108, 1, 777),
(109, 1, 247),
(110, 1, 367),
(111, 1, 753),
(112, 1, 869),
(113, 1, 535),
(114, 1, 1012),
(115, 1, 519),
(116, 1, 48),
(117, 2, 1),
(118, 2, 7),
(119, 2, 4),
(120, 2, 25),
(121, 2, 17),
(122, 2, 12),
(123, 2, 99),
(124, 2, 128),
(125, 2, 163),
(126, 2, 382),
(127, 2, 837),
(128, 2, 458),
(129, 2, 185),
(130, 2, 188),
(131, 2, 639),
(132, 2, 5),
(133, 2, 460),
(134, 2, 145),
(135, 2, 84),
(136, 2, 254),
(137, 2, 951),
(138, 2, 667),
(139, 2, 49),
(140, 3, 1),
(141, 3, 7),
(142, 3, 4),
(143, 3, 25),
(144, 3, 17),
(145, 3, 12),
(146, 3, 99),
(147, 3, 128),
(148, 3, 621),
(149, 3, 921),
(150, 3, 57),
(151, 3, 565),
(152, 3, 476),
(153, 3, 445),
(154, 3, 948),
(155, 3, 42),
(156, 3, 512);

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
(1, 'MestrePokemon', 'mestrepokemon@gmail.com', 'z3atQF1QhbGkM'),
(2, 'tebaroli', 'algumacoisa@gmail.com', 'z3QRJduLUhc3k'),
(3, 'Art2007', 'arthur@gmail.com', 'z32K/OaY6sAEs');

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
-- Índices para tabela `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `e_mail` (`e_mail`);

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
  MODIFY `id_album_carta` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT de tabela `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `album_carta`
--
ALTER TABLE `album_carta`
  ADD CONSTRAINT `album_carta_ibfk_1` FOREIGN KEY (`id_album`) REFERENCES `album` (`id_album`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
