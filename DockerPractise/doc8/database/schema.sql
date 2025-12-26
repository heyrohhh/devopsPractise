-- Create the database
CREATE DATABASE office_chat;

-- Select the database
USE office_chat;

-- Create Departments Table
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL
);

-- Create Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'employee') DEFAULT 'employee',
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(id)
);

-- Insert the default Admin
INSERT INTO users (username, password, role) 
VALUES ('Rohit', 'PST', 'admin');