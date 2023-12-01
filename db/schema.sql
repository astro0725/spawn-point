-- Creates database if it doesn't exist
CREATE DATABASE IF NOT EXISTS spawnpoint_development;

-- Select the newly created database
USE spawnpoint_development;

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebaseUserId VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(255) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Alter the Users table to add additional columns
ALTER TABLE Users
ADD COLUMN biography VARCHAR(255),
ADD COLUMN profilePicture VARCHAR(255),
ADD COLUMN profileHeader VARCHAR(255) NOT NULL,
ADD COLUMN name VARCHAR(255) NOT NULL;

-- Create the Posts table
CREATE TABLE IF NOT EXISTS Posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebaseUserId VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (firebaseUserId) REFERENCES Users(firebaseUserId)
);

-- Create the Showcase table
CREATE TABLE IF NOT EXISTS Showcase (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firebaseUserId VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (firebaseUserId) REFERENCES Users(firebaseUserId)
);

-- Create the RAWGGame table
CREATE TABLE IF NOT EXISTS RAWGGame (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    backgroundImageUrl VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create the ShowcaseGame join table for many-to-many relationship
CREATE TABLE IF NOT EXISTS ShowcaseGame (
    showcaseId INT NOT NULL,
    rawgGameId INT NOT NULL,
    PRIMARY KEY (showcaseId, rawgGameId),
    FOREIGN KEY (showcaseId) REFERENCES Showcase(id),
    FOREIGN KEY (rawgGameId) REFERENCES RAWGGame(id)
);


-- CREATE DATABASE IF NOT EXISTS spawnpoint_test;

-- USE spawnpoint_test;