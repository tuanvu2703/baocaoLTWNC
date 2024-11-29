-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2024 at 09:04 PM
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
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `quantity` int(5) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `userId`, `productId`, `quantity`, `createdAt`, `updatedAt`) VALUES
(7, 3, 5, 1, '2024-11-27 12:27:28', '2024-11-27 12:27:28'),
(8, 3, 4, 2, '2024-11-27 12:39:30', '2024-11-27 13:12:09'),
(9, 1, 4, 10, '2024-11-28 04:51:02', '2024-11-28 05:06:43'),
(10, 1, 1, 8, '2024-11-28 04:58:59', '2024-11-28 05:06:44'),
(11, 1, 2, 3, '2024-11-28 05:01:12', '2024-11-28 05:17:12'),
(12, 6, 1, 2, '2024-11-28 06:24:47', '2024-11-28 07:03:28'),
(13, 6, 2, 1, '2024-11-28 07:38:52', '2024-11-28 07:38:52'),
(14, 7, 1, 1, '2024-11-28 07:46:01', '2024-11-28 07:46:01'),
(15, 7, 2, 1, '2024-11-28 07:46:03', '2024-11-28 07:46:03'),
(16, 7, 4, 1, '2024-11-28 08:15:50', '2024-11-28 08:15:50'),
(17, 7, 5, 1, '2024-11-28 08:16:01', '2024-11-28 08:16:01'),
(22, 8, 6, 1, '2024-11-28 18:36:32', '2024-11-28 18:36:32'),
(23, 8, 2, 1, '2024-11-28 19:34:15', '2024-11-28 19:34:15');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(200) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() COMMENT '	',
  `status` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `description`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Bomber', 'áo khoác có dây kéo kiểu boxy', '2024-11-21 06:11:33', '2024-11-21 06:11:33', 1),
(2, 'hoodie', 'áo khoác hoodie', '2024-11-21 07:19:18', '2024-11-21 07:19:18', 1),
(5, 'jean', 'Quần jean', '2024-11-21 07:27:58', '2024-11-21 07:27:58', 1),
(15, 'xyz', '312', '2024-11-22 07:56:38', '2024-11-22 07:56:38', 1),
(18, 'categorytest', 'Tét', '2024-11-23 07:04:34', '2024-11-23 07:04:34', 1);

-- --------------------------------------------------------

--
-- Table structure for table `messenger`
--

