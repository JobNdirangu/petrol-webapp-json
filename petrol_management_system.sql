-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2024 at 10:10 AM
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
-- Database: `petrol_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE `station` (
  `id` int(11) NOT NULL,
  `closing_cash_meter` decimal(10,2) DEFAULT NULL,
  `closing_liters_meter` decimal(10,2) DEFAULT NULL,
  `date` date NOT NULL,
  `previous_cash_meter` decimal(10,2) DEFAULT NULL,
  `previous_liters_meter` decimal(10,2) DEFAULT NULL,
  `reg_date` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`id`, `closing_cash_meter`, `closing_liters_meter`, `date`, `previous_cash_meter`, `previous_liters_meter`, `reg_date`) VALUES
(1, 0.00, 0.00, '2024-04-14', 0.00, 0.00, '0000-00-00 00:00:00.000000'),
(2, 5000.00, 50.00, '2024-04-15', 0.00, 0.00, '2024-04-21 15:37:43.355683'),
(3, 8000.00, 80.00, '2024-04-17', 6000.00, 60.00, '2024-04-21 15:38:11.453973'),
(4, 10000.00, 100.00, '2024-04-21', 8000.00, 80.00, '2024-04-22 14:30:54.137760'),
(5, 11000.00, 110.00, '2024-04-22', 10000.00, 100.00, '2024-04-22 14:32:53.524555');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(55) NOT NULL,
  `id_sale` int(11) NOT NULL,
  `closing_deep` decimal(10,2) NOT NULL,
  `opening_deep` decimal(10,2) NOT NULL,
  `added_deeps` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`id`, `id_sale`, `closing_deep`, `opening_deep`, `added_deeps`, `date`, `reg_date`) VALUES
(1, 0, 0.00, 0.00, 0.00, '2024-04-14', '2024-04-21 13:52:34'),
(3, 0, 555.00, 0.00, 555.00, '2024-04-14', '2024-04-21 14:47:23'),
(4, 0, 610.00, 555.00, 55.00, '2024-04-14', '2024-04-21 14:48:41'),
(5, 1, 550.00, 610.00, 0.00, '2024-04-15', '2024-04-21 15:02:40'),
(6, 0, 555.00, 550.00, 5.00, '2024-04-16', '2024-04-21 15:16:59'),
(7, 0, 1110.00, 555.00, 555.00, '2024-04-16', '2024-04-21 15:22:47'),
(8, 2, 1090.00, 1110.00, 0.00, '2024-04-17', '2024-04-21 15:25:53'),
(9, 0, 1145.00, 1090.00, 55.00, '2024-04-18', '2024-04-22 14:08:38'),
(10, 0, 1700.00, 1145.00, 555.00, '2024-04-19', '2024-04-22 14:09:07'),
(11, 3, 1600.00, 1700.00, 0.00, '2024-04-21', '2024-04-22 14:30:54'),
(12, 4, 1590.00, 1600.00, 0.00, '2024-04-22', '2024-04-22 14:31:59'),
(13, 0, 1595.00, 1590.00, 5.00, '2024-04-20', '2024-04-22 16:55:04'),
(14, 0, 1600.00, 1595.00, 5.00, '2024-04-20', '2024-04-22 16:55:22'),
(15, 0, 1605.00, 1600.00, 5.00, '2024-04-21', '2024-04-22 16:56:18'),
(17, 0, 1660.00, 1605.00, 55.00, '2024-04-22', '2024-04-22 17:21:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `station`
--
ALTER TABLE `station`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(55) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
