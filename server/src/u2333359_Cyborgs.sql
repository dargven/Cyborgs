-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Янв 17 2024 г., 22:16
-- Версия сервера: 5.7.27-30
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `u2333359_Cyborgs`
--

-- --------------------------------------------------------

--
-- Структура таблицы `bullets`
--

CREATE TABLE `bullets` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `x` varchar(255) NOT NULL DEFAULT '0',
  `y` varchar(255) NOT NULL DEFAULT '0',
  `px` varchar(255) NOT NULL DEFAULT '0',
  `py` varchar(255) NOT NULL DEFAULT '0',
  `vx` varchar(255) NOT NULL DEFAULT '0',
  `vy` varchar(255) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT 'Shoot'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `bullets`
--

INSERT INTO `bullets` (`id`, `user_id`, `x`, `y`, `px`, `py`, `vx`, `vy`, `status`) VALUES
(2686, 53, '355.6', '1122.2', '355.5', '1122', '1', '2', 'Shoot'),
(2687, 53, '355.6', '1122.2', '355.5', '1122', '1', '2', 'Shoot'),
(2734, 53, '-854.22473491629', '107.14352980406', '-852.73597585622', '106.96023642981', '-14.887590600746194', '1.8329337425486885', 'Shoot'),
(2738, 53, '-777.49570289232', '-58.941826732413', '-776.00016129617', '-58.82626145132', '-14.955415961470267', '-1.155652810925649', 'Shoot'),
(2739, 53, '-777.9711161674', '27.097928296008', '-776.47193153284', '27.048476991589', '-14.99184634556811', '0.4945130441921181', 'Shoot'),
(2741, 53, '774.72861704095', '93.194283448937', '773.23900672457', '93.018041838276', '14.896103163820046', '1.7624161066077522', 'Shoot'),
(2742, 53, '629.82294054066', '-457.75463921734', '628.61305909256', '-456.86796741699', '12.098814481048926', '-8.86671800347574', 'Shoot'),
(2751, 53, '-16.331041899189', '602.04032022585', '-16.339124742644', '600.54034200346', '0.08082843455019616', '14.99978222389139', 'Shoot'),
(2752, 53, '-113.16257604857', '593.0630836582', '-112.92428878692', '591.58213153847', '-2.382872616491741', '14.809521197309984', 'Shoot');

-- --------------------------------------------------------

--
-- Структура таблицы `game`
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
  `skins_hash` varchar(255) NOT NULL,
  `update_timestamp` varchar(256) NOT NULL,
  `update_timeout` int(11) DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `game`
--

INSERT INTO `game` (`id`, `version`, `chat_hash`, `scene_hash`, `teams_hash`, `bullets_hash`, `objects_hash`, `players_hash`, `skins_hash`, `update_timestamp`, `update_timeout`) VALUES
(1, '0.1', '16e4847188f083593a5ab534e0ab5032', '0c7a1092132af67d0a9f230d92d1895c', '122', 'ae3780fa7fbc1c9d9e63d4d1b63810dd', '32', '6e478425eabe6558bb2c6d468f125594', '1', '1705518911000', 100);

-- --------------------------------------------------------

--
-- Структура таблицы `match`
--

