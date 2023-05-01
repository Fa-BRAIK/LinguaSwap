-- CreateTable
CREATE TABLE `refresh_tokens` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires_at` DATETIME(3) NOT NULL,
    `authenticable_id` INTEGER NOT NULL,
    `authenticable_type` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `admin_authenticable_id` FOREIGN KEY (`authenticable_id`) REFERENCES `admins`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `user_authenticable_id` FOREIGN KEY (`authenticable_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
