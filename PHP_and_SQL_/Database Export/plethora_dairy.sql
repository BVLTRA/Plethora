-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 27, 2026 at 04:20 AM
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
-- Database: `plethora_dairy`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `entry_id`, `content`, `status`, `created_at`, `updated_at`) VALUES
(1, 3, 1, 'I felt this entirely. You have to break the habit physically.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(2, 4, 1, 'Time helps. Give it a few more months.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(3, 2, 9, '3 AM is the only time things make sense.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(4, 5, 19, 'Glad to be here.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(5, 6, 22, 'They definitely haunt the drive. Ghost data.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(6, 10, 2, 'Burn it down and start over.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(7, 12, 3, 'Constraints breed creativity.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(8, 11, 4, 'Nothing beats the iron.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(9, 14, 5, 'Light mode is a crime.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(10, 16, 6, 'Sounds perfect.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(11, 17, 7, 'I call it the observer trap.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(12, 7, 8, 'CORS errors will be the end of me.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(13, 1, 10, 'Agreed.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(14, 3, 11, 'Comfort shows are cheaper than therapy.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(15, 18, 12, 'Cypher is such a beautiful query language though.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(16, 19, 13, 'Let it happen.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(17, 14, 14, 'Never install the beta on your daily driver!', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(18, 11, 15, 'Hydrate.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(19, 18, 16, 'Time to clear the cache.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(20, 17, 17, 'Facts.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(21, 12, 18, 'But the pizza is free.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(22, 4, 20, 'Keep it.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(23, 5, 21, 'Look up.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(24, 2, 23, 'I hear you.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(25, 8, 24, 'And then you moved it back, right?', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(26, 9, 25, 'Decision fatigue is real.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(27, 10, 26, 'Time for cup number four.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(28, 13, 27, 'JetBrains Mono or nothing.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(29, 15, 28, 'Load-bearing console.log().', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(30, 19, 29, 'Best aesthetic.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(31, 20, 30, 'Needed this reminder.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(32, 8, 1, 'It fades eventually.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(33, 12, 8, 'Backend APIs are basically black magic.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(34, 1, 23, 'The grid is always listening.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(35, 11, 4, 'Get back in there tomorrow.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51');

-- --------------------------------------------------------

--
-- Table structure for table `entries`
--

CREATE TABLE `entries` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` enum('draft','published') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `entries`
--

INSERT INTO `entries` (`id`, `user_id`, `title`, `content`, `status`, `created_at`, `updated_at`) VALUES
(1, 2, 'Muscle Memory', 'It’s been four months since the last text, but opening our chat is still pure muscle memory at this point.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(2, 8, 'Refactoring', 'Sometimes rewriting the architecture is easier than figuring out why the old one broke. I wish I could do that with my memories.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(3, 9, 'Design constraints', 'Staring at a blank canvas is terrifying. Setting strict boundaries actually forces me to be more creative.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(4, 11, 'Physical Limits', 'Hit a new personal record today. The physical exhaustion completely quiets the mental noise. Highly recommend.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(5, 13, 'Eye Strain', 'If your environment doesn\'t have a high contrast dark theme, I\'m not using it. My eyes can\'t take the bright white anymore.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(6, 16, 'Sunday', 'Just potato wedges, a grilled cheese, and watching documentaries. Perfect Sunday.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(7, 15, 'Overthinking', 'Caught in a loop of observing myself observing the world. It’s exhausting being this analytical all the time.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(8, 7, 'Relay Handoffs', 'Building full-stack systems is 20% writing logic and 80% figuring out why the frontend and backend refuse to talk to each other.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(9, 10, 'Quiet Hours', 'The world is so loud during the day. I only feel like I can breathe at 3 AM when the servers are quiet.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(10, 14, 'Bureaucracy', 'The nightmare of infinite paperwork and red tape is the most realistic horror I\'ve ever experienced.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(11, 3, 'Procedural Comfort', 'Why is early 2000s television so comforting? It\'s just the same plot every episode and I love it.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(12, 18, 'Graph Databases', 'Mapping relationships in a graph database is strangely poetic. Everything is just nodes and edges. Just like us.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(13, 19, 'Audio Isolation', 'Put on some headphones, close your eyes, and just let the synth wash over you.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(14, 14, 'The Beta', 'Updated my OS to the developer beta. Half my tools are crashing. I have no one to blame but myself.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(15, 11, 'Retention', 'Started adjusting my supplement stack. Hoping the water retention isn\'t too crazy. Need that extra rep.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(16, 18, 'Lag', 'When your design file gets so heavy that clicking a layer takes a full second to register. Pain.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(17, 17, 'NoSQL', 'The flexibility of document stores is great until you realize you actually needed a strict schema all along.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(18, 12, 'Gridlock', 'Hackathons are just weaponized sleep deprivation.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(19, 1, 'System Initialization', 'The grid is officially online. Watching the data flow.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(20, 4, 'Untitled', 'Sometimes I write things out just to delete them. But I think I will leave this one here.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(21, 5, 'Perspective', 'We spend so much time looking at screens we forget there is sky above us.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(22, 6, 'Lost Data', 'I wonder where deleted files actually go. Do they just stop existing, or do they haunt the hard drive?', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(23, 2, 'Static', 'Feeling very disconnected today. Like I am broadcasting on a frequency nobody is tuned into.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(24, 8, 'Wireframing', 'I spent three hours moving a single button four pixels to the left.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(25, 9, 'Routine', 'There is comfort in waking up and doing the exact same thing every day. It removes the friction of choice.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(26, 10, 'Caffeine Crash', 'That moment at 4 PM where the espresso wears off and gravity suddenly feels twice as strong.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(27, 13, 'Monospace', 'Switched my editor font again. Why am I like this?', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(28, 15, 'Ghosts in the Machine', 'Sometimes code works and literally nobody knows why. We just don\'t touch it.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(29, 19, 'Heavy rain', 'The sound of rain hitting the roof while compiling is peak atmosphere.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51'),
(30, 20, 'Breathing', 'Take a second. Step away from the monitor. Just breathe.', 'published', '2026-08-27 02:07:51', '2026-08-27 02:07:51');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `user_id` int(11) NOT NULL,
  `entry_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`user_id`, `entry_id`, `created_at`) VALUES
(1, 4, '2026-08-27 02:07:51'),
(1, 6, '2026-08-27 02:07:51'),
(1, 8, '2026-08-27 02:07:51'),
(1, 11, '2026-08-27 02:07:51'),
(1, 13, '2026-08-27 02:07:51'),
(1, 14, '2026-08-27 02:07:51'),
(1, 15, '2026-08-27 02:07:51'),
(1, 17, '2026-08-27 02:07:51'),
(1, 19, '2026-08-27 02:07:51'),
(1, 28, '2026-08-27 02:07:51'),
(2, 3, '2026-08-27 02:07:51'),
(2, 5, '2026-08-27 02:07:51'),
(2, 7, '2026-08-27 02:07:51'),
(2, 10, '2026-08-27 02:07:51'),
(2, 13, '2026-08-27 02:07:51'),
(2, 22, '2026-08-27 02:07:51'),
(2, 23, '2026-08-27 02:07:51'),
(2, 28, '2026-08-27 02:07:51'),
(2, 29, '2026-08-27 02:07:51'),
(3, 1, '2026-08-27 02:07:51'),
(3, 3, '2026-08-27 02:07:51'),
(3, 8, '2026-08-27 02:07:51'),
(3, 9, '2026-08-27 02:07:51'),
(3, 15, '2026-08-27 02:07:51'),
(3, 23, '2026-08-27 02:07:51'),
(3, 28, '2026-08-27 02:07:51'),
(3, 30, '2026-08-27 02:07:51'),
(4, 4, '2026-08-27 02:07:51'),
(4, 9, '2026-08-27 02:07:51'),
(4, 13, '2026-08-27 02:07:51'),
(4, 18, '2026-08-27 02:07:51'),
(4, 20, '2026-08-27 02:07:51'),
(4, 22, '2026-08-27 02:07:51'),
(4, 23, '2026-08-27 02:07:51'),
(4, 24, '2026-08-27 02:07:51'),
(4, 29, '2026-08-27 02:07:51'),
(5, 4, '2026-08-27 02:07:51'),
(5, 6, '2026-08-27 02:07:51'),
(5, 12, '2026-08-27 02:07:51'),
(5, 13, '2026-08-27 02:07:51'),
(5, 14, '2026-08-27 02:07:51'),
(5, 17, '2026-08-27 02:07:51'),
(5, 20, '2026-08-27 02:07:51'),
(6, 2, '2026-08-27 02:07:51'),
(6, 14, '2026-08-27 02:07:51'),
(6, 16, '2026-08-27 02:07:51'),
(6, 21, '2026-08-27 02:07:51'),
(6, 24, '2026-08-27 02:07:51'),
(6, 26, '2026-08-27 02:07:51'),
(6, 27, '2026-08-27 02:07:51'),
(6, 28, '2026-08-27 02:07:51'),
(6, 30, '2026-08-27 02:07:51'),
(7, 6, '2026-08-27 02:07:51'),
(7, 8, '2026-08-27 02:07:51'),
(7, 12, '2026-08-27 02:07:51'),
(7, 16, '2026-08-27 02:07:51'),
(7, 18, '2026-08-27 02:07:51'),
(7, 19, '2026-08-27 02:07:51'),
(7, 23, '2026-08-27 02:07:51'),
(7, 26, '2026-08-27 02:07:51'),
(7, 30, '2026-08-27 02:07:51'),
(8, 1, '2026-08-27 02:07:51'),
(8, 3, '2026-08-27 02:07:51'),
(8, 7, '2026-08-27 02:07:51'),
(8, 10, '2026-08-27 02:07:51'),
(8, 12, '2026-08-27 02:07:51'),
(8, 21, '2026-08-27 02:07:51'),
(8, 24, '2026-08-27 02:07:51'),
(8, 26, '2026-08-27 02:07:51'),
(8, 29, '2026-08-27 02:07:51'),
(9, 3, '2026-08-27 02:07:51'),
(9, 8, '2026-08-27 02:07:51'),
(9, 9, '2026-08-27 02:07:51'),
(9, 12, '2026-08-27 02:07:51'),
(9, 21, '2026-08-27 02:07:51'),
(9, 24, '2026-08-27 02:07:51'),
(9, 29, '2026-08-27 02:07:51'),
(10, 1, '2026-08-27 02:07:51'),
(10, 2, '2026-08-27 02:07:51'),
(10, 11, '2026-08-27 02:07:51'),
(10, 16, '2026-08-27 02:07:51'),
(10, 23, '2026-08-27 02:07:51'),
(10, 28, '2026-08-27 02:07:51'),
(11, 2, '2026-08-27 02:07:51'),
(11, 7, '2026-08-27 02:07:51'),
(11, 13, '2026-08-27 02:07:51'),
(11, 14, '2026-08-27 02:07:51'),
(11, 15, '2026-08-27 02:07:51'),
(11, 17, '2026-08-27 02:07:51'),
(11, 18, '2026-08-27 02:07:51'),
(11, 21, '2026-08-27 02:07:51'),
(11, 23, '2026-08-27 02:07:51'),
(11, 26, '2026-08-27 02:07:51'),
(12, 8, '2026-08-27 02:07:51'),
(12, 10, '2026-08-27 02:07:51'),
(12, 12, '2026-08-27 02:07:51'),
(12, 15, '2026-08-27 02:07:51'),
(12, 17, '2026-08-27 02:07:51'),
(12, 19, '2026-08-27 02:07:51'),
(12, 20, '2026-08-27 02:07:51'),
(12, 21, '2026-08-27 02:07:51'),
(12, 23, '2026-08-27 02:07:51'),
(12, 25, '2026-08-27 02:07:51'),
(13, 1, '2026-08-27 02:07:51'),
(13, 8, '2026-08-27 02:07:51'),
(13, 10, '2026-08-27 02:07:51'),
(13, 17, '2026-08-27 02:07:51'),
(13, 18, '2026-08-27 02:07:51'),
(13, 25, '2026-08-27 02:07:51'),
(13, 26, '2026-08-27 02:07:51'),
(13, 27, '2026-08-27 02:07:51'),
(14, 4, '2026-08-27 02:07:51'),
(14, 10, '2026-08-27 02:07:51'),
(14, 14, '2026-08-27 02:07:51'),
(14, 18, '2026-08-27 02:07:51'),
(14, 19, '2026-08-27 02:07:51'),
(14, 25, '2026-08-27 02:07:51'),
(14, 30, '2026-08-27 02:07:51'),
(15, 2, '2026-08-27 02:07:51'),
(15, 3, '2026-08-27 02:07:51'),
(15, 5, '2026-08-27 02:07:51'),
(15, 21, '2026-08-27 02:07:51'),
(15, 22, '2026-08-27 02:07:51'),
(15, 23, '2026-08-27 02:07:51'),
(15, 24, '2026-08-27 02:07:51'),
(15, 25, '2026-08-27 02:07:51'),
(16, 2, '2026-08-27 02:07:51'),
(16, 4, '2026-08-27 02:07:51'),
(16, 11, '2026-08-27 02:07:51'),
(16, 15, '2026-08-27 02:07:51'),
(16, 16, '2026-08-27 02:07:51'),
(16, 20, '2026-08-27 02:07:51'),
(16, 26, '2026-08-27 02:07:51'),
(16, 29, '2026-08-27 02:07:51'),
(16, 30, '2026-08-27 02:07:51'),
(17, 5, '2026-08-27 02:07:51'),
(17, 7, '2026-08-27 02:07:51'),
(17, 11, '2026-08-27 02:07:51'),
(17, 14, '2026-08-27 02:07:51'),
(17, 15, '2026-08-27 02:07:51'),
(17, 17, '2026-08-27 02:07:51'),
(17, 18, '2026-08-27 02:07:51'),
(17, 30, '2026-08-27 02:07:51'),
(18, 9, '2026-08-27 02:07:51'),
(18, 10, '2026-08-27 02:07:51'),
(18, 11, '2026-08-27 02:07:51'),
(18, 13, '2026-08-27 02:07:51'),
(18, 16, '2026-08-27 02:07:51'),
(18, 25, '2026-08-27 02:07:51'),
(18, 26, '2026-08-27 02:07:51'),
(18, 29, '2026-08-27 02:07:51'),
(19, 7, '2026-08-27 02:07:51'),
(19, 9, '2026-08-27 02:07:51'),
(19, 10, '2026-08-27 02:07:51'),
(19, 14, '2026-08-27 02:07:51'),
(19, 19, '2026-08-27 02:07:51'),
(19, 20, '2026-08-27 02:07:51'),
(19, 21, '2026-08-27 02:07:51'),
(19, 23, '2026-08-27 02:07:51'),
(19, 29, '2026-08-27 02:07:51'),
(20, 1, '2026-08-27 02:07:51'),
(20, 2, '2026-08-27 02:07:51'),
(20, 4, '2026-08-27 02:07:51'),
(20, 10, '2026-08-27 02:07:51'),
(20, 12, '2026-08-27 02:07:51'),
(20, 13, '2026-08-27 02:07:51'),
(20, 14, '2026-08-27 02:07:51'),
(20, 27, '2026-08-27 02:07:51'),
(20, 29, '2026-08-27 02:07:51');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_active` timestamp NOT NULL DEFAULT current_timestamp(),
  `quote` varchar(255) DEFAULT 'The static clears when you stop fighting it.',
  `role` varchar(20) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `created_at`, `last_active`, `quote`, `role`) VALUES
(1, 'BVLTRA', 'admin@bvltra.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Architect of the grid.', 'admin'),
(2, 'signal_noise', 'signal@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'I just want my hands to forget the route.', 'user'),
(3, 'neon_ghost', 'neon@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Living between the static.', 'user'),
(4, 'cipher_key', 'cipher@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Decrypting reality.', 'user'),
(5, 'blank_slate', 'blank@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Nothing to see here.', 'user'),
(6, 'litchi', 'litchi@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Just observing.', 'user'),
(7, 'echo_chamber', 'echo@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Is anyone listening?', 'user'),
(8, 'null_pointer', 'null@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Defined but empty.', 'user'),
(9, 'wireframe', 'wire@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Structuring the chaos.', 'user'),
(10, 'quiet_routine', 'quiet@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Finding peace in the repetition.', 'user'),
(11, 'midnight_coder', 'mid@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'The screen is my sun.', 'user'),
(12, 'heavy_metal', 'heavy@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Endurance is everything.', 'user'),
(13, 'espresso_loop', 'coffee@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'while(awake) { code(); }', 'user'),
(14, 'dark_mode', 'dark@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Lights out.', 'user'),
(15, 'syntax_error', 'syntax@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Missing a semicolon somewhere in my life.', 'user'),
(16, 'stray_node', 'stray@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Disconnected from the main cluster.', 'user'),
(17, 'open_window', 'open@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Letting the air in.', 'user'),
(18, 'fragmented', 'frag@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Defragmentation required.', 'user'),
(19, 'pixel_pusher', 'pixel@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Pushing vectors until they make sense.', 'user'),
(20, 'iron_lung', 'iron@test.com', '$2y$10$8qFRhL.67DUQtOCCx5jHVO3ndGiGzoOhk5yU8u6D4shy7BJTLvZpO', '2026-08-27 02:07:51', '2026-08-27 02:07:51', 'Breathe in, breathe out.', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `entry_id` (`entry_id`);

--
-- Indexes for table `entries`
--
ALTER TABLE `entries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`user_id`,`entry_id`),
  ADD KEY `entry_id` (`entry_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `entries`
--
ALTER TABLE `entries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `entries`
--
ALTER TABLE `entries`
  ADD CONSTRAINT `entries_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`entry_id`) REFERENCES `entries` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
