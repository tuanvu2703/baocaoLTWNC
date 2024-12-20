-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2024 at 09:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `baocaonodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `address` varchar(500) NOT NULL,
  `phone` int(50) NOT NULL,
  `email` varchar(500) NOT NULL,
  `dateTimeCreate` datetime NOT NULL,
  `dateTimeUpdate` datetime NOT NULL,
  `payment` varchar(100) NOT NULL,
  `idUserCreate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `status`, `description`, `address`, `phone`, `email`, `dateTimeCreate`, `dateTimeUpdate`, `payment`, `idUserCreate`) VALUES
(55, 'cancelled', '324234', '45435435', 134234234, 'lephuc0167283@gmail.com', '2024-11-27 07:11:38', '0000-00-00 00:00:00', 'paypal', 1),
(56, 'pending', 'dq3e32', '45435435', 134234234, 'lephuc0167283@gmail.com', '2024-11-27 07:43:53', '0000-00-00 00:00:00', 'credit_card', 1),
(57, 'cancelled', 'd323d23d32', '45435435', 134234234, 'lephuc0167283@gmail.com', '2024-11-27 07:57:47', '0000-00-00 00:00:00', 'credit_card', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
