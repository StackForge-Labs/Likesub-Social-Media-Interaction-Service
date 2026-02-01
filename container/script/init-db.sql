
CREATE DATABASE IF NOT EXISTS user_lsmi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS social_lsmi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS wallet_lsmi
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'user_service'@'%' IDENTIFIED BY 'user_pass';
CREATE USER IF NOT EXISTS 'social_service'@'%' IDENTIFIED BY 'social_pass';
CREATE USER IF NOT EXISTS 'wallet_service'@'%' IDENTIFIED BY 'wallet_pass';

GRANT ALL PRIVILEGES ON user_lsmi.* TO 'user_service'@'%';
GRANT ALL PRIVILEGES ON social_lsmi.* TO 'social_service'@'%';
GRANT ALL PRIVILEGES ON wallet_lsmi.* TO 'wallet_service'@'%';

FLUSH PRIVILEGES;
