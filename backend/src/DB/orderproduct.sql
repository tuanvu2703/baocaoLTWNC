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
-- Table structure for table `orderproduct`
--

CREATE TABLE `orderproduct` (
  `id` int(11) NOT NULL,
  `idorder` int(11) NOT NULL,
  `idproduct` int(11) NOT NULL,
  `product_name` varchar(500) NOT NULL,
  `category_id` int(11) NOT NULL,
  `price` int(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `status` text NOT NULL,
  `quantity` int(255) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orderproduct`
--

INSERT INTO `orderproduct` (`id`, `idorder`, `idproduct`, `product_name`, `category_id`, `price`, `created_at`, `status`, `quantity`, `img`) VALUES
(147, 54, 0, 'dadwa', 2, 3242423, '2024-11-27 14:07:22', 'in_stock', 1, ''),
(148, 54, 0, 'dadwa', 2, 3242423, '2024-11-27 14:07:22', 'in_stock', 1, ''),
(149, 55, 0, 'dadwa', 2, 3242423, '2024-11-27 14:11:38', 'in_stock', 1, ''),
(150, 55, 0, 'dadwa', 2, 3242423, '2024-11-27 14:11:38', 'in_stock', 1, ''),
(151, 56, 0, 'dadwa', 2, 3242423, '2024-11-27 14:43:53', 'in_stock', 1, ''),
(152, 56, 0, 'dadwa', 2, 3242423, '2024-11-27 14:43:53', 'in_stock', 1, ''),
(153, 57, 0, 'dadwa', 2, 3242423, '2024-11-27 14:57:47', 'in_stock', 1, ''),
(154, 57, 0, 'dadwa', 2, 3242423, '2024-11-27 14:57:47', 'in_stock', 1, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orderproduct`
--
ALTER TABLE `orderproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=155;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
