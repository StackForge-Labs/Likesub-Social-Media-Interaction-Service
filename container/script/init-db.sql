
CREATE DATABASE IF NOT EXISTS Likesub-Social-Media-Interaction
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;



CREATE USER IF NOT EXISTS 'likesub_service'@'%' IDENTIFIED BY 'likesub_pass';

GRANT ALL PRIVILEGES ON backend_lsmi.* TO 'likesub'@'%';

FLUSH PRIVILEGES;
