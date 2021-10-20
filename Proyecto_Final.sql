-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 19, 2021 at 08:29 PM
-- Server version: 8.0.26-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Proyecto_Final`
--

-- --------------------------------------------------------

--
-- Table structure for table `Administrators`
--

CREATE TABLE `Administrators` (
  `admin_id` int NOT NULL,
  `admin_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `admin_mail` varchar(50) NOT NULL,
  `admin_password` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Administrators`
--

INSERT INTO `Administrators` (`admin_id`, `admin_name`, `admin_mail`, `admin_password`) VALUES
(1, 'Jonathan Rodriguez', 'alejandro_1234@gmail.com', '12345678'),
(4, 'Ana Laura', 'ana345@gmail.com', '12345678'),
(5, 'Juan Carlos', 'juanito23@gmail.com', '12345678');

-- --------------------------------------------------------

--
-- Table structure for table `Employee`
--

CREATE TABLE `Employee` (
  `employee_id` int NOT NULL,
  `employee_name` varchar(20) NOT NULL,
  `employee_lastName` varchar(40) NOT NULL,
  `employee_phone` varchar(20) NOT NULL,
  `employee_mail` varchar(50) NOT NULL,
  `employee_homeAddress` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Employee`
--

INSERT INTO `Employee` (`employee_id`, `employee_name`, `employee_lastName`, `employee_phone`, `employee_mail`, `employee_homeAddress`) VALUES
(1, 'Juan Roberto', 'Perez Ruiz', '4456219819', 'LuisR_1234@gmai.com', '76134, Alfonso Reyes 513, Plutarco Elias Calles, Santiago de Querétaro, Qro.'),
(2, 'Juan Jose', 'Hernandez Martinez', '4456981023', 'joselito3004@gmai.com', 'Amado Nervo 108, El Tintero, 76138 Santiago de Querétaro, Qro.'),
(3, 'Carlos Alberto', 'Ruiz Gomez', '4412964567', 'Carlos_Ruiz@gmail.com', 'Guitierrez Najera 208, El Rocio, 76138 Santiago de Querétaro, Qro.'),
(7, 'Luisa Maria', 'Perez Perez', '4435018534', 'Luisa12@gmail.com', 'Guitierrez Najera 208, El Rocio, 76138 Santiago de Querétaro, Qro.'),
(8, 'Juan Carlos', 'Rodriguez Perez', '4401384612', 'carlos34@gmail.com', 'Guitierrez Najera 208, El Rocio, 76138 Santiago de Querétaro, Qro.');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Administrators`
--
ALTER TABLE `Administrators`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`employee_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Administrators`
--
ALTER TABLE `Administrators`
  MODIFY `admin_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Employee`
--
ALTER TABLE `Employee`
  MODIFY `employee_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
