-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 22, 2024 lúc 09:09 AM
-- Phiên bản máy phục vụ: 10.4.27-MariaDB
-- Phiên bản PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `baocaonodejs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
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
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `category_name`, `description`, `created_at`, `updated_at`, `status`) VALUES
(1, 'Bomber', 'áo khoác có dây kéo kiểu boxy', '2024-11-21 06:11:33', '2024-11-21 06:11:33', 1),
(2, 'hoodie', 'áo khoác hoodie', '2024-11-21 07:19:18', '2024-11-21 07:19:18', 1),
(5, 'jean', 'Quần jean', '2024-11-21 07:27:58', '2024-11-21 07:27:58', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
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

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(700) NOT NULL,
  `fullname` varchar(30) NOT NULL,
  `gender` varchar(8) NOT NULL,
  `born` date NOT NULL,
  `email` varchar(40) NOT NULL,
  `address` varchar(100) NOT NULL,
  `phone` varchar(13) NOT NULL,
  `avatar` varchar(1000) NOT NULL,
  `role` int(1) NOT NULL DEFAULT 1,
  `isActive` tinyint(1) NOT NULL DEFAULT 1,
  `refreshToken` varchar(300) DEFAULT NULL,
  `Create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `gender`, `born`, `email`, `address`, `phone`, `avatar`, `role`, `isActive`, `refreshToken`, `Create_at`, `Update_at`) VALUES
(1, 'uchihanemo', '$2b$10$o3FAYj/2Butm5Ce74e59XeD13d/tXK3Myt.zCZ9qYpAzLjKh724Gi', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2200@gmail.com', '242 tây xuyên ang giangz', '', 'uploads/avatar/1732258963266-herta.jpg', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMjI0OTY3MCwiZXhwIjoxNzYzODA3MjcwfQ.rw8rHSr2enP6ZY82m16m6UL1Hh7rSAExpdZlT5TUt-g', '2024-11-21 08:41:36', '2024-11-22 07:02:43'),
(2, 'nemoadmin', '$2b$10$TD3QSSHramw9E5x4zNmpmemQMTd3hrBwebN3PXtb4jrcOP1MHoxoi', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2600@gmail.com', '242 tây xuyên ang giangz', '', '', 1, 1, NULL, '2024-11-21 08:41:36', '2024-11-21 08:41:36'),
(3, 'nemouser1', '$2b$10$.GTr8G2nZXdonTtgmnQOleQ054v9UwrfN66nT9D2Cd2kNCm.HDLKi', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2600@gmail.com', '242 tây xuyên ang giangz', '', '', 1, 1, NULL, '2024-11-21 08:41:36', '2024-11-21 08:41:36');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
