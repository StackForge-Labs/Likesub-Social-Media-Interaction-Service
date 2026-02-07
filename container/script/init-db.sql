
CREATE DATABASE IF NOT EXISTS Likesub-Social-Media-Interaction
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;



CREATE USER IF NOT EXISTS 'likesub'@'%' IDENTIFIED BY 'likesub_pass';

GRANT ALL PRIVILEGES ON 'Likesub-Social-Media-Interaction'* TO 'likesub'@'%';

FLUSH PRIVILEGES;
