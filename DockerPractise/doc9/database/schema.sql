CREATE DATABASE IF NOT EXISTS recipe_db;
USE recipe_db;

-- Create the table
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients TEXT NOT NULL,
    instructions TEXT NOT NULL,
    image_url VARCHAR(255),
    cooking_time INT
);

-- Insert sample data
INSERT INTO recipes (title, ingredients, instructions, cooking_time) VALUES 
('Classic Tomato Pasta', 'Pasta, Tomatoes, Garlic, Basil', 'Boil pasta. Sauté garlic and tomatoes. Mix together.', 20),
('Chicken Stir Fry', 'Chicken, Soy Sauce, Broccoli, Ginger', 'Fry chicken. Add vegetables and sauce. Serve with rice.', 15),
('Garlic Bread', 'Bread, Butter, Garlic, Herbs', 'Mix butter and garlic. Spread on bread and bake.', 10),
('Chocolate Mug Cake', 'Flour, Cocoa, Sugar, Milk', 'Mix in a mug. Microwave for 90 seconds.', 5);