CREATE TABLE `messenger` (
  `id` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `datecreate` datetime NOT NULL,
  `mess` text NOT NULL,
  `pinproduct` int(11) NOT NULL,
  `see` int(1) NOT NULL,
  `repdatetime` datetime NOT NULL,
  `role` int(11) NOT NULL,
  `idrom` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `messenger`
--

INSERT INTO `messenger` (`id`, `iduser`, `status`, `datecreate`, `mess`, `pinproduct`, `see`, `repdatetime`, `role`, `idrom`) VALUES
(1, 8, 'false', '2024-11-28 14:09:30', 'tin nhan moiw neefefefefef', 2147483647, 1, '0000-00-00 00:00:00', 1, 8),
(2, 8, 'false', '2024-11-28 14:10:06', 'tin nhan moiw neefefefefef', 2147483647, 1, '0000-00-00 00:00:00', 1, 8),
(3, 8, 'false', '2024-11-28 14:10:10', 'tin nhan moiw neefefefefef', 2147483647, 1, '0000-00-00 00:00:00', 1, 8),
(4, 6, 'true', '2024-11-28 14:37:23', 'chao ban minh la admin ne', 0, 1, '0000-00-00 00:00:00', 0, 8),
(5, 8, 'false', '2024-11-28 14:45:35', 'admin neeeeee', 0, 1, '0000-00-00 00:00:00', 1, 8),
(6, 8, 'false', '2024-11-28 14:45:41', 'm moi la face', 0, 1, '0000-00-00 00:00:00', 1, 8),
(7, 8, 'false', '2024-11-28 15:09:07', 'm moi la faceee', 0, 1, '0000-00-00 00:00:00', 1, 8),
(8, 8, 'false', '2024-11-28 15:12:29', 'adsss', 0, 1, '0000-00-00 00:00:00', 1, 8),
(9, 8, 'false', '2024-11-28 15:22:06', 'new chat', 0, 1, '0000-00-00 00:00:00', 1, 8),
(10, 8, 'false', '2024-11-28 15:38:16', 'haiz', 0, 1, '0000-00-00 00:00:00', 1, 8),
(11, 6, 'true', '2024-11-28 16:45:55', 'admin gui', 0, 1, '0000-00-00 00:00:00', 0, 8),
(12, 6, 'true', '2024-11-28 16:46:41', 'admin gui lan 1', 0, 1, '0000-00-00 00:00:00', 0, 8),
(13, 6, 'true', '2024-11-28 16:47:38', 'admin gui lan 2', 0, 1, '0000-00-00 00:00:00', 0, 8),
(14, 8, 'false', '2024-11-28 16:49:11', 'biết ròi', 0, 1, '0000-00-00 00:00:00', 1, 8),
(15, 8, 'false', '2024-11-28 16:51:50', 'test', 0, 1, '0000-00-00 00:00:00', 1, 8),
(16, 6, 'true', '2024-11-28 16:52:20', 'haiz', 0, 1, '0000-00-00 00:00:00', 0, 8),
(17, 8, 'false', '2024-11-28 16:52:40', 'haiz không refes', 0, 1, '0000-00-00 00:00:00', 1, 8),
(18, 8, 'false', '2024-11-28 16:53:08', 'oo no', 0, 1, '0000-00-00 00:00:00', 1, 8),
(19, 6, 'true', '2024-11-28 16:53:14', 'haiz', 0, 1, '0000-00-00 00:00:00', 0, 8),
(20, 6, 'true', '2024-11-28 16:57:48', 'add chat moi', 0, 1, '0000-00-00 00:00:00', 0, 8),
(21, 8, 'false', '2024-11-28 17:06:06', 'daw', 0, 1, '0000-00-00 00:00:00', 1, 8),
(22, 8, 'false', '2024-11-28 17:06:09', 'dawdw', 0, 1, '0000-00-00 00:00:00', 1, 8),
(23, 8, 'false', '2024-11-28 17:08:31', 'daw', 0, 1, '0000-00-00 00:00:00', 1, 8),
(24, 8, 'false', '2024-11-28 17:08:36', 'ddd', 0, 1, '0000-00-00 00:00:00', 1, 8),
(25, 8, 'false', '2024-11-28 17:08:40', 's', 0, 1, '0000-00-00 00:00:00', 1, 8),
(26, 8, 'false', '2024-11-28 17:10:00', 'nào', 0, 1, '0000-00-00 00:00:00', 1, 8),
(27, 8, 'false', '2024-11-28 17:11:55', 'd', 0, 1, '0000-00-00 00:00:00', 1, 8),
(28, 6, 'true', '2024-11-28 17:30:01', 'adne', 0, 1, '0000-00-00 00:00:00', 0, 8),
(29, 8, 'false', '2024-11-28 17:30:18', 'biết ròi', 0, 1, '0000-00-00 00:00:00', 1, 8),
(30, 8, 'false', '2024-11-28 18:09:06', 'tin nhăn mới nè', 0, 1, '0000-00-00 00:00:00', 1, 8),
(31, 8, 'false', '2024-11-28 18:09:55', 'lại tin nhắn mới', 0, 1, '0000-00-00 00:00:00', 1, 8),
(32, 8, 'false', '2024-11-28 18:10:34', '...', 0, 1, '0000-00-00 00:00:00', 1, 8),
(33, 6, 'true', '2024-11-28 18:11:43', 'ồ', 0, 1, '0000-00-00 00:00:00', 0, 8),
(34, 8, 'false', '2024-11-28 18:19:53', 'now', 0, 1, '0000-00-00 00:00:00', 1, 8),
(35, 8, 'false', '2024-11-28 18:29:16', 'dddd', 0, 1, '0000-00-00 00:00:00', 1, 8),
(36, 8, 'true', '2024-11-28 18:31:45', 'new chat', 0, 1, '0000-00-00 00:00:00', 1, 8),
(37, 6, 'true', '2024-11-28 18:33:29', 'admin cmd', 0, 1, '0000-00-00 00:00:00', 0, 8),
(38, 8, 'true', '2024-11-28 18:35:10', 'now', 0, 1, '0000-00-00 00:00:00', 1, 8),
(39, 6, 'true', '2024-11-28 18:49:23', 'start messsss', 0, 1, '0000-00-00 00:00:00', 0, 1);

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
(154, 57, 0, 'dadwa', 2, 3242423, '2024-11-27 14:57:47', 'in_stock', 1, ''),
(155, 58, 1, 'sp update', 5, 7000, '2024-11-28 11:32:02', 'in_stock', 12, ''),
(156, 59, 1, 'sp update', 5, 7000, '2024-11-28 11:35:12', 'in_stock', 1, ''),
(157, 60, 1, 'sp update', 5, 7000, '2024-11-28 11:36:06', 'in_stock', 1, ''),
(158, 61, 2, '', 1, 3000, '2024-11-28 11:39:56', 'in_stock', 1, ''),
(159, 62, 1, 'sp update', 5, 7000, '2024-11-28 11:40:09', 'in_stock', 1, ''),
(160, 63, 1, 'sp update', 5, 7000, '2024-11-28 11:49:25', 'in_stock', 1, ''),
(161, 64, 1, 'sp update', 5, 7000, '2024-11-28 11:49:38', 'in_stock', 1, ''),
(162, 65, 1, 'sp update', 5, 7000, '2024-11-28 12:15:09', 'in_stock', 4, ''),
(163, 66, 1, 'sp update', 5, 7000, '2024-11-28 13:27:02', 'in_stock', 1, ''),
(164, 68, 1, 'sp update', 5, 7000, '2024-11-28 15:14:01', 'in_stock', 1, ''),
(165, 68, 2, '', 1, 3000, '2024-11-28 15:14:01', 'in_stock', 1, ''),
(166, 69, 1, 'sp update', 5, 7000, '2024-11-28 15:44:31', 'in_stock', 1, ''),
(167, 69, 2, '', 1, 3000, '2024-11-28 15:44:31', 'in_stock', 1, ''),
(168, 69, 4, 'iphone 15 product untimax untral super real', 9, 23000000, '2024-11-28 15:44:31', 'in_stock', 1, '/uploads/product/1732682085925-avatar.jpg'),
(169, 69, 5, 'iphone 15 product untimax untral super real', 9, 23000000, '2024-11-28 15:44:31', 'in_stock', 1, '/uploads/product/1732688230225-avatar.jpg'),
(170, 70, 1, 'sp update', 5, 7000, '2024-11-28 18:08:48', 'in_stock', 5, ''),
(171, 71, 6, 'deeee', 1, 100000000, '2024-11-28 18:09:04', 'in_stock', 12, 'uploads/product/1732784295443-download.jpg'),
(172, 72, 2, '', 1, 3000, '2024-11-28 18:09:32', 'in_stock', 1, ''),
(173, 72, 4, 'iphone 15 product untimax untral super real', 2, 23000000, '2024-11-28 18:09:32', 'in_stock', 1, ''),
(174, 72, 6, 'deeee', 1, 100000000, '2024-11-28 18:09:32', 'in_stock', 1, 'uploads/product/1732784295443-download.jpg'),
(175, 73, 1, 'sp update', 5, 7000, '2024-11-28 18:55:51', 'in_stock', 1, ''),
(176, 74, 2, '', 1, 3000, '2024-11-28 18:58:08', 'in_stock', 1, ''),
(177, 75, 2, '', 1, 3000, '2024-11-28 19:00:49', 'in_stock', 1, ''),
(178, 76, 6, 'deeee', 1, 100000000, '2024-11-28 19:03:09', 'in_stock', 6, 'uploads/product/1732784295443-download.jpg'),
(179, 77, 6, 'deeee', 1, 100000000, '2024-11-28 19:10:52', 'in_stock', 1, 'uploads/product/1732784295443-download.jpg'),
(180, 78, 6, 'deeee', 1, 100000000, '2024-11-29 02:35:19', 'in_stock', 1, 'uploads/product/1732784295443-download.jpg'),
(181, 78, 2, '', 1, 3000, '2024-11-29 02:35:19', 'in_stock', 1, '');

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
(55, 'completed', '324234ddddddddddddd', '45435435', 134234234, 'lephuc0167283@gmail.com', '2024-11-27 07:11:38', '0000-00-00 00:00:00', 'paypal', 1),
(56, 'success', 'dq3e32', '45435435', 134234234, 'lephuc0167283@gmail.com', '2024-11-27 07:43:53', '0000-00-00 00:00:00', 'credit_card', 1),
(57, 'completed', 'd323d23d32', '45435435', 134234234, 'lephuc0167283@gmail.com', '2024-11-27 07:57:47', '0000-00-00 00:00:00', 'credit_card', 1),
(58, 'success', 'e2', '1', 2147483647, 'lephuc0167283@gmail.com', '2024-11-28 04:32:02', '0000-00-00 00:00:00', 'credit_card', 1),
(59, 'pending', 'dawd', '1', 2147483647, 'lehoangphuc01052003@gmail.com', '2024-11-28 04:35:12', '0000-00-00 00:00:00', 'credit_card', 1),
(60, 'pending', 'saw', '1', 1234567892, 'rdk48639@zbock.com', '2024-11-28 04:36:06', '0000-00-00 00:00:00', 'credit_card', 1),
(61, 'pending', 's', '1', 2147483647, 'lephuc0167283@gmail.com', '2024-11-28 04:39:56', '0000-00-00 00:00:00', 'credit_card', 1),
(62, 'pending', 'daw', '1', 2147483647, 'lephuc0167283@gmail.com', '2024-11-28 04:40:09', '0000-00-00 00:00:00', 'credit_card', 1),
(63, 'pending', 'daw', '1', 0, 'rdk48639@zbock.com', '2024-11-28 04:49:25', '0000-00-00 00:00:00', 'credit_card', 1),
(64, 'pending', 'daw', 'daw', 0, '122@c.com', '2024-11-28 04:49:38', '0000-00-00 00:00:00', 'credit_card', 1),
(65, 'pending', 'daw', '1', 0, 'rdk48639@zbock.com', '2024-11-28 05:15:09', '0000-00-00 00:00:00', 'credit_card', 1),
(66, 'pending', 'fdfsef', '1', 0, 'lephuc0167283@gmail.com', '2024-11-28 06:27:02', '0000-00-00 00:00:00', 'credit_card', 6),
(67, 'pending', 'daw', '45435435', 23423423, 'agfktxgem@10mail.org', '2024-11-28 08:12:26', '0000-00-00 00:00:00', 'credit_card', 7),
(68, 'success', 'dawd', '45435435', 134234234, 'nfkbpjj8@minimail.gq', '2024-11-28 08:14:01', '0000-00-00 00:00:00', 'credit_card', 7),
(69, 'success', 'dawdqwada', '45435435', 134234234, 'agfktxgem@10mail.org', '2024-11-28 08:44:31', '0000-00-00 00:00:00', 'credit_card', 7),
(70, 'cancelled', 'dawdwadqw', 'dawdwadaw', 134234234, 'lephuc0167283@gmail.com', '2024-11-28 11:08:48', '0000-00-00 00:00:00', 'credit_card', 8),
(71, 'cancelled', 'dawdawd', 'dawdaw', 0, 'djjvutjxe@laste.ml', '2024-11-28 11:09:04', '0000-00-00 00:00:00', 'credit_card', 8),
(72, 'cancelled', 'dawdw', 'diachiaalllll', 2147483647, 'lephuc0167283@gmail.com', '2024-11-28 11:09:32', '0000-00-00 00:00:00', 'credit_card', 8),
(73, 'cancelled', '223r23r', 'ads', 134234234, '223@fs.drg', '2024-11-28 11:55:51', '0000-00-00 00:00:00', 'credit_card', 8),
(74, 'cancelled', 'đưa', '45435435', 134234234, 'agfktxgem@10mail.org', '2024-11-28 11:58:08', '0000-00-00 00:00:00', 'credit_card', 8),
(75, 'cancelled', 'dưa', 'dâd', 134234234, 'lephuc0167283@gmail.com', '2024-11-28 12:00:49', '0000-00-00 00:00:00', 'credit_card', 8),
(76, 'cancelled', 'dawdwd232dd', '45435435', 134234234, 'ra3wmaqj@spymail.one', '2024-11-28 12:03:09', '0000-00-00 00:00:00', 'credit_card', 8),
(77, 'cancelled', 'dawda', 'dawdwadaw', 23423423, 'agfktxgem@10mail.org', '2024-11-28 12:10:52', '0000-00-00 00:00:00', 'paypal', 8),
(78, 'pending', 'dawwd134', 'dawdwadaw', 134234234, 'ra3wmaqj@spymail.one', '2024-11-28 19:35:19', '0000-00-00 00:00:00', 'Payment_upon_receipt', 8);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `product_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT 0.00,
  `stock` int(11) DEFAULT 0,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `category_id`, `product_name`, `description`, `price`, `discount`, `stock`, `image_url`, `created_at`, `updated_at`, `status`) VALUES
(1, 5, 'sp update', 'sp được update', 7000.00, 0.00, 300, '', '2024-11-22 06:15:29', '2024-11-23 05:44:17', 'active'),
(2, 1, '', '', 3000.00, 0.00, 50, NULL, '2024-11-22 06:16:31', '2024-11-23 05:26:50', 'active'),
(4, 2, 'iphone 15 product untimax untral super real', 'ai phôn màu xanh ', 23000000.00, 0.00, 100, '', '2024-11-27 04:34:45', '2024-11-28 08:59:06', 'active'),
(5, 2, 'iphone 15 product untimax untral super real', 'ai phôn màu xanh ', 23000000.00, 0.00, 100, '', '2024-11-27 06:17:10', '2024-11-28 08:59:00', 'active'),
(6, 1, 'deeee', 'deee', 99999999.99, 999.99, 21424234, 'uploads/product/1732784295443-download.jpg', '2024-11-28 08:58:15', '2024-11-28 08:58:15', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(700) NOT NULL,
  `fullname` varchar(30) DEFAULT NULL,
  `gender` varchar(8) DEFAULT NULL,
  `born` date NOT NULL,
  `email` varchar(40) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `avatar` varchar(1000) NOT NULL DEFAULT '/uploads/avatar/defaultavatar.png',
  `role` int(1) NOT NULL DEFAULT 1,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `refreshToken` varchar(300) DEFAULT NULL,
  `OTP` varchar(500) DEFAULT NULL,
  `OTPEXPRIES` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `gender`, `born`, `email`, `address`, `phone`, `avatar`, `role`, `isActive`, `refreshToken`, `OTP`, `OTPEXPRIES`, `Create_at`, `Update_at`) VALUES
(1, 'uchihanemo', '$2b$10$Dl32ilymiS2d4Vgz2PkBeeSwJ6JKXnfJ5hvsvaMGcVlWvyUzZd7lK', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2200@gmail.com', 'an giang', '0836887911', 'uploads/avatar/1732258963266-herta.jpg', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMjc2ODE4NCwiZXhwIjoxNzY0MzI1Nzg0fQ.Pui6R-zHNGwK8XlU0J2rMBC8x3I1mgp1AwIDfXX2m28', NULL, '2024-11-28 04:29:44', '2024-11-21 08:41:36', '2024-11-28 04:29:44'),
(2, 'nemoadmin', '$2b$10$TD3QSSHramw9E5x4zNmpmemQMTd3hrBwebN3PXtb4jrcOP1MHoxoi', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2600@gmail.com', '242 tây xuyên ang giangz', '', '/uploads/avatar/defaultavatar.png', 1, 1, NULL, '680407', '2024-11-27 11:51:14', '2024-11-21 08:41:36', '2024-11-27 11:51:14'),
(3, 'nemouser1', '$2b$10$.GTr8G2nZXdonTtgmnQOleQ054v9UwrfN66nT9D2Cd2kNCm.HDLKi', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2500@gmail.com', '242 tây xuyên ang giangz', '', '/uploads/avatar/defaultavatar.png', 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczMjc1ODgxNCwiZXhwIjoxNzY0MzE2NDE0fQ.WEJGYXCZF4qFWGn62T6PLaz1QuFOu15MsXNJW9LIE2M', '530405', '2024-11-28 01:53:34', '2024-11-21 08:41:36', '2024-11-28 01:53:34'),
(4, 'nemouser2', '$2b$10$6YeeqnI0fA2cOqOsnbAOjOoyii6n6QQp.Lz1NNXDCD9MBfBhzsAoi', 'Nemo hô hô', 'male', '2003-06-16', NULL, '242 tây xuyên ang giangz', NULL, '/uploads/avatar/defaultavatar.png', 1, 1, NULL, NULL, '2024-11-27 02:09:35', '2024-11-27 02:09:35', '2024-11-27 02:09:35'),
(5, 'nemouser3', '$2b$10$sh.KnL05q6dV7ujdsRvBnuAVWuNGlrBhd1Tk8jgxWmJeEE8BAxGjq', 'nemo usser high', 'male', '2016-06-20', NULL, 'châu đốc', NULL, '/uploads/avatar/defaultavatar.png', 1, 1, NULL, NULL, '2024-11-27 02:10:29', '2024-11-27 02:10:29', '2024-11-27 02:10:29'),
(6, 'admin', '$2b$10$i5VQMU3abBmErvf1C9y8PemV2627raWaNXy0m9NhxvpPZLOBuuAwu', 'Le Phuc', 'Male', '2022-02-20', NULL, '1', NULL, '/uploads/avatar/defaultavatar.png', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTczMjc5NTkyMCwiZXhwIjoxNzY0MzUzNTIwfQ.Ge5RbqwzAzyKWScJ4tii-oo5JuQGOPd2j8yC3KIhJqM', NULL, '2024-11-28 12:12:00', '2024-11-28 06:20:22', '2024-11-28 12:12:00'),
(7, 'user', '$2b$10$z9tTcqkr742uAvQEvjBGAeK86zOWx6RpaUNRrJ3lw50.qvY6bTSHS', 'user', 'Male', '2020-01-20', NULL, 'user', NULL, '/uploads/avatar/defaultavatar.png', 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTczMjc3OTk1MiwiZXhwIjoxNzY0MzM3NTUyfQ.zoA7zyQPidCQ3BsdC259TLpLk3xOx96v5getr8ONK5k', NULL, '2024-11-28 07:45:52', '2024-11-28 07:45:31', '2024-11-28 07:45:52'),
(8, 'nguoidung', '$2b$10$U5dnyByVEPCILiiwZTCm/.MtXCBtFtIJig50yMZVZJdzX3PgQ9XfC', 'nguoidung', 'Male', '2011-11-19', NULL, 'nguoidung', NULL, '/uploads/avatar/defaultavatar.png', 1, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTczMjgwNjc0MywiZXhwIjoxNzY0MzY0MzQzfQ.ZsY-CwJYSEkXR_RnOXK3KVi2N8eP0M4f7r4vrPKiETE', NULL, '2024-11-28 19:17:36', '2024-11-28 11:08:23', '2024-11-28 19:17:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messenger`
--
ALTER TABLE `messenger`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderproduct`
--
ALTER TABLE `orderproduct`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `categories_ibfk1` (`category_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `messenger`
--
ALTER TABLE `messenger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `orderproduct`
--
ALTER TABLE `orderproduct`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `categories_ibfk1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
