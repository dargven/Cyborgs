-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 02, 2023 at 06:56 PM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Cyborgs`
--
CREATE DATABASE IF NOT EXISTS `Cyborgs` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `Cyborgs`;

-- --------------------------------------------------------

--
-- Table structure for table `Bullet`
--

CREATE TABLE `Bullet` (
  `id` int(11) DEFAULT NULL,
  `id_user` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `x1` int(11) DEFAULT NULL,
  `y1` int(11) DEFAULT NULL,
  `speed` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `id` int(11) DEFAULT NULL,
  `user_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `message` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `created` varchar(255) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Messages`
--

INSERT INTO `Messages` (`id`, `user_id`, `message`, `created`) VALUES
(1, '1', 'иди в жопу', '45'),
(2, '1', 'иди в жопу', '2023-10-28 20:21:41'),
(3, '1', 'иди в жопу', '2023-10-28 20:21:43');

-- --------------------------------------------------------

--
-- Table structure for table `Skins`
--

CREATE TABLE `Skins` (
  `id` int(11) DEFAULT NULL,
  `text` text COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Skins`
--

INSERT INTO `Skins` (`id`, `text`) VALUES
(1, 'Супер-пупер скин');

-- --------------------------------------------------------

--
-- Table structure for table `Teams`
--

CREATE TABLE `Teams` (
  `team_id` int(11) DEFAULT NULL,
  `team_score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Teams`
--

INSERT INTO `Teams` (`team_id`, `team_score`) VALUES
(1, 2),
(2, 10);

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) DEFAULT NULL,
  `login` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `token` text COLLATE utf8_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `login`, `password`, `token`) VALUES
(2, 'andrey', 'lokirovka', 'null'),
(3, 'andrey2', 'lokirovka', 'null'),
(4, 'Vasya1', 'b2095141a676f90ca0c928fdffe3c107', 'null'),
(5, 'ruthik', '5d28c09911d1f3ff1033aa4623660cfe', 'null'),
(6, 'REFLX', 'c1bae0bcdd7fabe8feedb362e220fba9', 'null'),
(8, '1234', 'ed2b1f468c5f915f3f1cf75d7068baae', 'null'),
(10, 'Vasya', 'c082282cad5d535061e6205f6e3576a4', 'e3d9078fc664fb60e4067695fcfa4cde');

-- --------------------------------------------------------

--
-- Table structure for table `UserSkins`
--

CREATE TABLE `UserSkins` (
  `id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `skin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `UserSkins`
--

INSERT INTO `UserSkins` (`id`, `user_id`, `skin_id`) VALUES
(1, 1, 2),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `UserTeams`
--

CREATE TABLE `UserTeams` (
  `id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `UserTeams`
--

INSERT INTO `UserTeams` (`id`, `user_id`, `team_id`) VALUES
(1, 2, 1),
(2, 1, 2);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
