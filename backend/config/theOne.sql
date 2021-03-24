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
CREATE DATABASE IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;

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
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test.users : ~0 rows (environ)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `pseudo`, `email`, `password`, `isAdmin`, `createdAt`, `updatedAt`) VALUES
	(1, 'admin', 'admin@groupomania.fr', '$2b$10$BAkFDb/1FNHYnKEyQ0xPZOe6LF.KU0hPt8Jrso9q8ZKZz8DQJ7TSq', 1, '2021-03-24 10:16:45', '2021-03-24 10:16:45'),
	(2, 'mel', 'mel@groupomnia.fr', '$2b$10$JFiQWyDOaGebef8.6947BeZ5JHPvaagwMFfSYQza2oKNHEpV6Kcp.', 0, '2021-03-24 10:17:07', '2021-03-24 10:17:07'),
	(3, 'victor', 'victor@groupomania.fr', '$2b$10$GCJKypDW6GM3wsx/HUg1zu6Z2KWMqd/B8PqCIw8crb3g6e3YstW.a', 0, '2021-03-24 10:17:26', '2021-03-24 10:17:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;


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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test.posts : ~0 rows (environ)
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` (`id`, `userId`, `title`, `content`, `picture`, `createdAt`, `updatedAt`) VALUES
	(1, 3, 'salut ', 'vous avez vous le mach hier soir ? ', 'http://localhost:5000/images/ronaldo.gif1616577479586.gif', '2021-03-24 10:17:59', '2021-03-24 10:17:59'),
	(2, 2, 'Qui veux allez voir se film avec moi', 'demain ? ', 'http://localhost:5000/images/stars_wars.jpg1616577577098.jpg', '2021-03-24 10:19:37', '2021-03-24 10:19:37'),
	(3, 3, 'je suis sur paris aujourd\'hui', 'trop belle la tour effeil :)', 'http://localhost:5000/images/tour_effeil.jpg1616577614604.jpg', '2021-03-24 10:20:14', '2021-03-24 10:20:14');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;

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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Listage des données de la table test.comments : ~0 rows (environ)
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` (`id`, `userId`, `postId`, `content`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, 'Tres bon match', '2021-03-24 10:18:49', '2021-03-24 10:18:49'),
	(2, 3, 1, 'Ronaldo the best :)', '2021-03-24 10:20:30', '2021-03-24 10:20:30'),
	(3, 3, 2, 'le cote obscur je perçoit en toi :)', '2021-03-24 10:20:49', '2021-03-24 10:20:49'),
	(4, 1, 2, 'on va au rex le voir ? ', '2021-03-24 10:22:14', '2021-03-24 10:22:14'),
	(5, 1, 3, 'Faut que tu aille manger au Pedra Alta, tu va adorer', '2021-03-24 10:23:06', '2021-03-24 10:23:06'),
	(6, 2, 3, 'non, tu est fous, va plutôt au le plomb du cantal', '2021-03-24 10:24:01', '2021-03-24 10:24:01');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
