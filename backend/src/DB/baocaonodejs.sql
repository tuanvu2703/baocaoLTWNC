-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 21, 2024 lúc 04:42 AM
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
  `refreshToken` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `gender`, `born`, `email`, `address`, `phone`, `avatar`, `role`, `refreshToken`) VALUES
(1, 'uchihanemo', '$2b$10$o3FAYj/2Butm5Ce74e59XeD13d/tXK3Myt.zCZ9qYpAzLjKh724Gi', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2200@gmail.com', '242 tây xuyên ang giangz', '', '', 0, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMjA4NjA4OCwiZXhwIjoxNzYzNjQzNjg4fQ.gk6dNjHsNsgROrU-IePZOyfEJ7otJUICMpZRMBIb-x4'),
(2, 'nemoadmin', '$2b$10$TD3QSSHramw9E5x4zNmpmemQMTd3hrBwebN3PXtb4jrcOP1MHoxoi', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2600@gmail.com', '242 tây xuyên ang giangz', '', '', 1, NULL),
(3, 'nemouser1', '$2b$10$.GTr8G2nZXdonTtgmnQOleQ054v9UwrfN66nT9D2Cd2kNCm.HDLKi', 'Nemo hô hô', 'male', '2003-06-16', 'tienyeuai2600@gmail.com', '242 tây xuyên ang giangz', '', '', 1, NULL);

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
