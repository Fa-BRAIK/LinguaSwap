-- DropForeignKey
ALTER TABLE `refresh_tokens` DROP FOREIGN KEY `admin_authenticable_id`;

-- DropForeignKey
ALTER TABLE `refresh_tokens` DROP FOREIGN KEY `user_authenticable_id`;
