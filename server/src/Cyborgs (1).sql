-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 01, 2023 at 12:45 AM
-- Server version: 5.7.39
-- PHP Version: 7.3.33

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

-- --------------------------------------------------------

--
-- Table structure for table `bullets`
--

CREATE TABLE `bullets` (
  `id` int(11) NOT NULL,
  `x` varchar(255) NOT NULL,
  `y` varchar(255) NOT NULL,
  `vx` varchar(255) NOT NULL,
  `vy` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `id` int(11) NOT NULL,
  `version` varchar(256) NOT NULL,
  `chat_hash` varchar(256) NOT NULL,
  `scene_hash` varchar(255) NOT NULL,
  `teams_hash` varchar(255) NOT NULL,
  `bullets_hash` varchar(255) NOT NULL,
  `objects_hash` varchar(255) NOT NULL,
  `players_hash` varchar(255) NOT NULL,
  `skins_hash` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `version`, `chat_hash`, `scene_hash`, `teams_hash`, `bullets_hash`, `objects_hash`, `players_hash`, `skins_hash`) VALUES
(1, '0.1', '5d430acb74ac2a69483d1df68b5e6c88', '0c7a1092132af67d0a9f230d92d1895c', '122', '311', '32', '07af5d2a4dcbb3690041340aa00d06b8', '1');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message` longtext CHARACTER SET utf8,
  `created` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `message`, `created`) VALUES
(733, '53', '24', '2023-11-29 12:41:28'),
(734, '57', '11', '2023-11-29 12:43:04'),
(735, '6', '213', '2023-11-29 12:45:33'),
(736, '57', '6584', '2023-11-29 12:46:57'),
(737, '57', ' · · · - - - · · ·', '2023-11-29 12:47:17'),
(738, '57', '123', '2023-11-29 12:55:10'),
(739, '1', 'Доту?', '2023-11-29 12:56:03'),
(740, '57', 'го', '2023-11-29 12:56:21'),
(741, '6', '2?', '2023-11-29 12:56:21'),
(742, '57', 'Не тот Керри кто крипов добивал, а тот кто трон не просрал.', '2023-11-29 13:01:51'),
(743, '6', 'куцкукцукцвфцвфывцвфвфцвывфывфцв', '2023-11-29 13:08:46'),
(744, '6', '5345', '2023-11-29 13:16:05'),
(745, '6', '978', '2023-11-29 13:16:10'),
(746, '6', '435', '2023-11-29 13:17:37'),
(747, '6', '4234234', '2023-11-29 13:18:06'),
(748, '6', '5235', '2023-11-29 13:18:35'),
(749, '6', '6546546', '2023-11-29 13:18:37'),
(750, '6', 'ytryr', '2023-11-29 13:18:39'),
(751, '6', '43244', '2023-11-29 13:21:18'),
(752, '6', '3213', '2023-11-29 13:21:51'),
(753, '6', '432', '2023-11-29 13:22:57'),
(754, '6', '4234', '2023-11-29 13:27:06'),
(755, '6', '2434', '2023-11-29 13:27:09'),
(756, '6', '4324', '2023-11-29 13:27:24'),
(757, '6', '6456456', '2023-11-29 13:27:57'),
(758, '6', '5466', '2023-11-29 13:30:10'),
(759, '6', 'wassssssssssss', '2023-11-29 13:30:19'),
(760, '6', '86', '2023-11-29 13:31:02'),
(761, '6', '423', '2023-11-29 13:33:59'),
(762, '6', '425235', '2023-11-29 13:34:10'),
(763, '6', 'w', '2023-11-29 13:34:55'),
(764, '6', '432', '2023-11-29 13:39:36'),
(765, '6', '421', '2023-11-29 13:39:43'),
(766, '6', '534', '2023-11-29 13:41:56'),
(767, '6', '53', '2023-11-29 14:02:21'),
(768, '53', '12', '2023-11-29 14:10:32'),
(769, '53', '12', '2023-11-29 14:23:53'),
(770, '17', 'открываем метанит', '2023-11-29 14:51:35'),
(771, '17', 'hjg', '2023-11-29 14:51:51'),
(772, '53', '12', '2023-11-29 15:49:36'),
(773, '53', '2', '2023-11-29 16:08:23'),
(774, '53', '35', '2023-11-29 16:08:25'),
(775, '53', '13', '2023-11-29 16:44:48'),
(776, '53', '14', '2023-11-29 16:50:19'),
(777, '53', '14', '2023-11-29 16:53:50'),
(778, '57', 'ввва', '2023-11-29 17:03:42'),
(779, '57', 'емае', '2023-11-29 17:05:33'),
(780, '57', 'у', '2023-11-29 17:06:30'),
(781, '57', 'к', '2023-11-29 17:06:41'),
(782, '53', '12', '2023-11-30 15:41:37'),
(783, '6', '53', '2023-11-30 15:41:50'),
(784, '6', '74', '2023-11-30 15:41:52'),
(785, '6', '967', '2023-11-30 15:41:55'),
(786, '6', '46', '2023-11-30 15:42:33'),
(787, '6', '46', '2023-11-30 15:42:33'),
(788, '6', '46', '2023-11-30 15:42:33'),
(789, '6', '46', '2023-11-30 15:42:33'),
(790, '6', '46', '2023-11-30 15:42:33'),
(791, '6', '46', '2023-11-30 15:42:33'),
(792, '6', '46', '2023-11-30 15:42:34'),
(793, '6', '46', '2023-11-30 15:42:34'),
(794, '6', '46', '2023-11-30 15:42:34'),
(795, '6', '46', '2023-11-30 15:42:34'),
(796, '6', '46', '2023-11-30 15:42:34'),
(797, '6', '46', '2023-11-30 15:42:34'),
(798, '6', '9897', '2023-11-30 15:42:39'),
(799, '6', '657', '2023-11-30 15:42:48'),
(800, '6', '42', '2023-11-30 15:44:22'),
(801, '6', '64', '2023-11-30 15:47:44'),
(802, '6', '6546', '2023-11-30 16:41:38'),
(803, '53', '2', '2023-11-30 17:50:30'),
(804, '6', '4234', '2023-11-30 18:51:49'),
(805, '6', '5345', '2023-11-30 19:01:53'),
(806, '6', 'Игра говна', '2023-11-30 19:03:07');

-- --------------------------------------------------------

--
-- Table structure for table `objects`
--

CREATE TABLE `objects` (
  `id` int(11) NOT NULL,
  `description` text CHARACTER SET utf8mb4 NOT NULL,
  `link` varchar(255) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `x` float NOT NULL,
  `y` float NOT NULL,
  `vx` float DEFAULT NULL,
  `vy` float DEFAULT NULL,
  `dx` float NOT NULL,
  `dy` float NOT NULL,
  `hp` int(11) NOT NULL DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `user_id`, `x`, `y`, `vx`, `vy`, `dx`, `dy`, `hp`) VALUES
(117600, 1, 0.293878, 1.95335, -4, 0, 0, 0, 0),
(119918, 51, -2.11806, 2.78069, 0, 0, 0, 0, 0),
(126909, 53, -3.27375, 2.39658, 0, 0, 0, 0, 0),
(150669, 52, 2, 0, 0, 0, 0, 0, 0),
(152253, 17, 3.69109, 2.86993, 0, 0, 0, 0, 0),
(153081, 6, 1.26809, 0.790876, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `skins`
--

CREATE TABLE `skins` (
  `id` int(11) NOT NULL,
  `text` text,
  `image` text,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `skins`
--

INSERT INTO `skins` (`id`, `text`, `image`, `role`) VALUES
(1, 'Красный чупокабрик', NULL, 'lobby'),
(2, 'Синий чупокабрик', NULL, 'lobby'),
(3, 'Cупер-пупер скин аим бот', NULL, 'score'),
(4, 'Платный скин', NULL, 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `team_score` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`team_id`, `team_score`) VALUES
(1, 4.3),
(2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `userObjects`
--

CREATE TABLE `userObjects` (
  `id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `token` varchar(256) DEFAULT NULL,
  `name` text NOT NULL,
  `email` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `token`, `name`, `email`) VALUES
