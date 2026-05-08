-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: gestion_academica
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignatura` (
  `id_asignatura` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `descripcion` text,
  PRIMARY KEY (`id_asignatura`),
  UNIQUE KEY `uq_asignatura_codigo` (`codigo`),
  KEY `idx_asignatura_nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES (1,'Bases de Datos','BD01','Diseño y administración de bases de datos'),(2,'Sistemas Operativos','SO01','Administración de sistemas'),(3,'Implantación de Aplicaciones Web','IAW01','Despliegue de aplicaciones web'),(4,'Seguridad Informática','SEG01','Seguridad en sistemas y redes');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documento`
--

DROP TABLE IF EXISTS `documento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `documento` (
  `id_documento` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `url_archivo` varchar(255) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `fecha_subida` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_profesor` int NOT NULL,
  `id_asignatura` int NOT NULL,
  PRIMARY KEY (`id_documento`),
  KEY `idx_documento_profesor` (`id_profesor`),
  KEY `idx_documento_asignatura` (`id_asignatura`),
  KEY `idx_documento_titulo` (`titulo`),
  CONSTRAINT `documento_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `documento_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documento`
--

LOCK TABLES `documento` WRITE;
/*!40000 ALTER TABLE `documento` DISABLE KEYS */;
INSERT INTO `documento` VALUES (1,'Tema 1 BD','/docs/bd_tema1.pdf','pdf',NULL,1,1),(2,'Tema 2 BD','/docs/bd_tema2.pdf','pdf',NULL,1,1),(3,'Guía SO','/docs/so_guia.pdf','pdf',NULL,2,2),(4,'Manual Seguridad','/docs/seg_manual.pdf','pdf',NULL,2,4),(5,'Práctica IAW','/docs/iaw_practica.zip','zip',NULL,1,3),(6,'prueba','uploads/documentos/1778165685344-RBD Entrega Parcial 2025.pdf','PDF','2026-05-07 14:54:45',3,1);
/*!40000 ALTER TABLE `documento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evento`
--

DROP TABLE IF EXISTS `evento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evento` (
  `id_evento` int NOT NULL AUTO_INCREMENT,
  `titulo` varchar(150) NOT NULL,
  `descripcion` text,
  `fecha` datetime NOT NULL,
  `ubicacion` varchar(100) DEFAULT NULL,
  `id_profesor` int DEFAULT NULL,
  PRIMARY KEY (`id_evento`),
  KEY `idx_evento_fecha` (`fecha`),
  KEY `id_profesor` (`id_profesor`),
  KEY `idx_evento_titulo` (`titulo`),
  CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evento`
--

LOCK TABLES `evento` WRITE;
/*!40000 ALTER TABLE `evento` DISABLE KEYS */;
INSERT INTO `evento` VALUES (1,'Charla IA','Introducción a la inteligencia artificial','2026-05-10 10:00:00','Aula 1',2),(3,'eurovision','palomitas y canciones','2026-05-12 00:00:00',NULL,2),(4,'asd','asd','2026-05-29 00:00:00',NULL,3);
/*!40000 ALTER TABLE `evento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matricula`
--

DROP TABLE IF EXISTS `matricula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matricula` (
  `id_alumno` int NOT NULL,
  `id_asignatura` int NOT NULL,
  `fecha_matricula` date NOT NULL,
  PRIMARY KEY (`id_alumno`,`id_asignatura`),
  KEY `idx_matricula_asignatura` (`id_asignatura`),
  CONSTRAINT `matricula_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `matricula_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matricula`
--

LOCK TABLES `matricula` WRITE;
/*!40000 ALTER TABLE `matricula` DISABLE KEYS */;
INSERT INTO `matricula` VALUES (4,1,'2024-09-01'),(4,2,'2024-09-01'),(5,1,'2024-09-01'),(5,3,'2024-09-01'),(6,2,'2024-09-01'),(6,4,'2024-09-01'),(7,1,'2024-09-01'),(8,3,'2024-09-01'),(9,4,'2024-09-01'),(10,2,'2024-09-01');
/*!40000 ALTER TABLE `matricula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor_asignatura`
--

DROP TABLE IF EXISTS `profesor_asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor_asignatura` (
  `id_profesor` int NOT NULL,
  `id_asignatura` int NOT NULL,
  PRIMARY KEY (`id_profesor`,`id_asignatura`),
  KEY `idx_pa_asignatura` (`id_asignatura`),
  CONSTRAINT `profesor_asignatura_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `profesor_asignatura_ibfk_2` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor_asignatura`
--

LOCK TABLES `profesor_asignatura` WRITE;
/*!40000 ALTER TABLE `profesor_asignatura` DISABLE KEYS */;
INSERT INTO `profesor_asignatura` VALUES (1,1),(3,1),(2,2),(1,3),(2,4),(3,4);
/*!40000 ALTER TABLE `profesor_asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva_tutoria`
--

DROP TABLE IF EXISTS `reserva_tutoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva_tutoria` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `fecha_reserva` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` enum('PENDIENTE','CONFIRMADA','CANCELADA') DEFAULT 'PENDIENTE',
  `motivo` text,
  `id_tutoria` int NOT NULL,
  `id_alumno` int NOT NULL,
  PRIMARY KEY (`id_reserva`),
  UNIQUE KEY `uq_reserva_tutoria` (`id_tutoria`),
  KEY `idx_reserva_alumno` (`id_alumno`),
  KEY `idx_reserva_estado` (`estado`),
  KEY `idx_reserva_fecha` (`fecha_reserva`),
  CONSTRAINT `reserva_tutoria_ibfk_1` FOREIGN KEY (`id_tutoria`) REFERENCES `tutoria` (`id_tutoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reserva_tutoria_ibfk_2` FOREIGN KEY (`id_alumno`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva_tutoria`
--

LOCK TABLES `reserva_tutoria` WRITE;
/*!40000 ALTER TABLE `reserva_tutoria` DISABLE KEYS */;
INSERT INTO `reserva_tutoria` VALUES (1,NULL,'CONFIRMADA','Dudas examen',1,4),(2,NULL,'PENDIENTE','Consulta proyecto',2,5),(3,NULL,'CONFIRMADA','Revisión práctica',3,6);
/*!40000 ALTER TABLE `reserva_tutoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutoria`
--

DROP TABLE IF EXISTS `tutoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutoria` (
  `id_tutoria` int NOT NULL AUTO_INCREMENT,
  `fecha_inicio` datetime NOT NULL,
  `fecha_fin` datetime NOT NULL,
  `ubicacion` varchar(150) DEFAULT NULL,
  `estado_slot` enum('DISPONIBLE','RESERVADA','CANCELADA') DEFAULT 'DISPONIBLE',
  `id_profesor` int NOT NULL,
  `id_alumno` int DEFAULT NULL,
  PRIMARY KEY (`id_tutoria`),
  KEY `idx_tutoria_profesor` (`id_profesor`),
  KEY `idx_tutoria_alumno` (`id_alumno`),
  KEY `idx_tutoria_fecha_inicio` (`fecha_inicio`),
  KEY `idx_tutoria_estado` (`estado_slot`),
  CONSTRAINT `tutoria_ibfk_1` FOREIGN KEY (`id_profesor`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `tutoria_ibfk_2` FOREIGN KEY (`id_alumno`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutoria`
--

LOCK TABLES `tutoria` WRITE;
/*!40000 ALTER TABLE `tutoria` DISABLE KEYS */;
INSERT INTO `tutoria` VALUES (1,'2025-03-01 10:00:00','2025-03-01 11:00:00','Aula 1','DISPONIBLE',1,NULL),(2,'2025-03-02 09:00:00','2025-03-02 10:00:00','Aula 2','DISPONIBLE',2,NULL),(3,'2025-03-03 12:00:00','2025-03-03 13:00:00','Aula 3','CANCELADA',3,NULL),(4,'2025-03-04 10:00:00','2025-03-04 11:00:00','Aula 1','DISPONIBLE',1,NULL),(5,'2025-03-05 09:00:00','2025-03-05 10:00:00','Aula 2','DISPONIBLE',2,NULL),(6,'2025-03-05 11:00:00','2025-03-05 12:00:00','Aula 3','DISPONIBLE',2,NULL),(7,'2026-05-23 16:56:00','2026-05-24 16:56:00','madrid','CANCELADA',3,NULL),(8,'2026-05-21 16:57:00','2026-05-27 16:57:00','mordor','RESERVADA',3,16);
/*!40000 ALTER TABLE `tutoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido1` varchar(100) NOT NULL,
  `apellido2` varchar(100) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol` enum('ALUMNO','PROFESOR','ADMIN') NOT NULL,
  `fecha_alta` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `uq_usuario_email` (`email`),
  KEY `idx_usuario_email` (`email`),
  KEY `idx_usuario_nombre` (`nombre`),
  KEY `idx_usuario_apellido1` (`apellido1`),
  KEY `idx_usuario_apellido2` (`apellido2`),
  KEY `idx_usuario_rol` (`rol`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Carlos','Lopez','Garcia','carlos.lopez@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','PROFESOR','2026-05-03 20:26:27',1),(2,'Ana','Martinez','Ruiz','ana.martinez@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','PROFESOR','2026-05-03 20:26:27',1),(3,'Laura','Sanchez','Perez','laura.sanchez@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','PROFESOR','2026-05-03 20:26:27',1),(4,'Mario','Fernandez','Diaz','mario.fernandez@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 20:26:27',1),(5,'Lucia','Gomez','Navarro','lucia.gomez@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 20:26:27',1),(6,'David','Torres','Santos','david.torres@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 20:26:27',1),(7,'Paula','Romero','Iglesias','paula.romero@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 20:26:27',1),(8,'Sergio','Vazquez','Molina','sergio.vazquez@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 20:26:27',1),(9,'Elena','Castro','Ortega','elena.castro@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 20:26:27',1),(10,'Javier','Herrera','Gil','javier.herrera@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 20:26:27',1),(11,'Test','Prueba','Prueba','alumno1@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 20:26:27',1),(12,'Test','Prueba','Prueba','alumno@email.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-03 21:25:36',1),(13,'elmo','jado','perez','elmojado@alumno.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-06 18:27:18',1),(14,'tony','stark','perez','stark@alumno.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-06 18:31:46',1),(15,'raton','perez','junior','perez@alumno.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-06 18:36:14',1),(16,'raton','perez','junior','tula@alumno.com','$2b$10$k6JxQMQ2gA3d/LWEVUqmGeA2ImlmopIKHoDdcs5VCcdBnf9lMSTAm','ALUMNO','2026-05-06 18:40:19',1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-08 12:47:45
