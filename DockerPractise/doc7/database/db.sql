CREATE DATABASE IF NOT EXISTS college_voting;
USE college_voting;

CREATE TABLE IF NOT EXISTS votes (
    candidate_name VARCHAR(50) PRIMARY KEY,
    vote_count INT DEFAULT 0
);

-- Initialize candidates
INSERT IGNORE INTO votes (candidate_name, vote_count) VALUES 
('Doraemon Team', 0), 
('Ninja Hattori', 0), 
('Shinchan', 0), 
('Pokemon', 0);