(1, 'Vasya', 'c082282cad5d535061e6205f6e3576a4', 'a9a8552e3985d24ff832e1e6f9d3089c', 'Vasya', NULL),
(6, 'REFLX', '0811ba200e73ee50de034192ff94d8cb', '451cdd158ec030f7e87305dc0fe57bf2', 'REFLX', 'tevermoon@gmail.com'),
(17, 'dimachka', '8ad1db449b8740a7b0173195833a362a', '38f78e75b4faca915e01d767b99a92c2', 'Димон*Доминатор', 'markelovdima408@gmail.com'),
(38, 'foget', '8869fb48dcf8fa89e24d097dc8ef9d63', NULL, 'Никита', 'fivs132@vk.com'),
(40, 'Arina_Khalyavina', '7c9b839430c9c2d809e0103daa3f2dec', NULL, 'Arina', 'arinaroy1701@gmail.com'),
(41, 'shmigger', 'd9d6df77d49047a16316b88bde46d6b9', NULL, 'smagoire', 'moncuere@gmail.com'),
(42, 'yarik', '759883b6f09495b645f176f08a987f47', NULL, 'yarik3', 'poskryar@gmail.com'),
(43, 'ruthik1', 'ae3bf193645b256533286fb68308b637', NULL, 'ruthik', 'alcinrustam@gmail.com'),
(44, 'ruthik2', '2dd632002629ecb33836c86a0a3c3833', NULL, 'ruthik', 'alcinrustam@gmail.com'),
(45, 'Arina17', '3540accfd21fba6eb19b22cea59d431d', NULL, 'Arina1717', 'arinaroy1701@gmail.com'),
(51, 'Vasya1', 'e547d3f1818ad02e658c9d32e7139e4f', 'e706b1f40a682a843cc6afe1938e8e90', 'Vasya1', 'Example@mail.ru'),
(52, 'Vasya2', '2799892b2861468b79b0d8788d561b4f', NULL, 'Vasya2', 'Example@mail.ru'),
(53, 'dargven', '470cf4c797e6f2b10ef177a6f0f39eb7', '59f33b31033979d9945069a95bb98608', 'dargven', 'dargven@yandex.ru'),
(57, '1234', 'ed2b1f468c5f915f3f1cf75d7068baae', '118844dd0faf0cc828fe06c659fe6b99', '1234', '1234'),
(58, 'ruthik', '5d28c09911d1f3ff1033aa4623660cfe', 'f1040110d8a49b5fec2ee1e156aa82c1', 'ruthik', 'alcinrustam@gmail.com'),
(59, 'ratmir', '17abfb19ecbe7a863aecb67be90eaf81', NULL, 'ratmir', 'ratmirka'),
(60, '5253', '6cddcee94a198e69f2809e981a318c46', NULL, '25235', '45235235'),
(61, 'moncuere', '352dab5377591e0a3c87048529b8d31f', 'aa3e92af36cc514b9b931bdc4ac5db9f', 'moncuere', 'moncuere@gmail.com'),
(62, 'imacha', '1', NULL, 'Arina', 'markelovdima408@gmail.com'),
(63, 'ARINA', '1', NULL, 'ARINAAAA', 'arinaroy125@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `usersBullets`
--

CREATE TABLE `usersBullets` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `bullet_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usersBullets`
--

INSERT INTO `usersBullets` (`id`, `user_id`, `bullet_id`) VALUES
(1, '5', '2'),
(2, '3', '3');

-- --------------------------------------------------------

--
-- Table structure for table `userSkins`
--

CREATE TABLE `userSkins` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `skin_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userSkins`
--

INSERT INTO `userSkins` (`id`, `user_id`, `skin_id`) VALUES
(1, 1, 3),
(2, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `userTeams`
--

CREATE TABLE `userTeams` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `team_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userTeams`
--

INSERT INTO `userTeams` (`id`, `user_id`, `team_id`) VALUES
(472, 58, 0),
(497, 53, 1),
(503, 1, 0),
(517, 51, 1),
(535, 61, 0),
(552, 6, 0),
(586, 17, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bullets`
--
ALTER TABLE `bullets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bullets_pk` (`id`);

--
-- Indexes for table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_pk2` (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `players_pk2` (`user_id`);

--
-- Indexes for table `skins`
--
ALTER TABLE `skins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD UNIQUE KEY `teams_pk2` (`team_id`);

--
-- Indexes for table `userObjects`
--
ALTER TABLE `userObjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_pk` (`id`),
  ADD UNIQUE KEY `users_pk2` (`login`);

--
-- Indexes for table `usersBullets`
--
ALTER TABLE `usersBullets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usersBullets_pk2` (`id`);

--
-- Indexes for table `userSkins`
--
ALTER TABLE `userSkins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userTeams`
--
ALTER TABLE `userTeams`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userTeams_pk` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bullets`
--
ALTER TABLE `bullets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=807;

--
-- AUTO_INCREMENT for table `objects`
--
ALTER TABLE `objects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=175897;

--
-- AUTO_INCREMENT for table `skins`
--
ALTER TABLE `skins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `userObjects`
--
ALTER TABLE `userObjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `usersBullets`
--
ALTER TABLE `usersBullets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `userSkins`
--
ALTER TABLE `userSkins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `userTeams`
--
ALTER TABLE `userTeams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=599;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
