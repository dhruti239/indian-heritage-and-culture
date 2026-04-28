USE heritage_db;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS page_visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  page VARCHAR(100) NOT NULL,
  visits INT DEFAULT 1,
  UNIQUE KEY uq_user_page (user_id, page),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS monument_visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  monument_id INT NOT NULL,
  monument_name VARCHAR(255),
  monument_city VARCHAR(255),
  visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_monument (user_id, monument_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS tour_registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT NOT NULL,
  monument_id INT NOT NULL,
  monument_name VARCHAR(255),
  monument_city VARCHAR(255),
  registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_tour (user_id, monument_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS discussions (
  id BIGINT PRIMARY KEY,
  monument_id INT NOT NULL,
  user_id BIGINT NOT NULL,
  user_name VARCHAR(255),
  text TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Seed default users
INSERT IGNORE INTO users (id, name, email, password, role) VALUES
  (1, 'Admin User',      'admin@example.com',   'admin123', 'Admin'),
  (2, 'Test Enthusiast', 'test@example.com',    '123456',   'Cultural Enthusiast'),
  (3, 'Content Creator', 'creator@example.com', '123456',   'Content Creator'),
  (4, 'Tour Guide',      'guide@example.com',   '123456',   'Tour Guide');
