CREATE DATABASE IF NOT EXISTS Likesub_Social_Media_Interaction
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'likesub'@'%' IDENTIFIED BY 'likesub_pass';

GRANT ALL PRIVILEGES ON Likesub_Social_Media_Interaction.* TO 'likesub'@'%';

FLUSH PRIVILEGES;
