-- Creates database if it doesn't exist
CREATE DATABASE IF NOT EXISTS spawnpoint_development;

-- Select the newly created database
USE spawnpoint_development;

CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebaseUserId VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CREATE DATABASE IF NOT EXISTS spawnpoint_development;

-- USE spawnpoint_test;