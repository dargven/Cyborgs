-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Янв 26 2024 г., 12:47
-- Версия сервера: 8.0.30
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Cyborgs`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bullets`
--

CREATE TABLE `bullets` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `x` varchar(255) NOT NULL DEFAULT '0',
  `y` varchar(255) NOT NULL DEFAULT '0',
  `px` varchar(255) NOT NULL DEFAULT '0',
  `py` varchar(255) NOT NULL DEFAULT '0',
  `vx` varchar(255) NOT NULL DEFAULT '0',
  `vy` varchar(255) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT 'Shoot'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `game`
--

CREATE TABLE `game` (
  `id` int NOT NULL,
  `version` varchar(255) NOT NULL DEFAULT '0.1',
  `chat_hash` varchar(255) NOT NULL DEFAULT '0',
  `teams_hash` varchar(255) NOT NULL DEFAULT '0',
  `bullets_hash` varchar(255) NOT NULL DEFAULT '0',
  `objects_hash` varchar(255) NOT NULL DEFAULT '0',
  `players_hash` varchar(255) NOT NULL DEFAULT '0',
  `skins_hash` varchar(255) NOT NULL DEFAULT '0',
  `update_timestamp` varchar(255) NOT NULL DEFAULT '0',
  `update_timeout` varchar(255) NOT NULL DEFAULT '0',
  `match_time_start` varchar(255) NOT NULL DEFAULT '0',
  `match_time_end` varchar(255) NOT NULL DEFAULT '0',
  `match_status` varchar(255) NOT NULL DEFAULT 'notPlaying'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `game`
--

INSERT INTO `game` (`id`, `version`, `chat_hash`, `teams_hash`, `bullets_hash`, `objects_hash`, `players_hash`, `skins_hash`, `update_timestamp`, `update_timeout`, `match_time_start`, `match_time_end`, `match_status`) VALUES
(1, '0.1', '1103a27d0fc49b960d36cefc8cc8b4d1', '0', '7764e66db688c2bff265c1f4707ed65e', '1b501d9804715c06f5d17abc0a8639ad', '9c7fdc85ad0cca0cffc40c76c962eafb', '0', '1706260211000', '200', '1706260211000', '1706260229000', 'playing');

-- --------------------------------------------------------

--
-- Структура таблицы `match`
--

CREATE TABLE `match` (
  `id` int NOT NULL,
  `time_start` varchar(255) NOT NULL DEFAULT '0',
  `time_end` varchar(255) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT 'Matching'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `message` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci,
  `created` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_bin;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `user_id`, `message`, `created`) VALUES
(1096, '53', '3', '2024-01-11 18:31:20'),
(1097, '53', '1', '2024-01-11 18:31:34'),
(1098, '6', '4', '2024-01-12 18:23:46'),
(1099, '6', '6', '2024-01-14 19:32:50'),
(1100, '6', 'Тепни меня на норм коорды', '2024-01-14 19:33:03'),
(1101, '6', 'А то я слева сверху', '2024-01-14 19:33:11'),
(1102, '53', 'не могу, выйди', '2024-01-14 19:33:11'),
(1103, '1', 'Опа', '2024-01-14 19:34:37'),
(1104, '53', 'ходи', '2024-01-14 19:34:44'),
(1105, '1', 'Попадания считает', '2024-01-14 19:34:45'),
(1106, '53', 'че', '2024-01-14 19:34:50'),
(1107, '53', 'дай демку', '2024-01-14 19:34:55'),
(1108, '1', 'где чат епта', '2024-01-17 14:01:51'),
(1109, '1', 'а вот он', '2024-01-17 14:02:02'),
(1110, '53', '2', '2024-01-18 10:48:32'),
(1111, '6', '4', '2024-01-18 11:29:42'),
(1112, '6', '4234234', '2024-01-18 18:34:16'),
(1113, '1', 'regerg', '2024-01-19 10:45:39'),
(1114, '1', 'dddddddddddddddddddddd\\dddddddddd', '2024-01-19 11:00:17'),
(1115, '1', 'dddddddddddddddddddddd\\dddddddddd', '2024-01-19 11:00:22'),
(1116, '1', 'dddddddddddddddddddddd\\dddddddddd', '2024-01-19 11:00:22'),
(1117, '1', 'dddddddddddddddddddddd\\dddddddddd', '2024-01-19 11:00:23'),
(1118, '1', 'dddddddddddddddddddddd\\dddddddddd', '2024-01-19 11:00:23'),
(1119, '1', 'dddddddddddddddddddddd\\dddddddddd', '2024-01-19 11:00:24'),
(1120, '1', 'dddddddddddddddddddddd\\dddddddddd', '2024-01-19 11:00:24'),
(1121, '1', 'dddddddddddddddddddddd\\dddddddddd', '2024-01-19 11:00:24'),
(1122, '1', 'да емае', '2024-01-19 11:22:24'),
(1123, '6', 'm', '2024-01-22 17:29:24'),
(1124, '1', 'asdasd', '2024-01-24 09:13:09'),
(1125, '1', 'dsf', '2024-01-24 09:20:04'),
(1126, '1', 'GG', '2024-01-24 16:37:43'),
(1127, '51', 'Lets play dota 2, Egor', '2024-01-24 17:03:34'),
(1128, '51', 'Ну и зачем чат, если его никто не читает', '2024-01-24 17:04:30'),
(1129, '51', 'Ответьте хоть кто-нибудь', '2024-01-24 17:16:21'),
(1130, '6', '424', '2024-01-24 18:13:40'),
(1131, '51', 'Ну хоть что-то', '2024-01-24 18:36:32'),
(1132, '51', 'Ну хоть что-то', '2024-01-24 18:36:34'),
(1133, '51', 'Ну хоть что-то', '2024-01-24 18:36:34'),
(1134, '51', 'Ну хоть что-то', '2024-01-24 18:36:34'),
(1135, '51', 'Ну хоть что-то', '2024-01-24 18:36:35'),
(1136, '51', 'Ну хоть что-то', '2024-01-24 18:36:35'),
(1137, '51', 'Ну хоть что-то', '2024-01-24 18:36:35'),
(1138, '6', '453', '2024-01-25 09:11:42'),
(1139, '17', 'сервер говно', '2024-01-25 11:28:53');

-- --------------------------------------------------------

--
-- Структура таблицы `objects`
--

CREATE TABLE `objects` (
  `id` int NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `link` varchar(255) NOT NULL,
  `state` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `players`
--

CREATE TABLE `players` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `killer_id` varchar(255) DEFAULT NULL,
  `status` varchar(256) NOT NULL DEFAULT 'Auth',
  `team_id` int DEFAULT NULL,
  `skin_id` int NOT NULL DEFAULT '0',
  `x` float NOT NULL DEFAULT '0',
  `y` float NOT NULL DEFAULT '0',
  `vx` float DEFAULT '0',
  `vy` float DEFAULT '0',
  `dx` float NOT NULL DEFAULT '0',
  `dy` float NOT NULL DEFAULT '0',
  `hp` int NOT NULL DEFAULT '100',
  `kills` int NOT NULL DEFAULT '0',
  `score` varchar(255) NOT NULL DEFAULT '0',
  `deaths` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `players`
--

INSERT INTO `players` (`id`, `user_id`, `killer_id`, `status`, `team_id`, `skin_id`, `x`, `y`, `vx`, `vy`, `dx`, `dy`, `hp`, `kills`, `score`, `deaths`) VALUES
(5529, 1, '17', 'Live', 0, 0, 22, 22, 0, 0, 0, 0, 100, 0, '0', '0'),
(5584, 140, NULL, 'Live', NULL, 0, 21.5, 21.5, 0, 0, 0, 0, 100, 0, '0', '0'),
(5614, 6, NULL, 'Live', 0, 0, 22, 21.5, 0, 0, 0, 0, 100, 0, '0', '0'),
(5855, 142, NULL, 'Live', 1, 0, -18, 14, 0, 0, 0, 0, 100, 0, '0', '0'),
(5857, 53, NULL, 'Live', 0, 0, 21.5, 22, 0, 0, 0, 0, 100, 0, '0', '0'),
(5875, 17, NULL, 'Live', 0, 0, 22.5, 22.5, 0, 0, 0, 0, 100, 0, '0', '0');

-- --------------------------------------------------------

--
-- Структура таблицы `skins`
--

CREATE TABLE `skins` (
  `id` int NOT NULL,
  `text` text,
  `image` text,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `skins`
--

INSERT INTO `skins` (`id`, `text`, `image`, `role`) VALUES
(1, 'Красный чупокабрик', NULL, 'lobby'),
(2, 'Синий чупокабрик', NULL, 'lobby'),
(3, 'Cупер-пупер скин аим бот', NULL, 'score'),
(4, 'Платный скин', NULL, 'paid');

-- --------------------------------------------------------

--
-- Структура таблицы `stats`
--

CREATE TABLE `stats` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `kills` int NOT NULL DEFAULT '0',
  `deaths` int NOT NULL DEFAULT '0',
  `time_in_game` int NOT NULL DEFAULT '0',
  `points` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `stats`
--

INSERT INTO `stats` (`id`, `user_id`, `kills`, `deaths`, `time_in_game`, `points`) VALUES
(1, 1, 1, 2, 0, 3),
(2, 1, 2, 3, 0, 4),
(3, 51, 2, 1, 0, 6),
(4, 52, 1, 3, 0, 6),
(5, 53, 2, 1, 0, 5),
(6, 54, 2, 3, 0, 4),
(7, 55, 1, 3, 0, 3),
(8, 56, 1, 3, 0, 2),
(9, 57, 2, 1, 0, 1),
(10, 6, 12, 16, 100, 21);

-- --------------------------------------------------------

--
-- Структура таблицы `teams`
--

CREATE TABLE `teams` (
  `team_id` int NOT NULL,
  `team_score` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Дамп данных таблицы `teams`
--

INSERT INTO `teams` (`team_id`, `team_score`) VALUES
(0, 276),
(1, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `userObjects`
--

CREATE TABLE `userObjects` (
  `id` int NOT NULL,
  `object_id` int NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `login` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `token` varchar(256) DEFAULT NULL,
  `name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `uuid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `token`, `name`, `email`, `uuid`) VALUES
(1, 'Vasya', 'c082282cad5d535061e6205f6e3576a4', 'fbe7feab950ea448ded76575f8ebdee1', 'Vasya', 'VASYA@VASYA.vasya', '13'),
(6, 'REFLX', '0811ba200e73ee50de034192ff94d8cb', 'c22b3c3c062d2fe097d70089c4b566e2', 'REFLX', 'tevermoon@gmail.com', '14'),
(17, 'dimachka', '8ad1db449b8740a7b0173195833a362a', 'b3c7d995fb557633bbb3a6e2134daa17', 'Димон*Доминатор', 'markelovdima408@gmail.com', '15'),
(38, 'foget', '8869fb48dcf8fa89e24d097dc8ef9d63', '<null>', 'Никита', 'fivs132@vk.com', '23'),
(42, 'yarik', '759883b6f09495b645f176f08a987f47', '<null>', 'yarik3', 'poskryar@gmail.com', '231'),
(51, 'Vasya1', 'e547d3f1818ad02e658c9d32e7139e4f', NULL, 'Vasya1', 'Example@mail.ru', '323'),
(52, 'Vasya2', '2799892b2861468b79b0d8788d561b4f', 'a6548c6f497f02678e880e59643f4fba', 'Vasya2', 'Examp2le@mail.ru', '5235'),
(53, 'dargven', '470cf4c797e6f2b10ef177a6f0f39eb7', '8dd20d17351fd677195d162215e0e237', 'dargven', 'dargven@yandex.ru', '4141'),
(127, 'ratmirka', '9725fcdc99ed9d29dba3a4baaae9c0a7', '4b398ca62ae52798ee59b7c0d2b4dcf7', 'ratmir', 'ratmirshaumardanov@gmail.com', '65948a5f0615c'),
(128, 'REFLX43', 'e63a181b3d8420f5cc77721f7a3f446f', '<null>', 'Никита', 'bfbebfebw@gmail.com', '65955ff88a247'),
(129, 'nightmare', '3550b8d10dbbdfa6caf267b25f7413a6', '<null>', 'night', 'mare@com.bom', '659fab6995455'),
(130, 'rr', '86e5d7935644b4b63b9b59e1c8a10d1e', '<null>', 'e', 'e@ded.com', '659fabf2e23ea'),
(131, 'r212', 'd980ac925a509b6de7d029dc4db00952', '<null>', 's', 'es', '12'),
(132, '5', '6c979757f656aae99a59c99e3c85b6c4', '<null>', '5', '75677@gmail.com', '65a18f952052a'),
(133, 'e@ded.com', '4e846d3b4bfdc6ec60d99d75ace733f7', '<null>', 'vasya', 'popkin@popa.ru', '65a2b44377c88'),
(134, 'Stepan', '75573e37502dca4f164affb6b446a931', '<null>', 'Stepan', 'stepan.blinov.97@gmail.com', '65a66588ec5ef'),
(135, 'ruthik31', 'dbbc2a3114e65ad41be23fa42ac83e27', NULL, 'ruthik31', 'ruthik.rf@gmail.com', '65aa949b51f56'),
(136, 'REFLX11', 'dcd619cc2b8b90d6fb4651294f5c2b60', NULL, 'Никита', 'fdsfsdfrer@gmail.com', '65aa94d0654c3'),
(137, 'ruthik', '5d28c09911d1f3ff1033aa4623660cfe', NULL, 'ruthik', 'alcinrustam@gmail.com', '65aa94d500ef9'),
(138, 'REFLX111', 'a6dbef00d19c146ced1711505645c6e3', NULL, 'Никита', 'fdffasdwed@gmail.com', '65aa94e7e89aa'),
(139, 'ruthik41', '1e8a117167a782b8a77a83d3c73bfc5d', NULL, 'ruthik41', 'alcin@gmail.com', '65aa98cac7d87'),
(140, '112', '3d3163c45ffb4c9a2893fe32e25ff942', '98587f53c753a8613a08fce626f66c40', '112', '112@gmail.com', '65b13d508d973'),
(142, 'SaveliiBulatov', '1ee2fce5d04fb8cf60c7a9443483dd58', 'f84852c2a433540a14827fa1e3c15f55', 'Савелий Булатов ', 'savabulatov228337@gmail.com', '65b29228378da');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `bullets`
--
ALTER TABLE `bullets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `bullets_pk_2` (`id`);

--
-- Индексы таблицы `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `game_pk_2` (`id`);

--
-- Индексы таблицы `match`
--
ALTER TABLE `match`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `match_pk2` (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `objects`
--
ALTER TABLE `objects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `players_pk2` (`user_id`);

--
-- Индексы таблицы `skins`
--
ALTER TABLE `skins`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `stats`
--
ALTER TABLE `stats`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`team_id`),
  ADD UNIQUE KEY `teams_pk2` (`team_id`);

--
-- Индексы таблицы `userObjects`
--
ALTER TABLE `userObjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_pk` (`id`),
  ADD UNIQUE KEY `users_pk2` (`login`),
  ADD UNIQUE KEY `users_pk3` (`email`),
  ADD UNIQUE KEY `users_pk4` (`uuid`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `bullets`
--
ALTER TABLE `bullets`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7542;

--
-- AUTO_INCREMENT для таблицы `game`
--
ALTER TABLE `game`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `match`
--
ALTER TABLE `match`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1140;

--
-- AUTO_INCREMENT для таблицы `objects`
--
ALTER TABLE `objects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `players`
--
ALTER TABLE `players`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5876;

--
-- AUTO_INCREMENT для таблицы `skins`
--
ALTER TABLE `skins`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT для таблицы `userObjects`
--
ALTER TABLE `userObjects`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