CREATE TABLE `match` (
  `id` int(11) NOT NULL,
  `time_start` varchar(255) NOT NULL DEFAULT '0',
  `time_end` varchar(255) NOT NULL DEFAULT '0',
  `status` varchar(255) NOT NULL DEFAULT 'Matching'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `message` longtext CHARACTER SET utf8,
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
(1109, '1', 'а вот он', '2024-01-17 14:02:02');

-- --------------------------------------------------------

--
-- Структура таблицы `objects`
--

CREATE TABLE `objects` (
  `id` int(11) NOT NULL,
  `description` text CHARACTER SET utf8mb4 NOT NULL,
  `link` varchar(255) NOT NULL,
  `state` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(256) NOT NULL DEFAULT 'Auth',
  `team_id` int(11) DEFAULT NULL,
  `skin_id` int(11) NOT NULL DEFAULT '0',
  `x` float NOT NULL DEFAULT '0',
  `y` float NOT NULL DEFAULT '0',
  `vx` float DEFAULT '0',
  `vy` float DEFAULT '0',
  `dx` float NOT NULL DEFAULT '0',
  `dy` float NOT NULL DEFAULT '0',
  `hp` int(11) NOT NULL DEFAULT '100',
  `kills` int(11) NOT NULL DEFAULT '0',
  `score` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `players`
--

INSERT INTO `players` (`id`, `user_id`, `status`, `team_id`, `skin_id`, `x`, `y`, `vx`, `vy`, `dx`, `dy`, `hp`, `kills`, `score`) VALUES
(379674, 51, 'Live', 1, 0, -17.5, 13.5, -4, 0, 0, 0, 0, 0, '0'),
(425329, 17, 'Live', 1, 0, -17.5, 13.5, 0, 4, -0.0413915, -0.999143, 0, 0, '0'),
(426069, 127, 'Live', 1, 0, -18.5, 13.5, 0, 4, 0, 0, 0, 0, '0'),
(451240, 53, 'Live', 1, 0, -19.9728, 11.0489, -4, 0, -0.959877, 0.280423, 20, 0, '0'),
(454238, 131, 'Live', 1, 0, -17.5, 13.5, 0, 0, 0, 0, 0, 0, '0'),
(477688, 134, 'Live', 1, 0, -17.5, 13.5, -4, 0, 0, 0, 0, 0, '0'),
(478450, 1, 'Live', 1, 0, -17.5, 13.5, -4, 0, 0, 0, 0, 0, '0'),
(491852, 52, 'Live', 1, 0, -17.5, 13.5, 0, 4, 0.885269, 0.46508, 0, 0, '0');

-- --------------------------------------------------------

--
-- Структура таблицы `skins`
--

CREATE TABLE `skins` (
  `id` int(11) NOT NULL,
  `text` text,
  `image` text,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `kills` int(11) NOT NULL DEFAULT '0',
  `death` int(11) NOT NULL DEFAULT '0',
  `time_in_game` int(11) NOT NULL DEFAULT '0',
  `points` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `stats`
--

INSERT INTO `stats` (`id`, `user_id`, `kills`, `death`, `time_in_game`, `points`) VALUES
(1, 1, 0, 0, 0, 0),
(2, 1, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `teams`
--

CREATE TABLE `teams` (
  `team_id` int(11) NOT NULL,
  `team_score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teams`
--

INSERT INTO `teams` (`team_id`, `team_score`) VALUES
(0, NULL),
(1, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `userObjects`
--

CREATE TABLE `userObjects` (
  `id` int(11) NOT NULL,
  `object_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `login` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `token` varchar(256) DEFAULT NULL,
  `name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `uuid` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `login`, `password`, `token`, `name`, `email`, `uuid`) VALUES
(1, 'Vasya', 'c082282cad5d535061e6205f6e3576a4', '23049c0d9d29bb84a51d9d15dbdd8986', 'Vasya', 'VASYA@VASYA.vasya', '13'),
(6, 'REFLX', '0811ba200e73ee50de034192ff94d8cb', NULL, 'REFLX', 'tevermoon@gmail.com', '14'),
(17, 'dimachka', '8ad1db449b8740a7b0173195833a362a', '<null>', 'Димон*Доминатор', 'markelovdima408@gmail.com', '15'),
(38, 'foget', '8869fb48dcf8fa89e24d097dc8ef9d63', '<null>', 'Никита', 'fivs132@vk.com', '23'),
(42, 'yarik', '759883b6f09495b645f176f08a987f47', '<null>', 'yarik3', 'poskryar@gmail.com', '231'),
(51, 'Vasya1', 'e547d3f1818ad02e658c9d32e7139e4f', '<null>', 'Vasya1', 'Example@mail.ru', '323'),
(52, 'Vasya2', '2799892b2861468b79b0d8788d561b4f', 'a6548c6f497f02678e880e59643f4fba', 'Vasya2', 'Examp2le@mail.ru', '5235'),
(53, 'dargven', '470cf4c797e6f2b10ef177a6f0f39eb7', '5a70184105fe143afe32c51066e12d61', 'dargven', 'dargven@yandex.ru', '4141'),
(127, 'ratmirka', '9725fcdc99ed9d29dba3a4baaae9c0a7', '<null>', 'ratmir', 'ratmirshaumardanov@gmail.com', '65948a5f0615c'),
(128, 'REFLX43', 'e63a181b3d8420f5cc77721f7a3f446f', '<null>', 'Никита', 'bfbebfebw@gmail.com', '65955ff88a247'),
(129, 'nightmare', '3550b8d10dbbdfa6caf267b25f7413a6', '<null>', 'night', 'mare@com.bom', '659fab6995455'),
(130, 'rr', '86e5d7935644b4b63b9b59e1c8a10d1e', '<null>', 'e', 'e@ded.com', '659fabf2e23ea'),
(131, 'r212', 'd980ac925a509b6de7d029dc4db00952', '<null>', 's', 'es', '12'),
(132, '5', '6c979757f656aae99a59c99e3c85b6c4', '<null>', '5', '75677@gmail.com', '65a18f952052a'),
(133, 'e@ded.com', '4e846d3b4bfdc6ec60d99d75ace733f7', '<null>', 'vasya', 'popkin@popa.ru', '65a2b44377c88'),
(134, 'Stepan', '75573e37502dca4f164affb6b446a931', '<null>', 'Stepan', 'stepan.blinov.97@gmail.com', '65a66588ec5ef');

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
  ADD UNIQUE KEY `game_pk2` (`id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2786;

--
-- AUTO_INCREMENT для таблицы `match`
--
ALTER TABLE `match`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1110;

--
-- AUTO_INCREMENT для таблицы `objects`
--
ALTER TABLE `objects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=495664;

--
-- AUTO_INCREMENT для таблицы `skins`
--
ALTER TABLE `skins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `stats`
--
ALTER TABLE `stats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `userObjects`
--
ALTER TABLE `userObjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
