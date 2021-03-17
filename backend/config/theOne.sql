-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           8.0.23 - MySQL Community Server - GPL
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour test
CREATE DATABASE IF NOT EXISTS `test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `test`;

-- Listage de la structure de la table test. comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `postId` int NOT NULL,
  `content` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test.comments : ~12 rows (environ)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `userId`, `postId`, `content`, `createdAt`, `updatedAt`) VALUES
	(1, 17, 1, 'j\'ouvre le bal des commentaires :)', '2021-03-11 18:26:13', '2021-03-11 18:26:13'),
	(2, 1, 2, 'Oublie pas de revenir lundi :p', '2021-03-11 18:28:46', '2021-03-11 18:28:46'),
	(3, 18, 1, 'c\'est cool comme outil', '2021-03-11 18:31:13', '2021-03-11 18:31:13'),
	(4, 18, 2, 'tu part dans quel région ? ', '2021-03-11 18:33:05', '2021-03-11 18:33:05'),
	(5, 1, 3, 'J\'avoue, bonne idée, je mangerais un gros bol de ramen ', '2021-03-11 18:33:54', '2021-03-11 18:33:54'),
	(6, 17, 3, 'Je suis partante !! c\'est le chef qui paye :)', '2021-03-11 18:34:24', '2021-03-11 18:44:09'),
	(7, 19, 1, 'Ya des fonctionnalité en plus de prévue ? ', '2021-03-11 18:36:01', '2021-03-11 18:36:01'),
	(8, 19, 2, 'la chance, je bosse ce week end, je suis d\'astreinte', '2021-03-11 18:36:28', '2021-03-11 18:36:28'),
	(9, 1, 4, 'chaud, je prends Hwoarang, tu va morfler', '2021-03-11 18:38:46', '2021-03-11 18:38:46'),
	(10, 17, 4, 'je suis plus street fighter moi !!', '2021-03-11 18:39:32', '2021-03-11 18:39:32'),
	(11, 20, 1, 'bienvenue a tous ', '2021-03-11 18:40:32', '2021-03-11 18:40:32'),
	(12, 20, 3, 'prenez moi des gyoza s\'il vous plait', '2021-03-11 18:41:14', '2021-03-11 18:41:14'),
	(13, 18, 3, 'rendez vous a 13h au hall d\'entré :)', '2021-03-11 18:42:59', '2021-03-16 16:29:22'),
	(14, 18, 5, 'moi pourquoi pas ?', '2021-03-16 14:45:41', '2021-03-16 14:45:41');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

-- Listage de la structure de la table test. posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test.posts : ~4 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `userId`, `title`, `content`, `picture`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 'Bienvenue dans notre reseaux social', 'Restez courtois, mais surtout amusez vous :)', 'http://localhost:5000/images/pinterest-2_1024x1024.gif1615483453672.gif', '2021-03-11 18:24:13', '2021-03-11 18:24:13'),
	(2, 17, 'Bientôt le week end', 'trop hate', 'http://localhost:5000/images/vacances.gif1615483654525.gif', '2021-03-11 18:27:34', '2021-03-11 18:27:34'),
	(3, 18, 'Qui va mangez a l\'exterieur ce midi ? ', 'je mangerais bien asiatiques :)', 'http://localhost:5000/images/miam.gif1615483946376.gif', '2021-03-11 18:32:26', '2021-03-11 18:32:26'),
	(4, 19, 'qui pour une partie de tekken 3 a la pause', 'Je suis imbattable !!', 'http://localhost:5000/images/tekken.gif1615484240124.gif', '2021-03-11 18:37:20', '2021-03-16 14:43:27'),
	(5, 20, 'Qui se presente au CE', 'les élections c\'est pour bientôt', NULL, '2021-03-11 18:42:03', '2021-03-11 18:42:03');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

-- Listage de la structure de la table test. users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pseudo` (`pseudo`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test.users : ~5 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `pseudo`, `email`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin', 'admin@groupomania.fr', '$2b$10$TpOO/L/pszONOkK9vWxFLem/EukPljP0vv.DS180LbL8H2PoeM3Se', 1, '2021-03-11 12:40:53', '2021-03-11 12:40:53'),
	(17, 'mel', 'mel@groupomania.fr', '$2b$10$pN1olb6U6mkZ/6v3RBBa9O4trlNBnK4IZkBtFxn/IfGJDgseQ77lK', 0, '2021-03-11 18:25:44', '2021-03-11 18:25:44'),
	(18, 'victor', 'victor@groupomania.fr', '$2b$10$oEh3VVIjEvk8Bb9kUTjB/uYH9EoMKXMW5PsBZ/fa2NX1owWBzKrG2', 0, '2021-03-11 18:30:44', '2021-03-11 18:30:44'),
	(19, 'greg', 'greg@groupomania.fr', '$2b$10$DXXejWSvauRAUpGBYAJh8eJpiH0QPttUf2FgAjBfXdhUJOigsUWIG', 0, '2021-03-11 18:35:09', '2021-03-11 18:35:09'),
	(20, 'victoria', 'victoria@groupomania.fr', '$2b$10$YEZUblvfeRkZOpMldXT1WO/Q0LS/bBQMJxAVOqctvFVp0oqt2QRFK', 0, '2021-03-11 18:40:09', '2021-03-11 18:40:09');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
