/*
  Warnings:

  - The primary key for the `followers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `follower_user_id` on the `followers` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `followers` table. All the data in the column will be lost.
  - Added the required column `follower_id` to the `followers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `following_id` to the `followers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `followers` DROP FOREIGN KEY `followers_follower_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `followers` DROP FOREIGN KEY `followers_user_id_fkey`;

-- AlterTable
ALTER TABLE `followers` DROP PRIMARY KEY,
    DROP COLUMN `follower_user_id`,
    DROP COLUMN `user_id`,
    ADD COLUMN `follower_id` INTEGER NOT NULL,
    ADD COLUMN `following_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`following_id`, `follower_id`);

-- CreateTable
CREATE TABLE `chat_rooms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_members` (
    `id` VARCHAR(191) NOT NULL,
    `is_admin` BOOLEAN NOT NULL DEFAULT false,
    `is_blocked` BOOLEAN NOT NULL DEFAULT false,
    `user_id` INTEGER NOT NULL,
    `user_creator_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chat_messages` (
    `id` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `user_id` INTEGER NOT NULL,
    `chat_room_id` INTEGER NOT NULL,
    `parent_chat_message_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followers` ADD CONSTRAINT `followers_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_members` ADD CONSTRAINT `chat_members_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_members` ADD CONSTRAINT `chat_members_user_creator_id_fkey` FOREIGN KEY (`user_creator_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_chat_room_id_fkey` FOREIGN KEY (`chat_room_id`) REFERENCES `chat_rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chat_messages` ADD CONSTRAINT `chat_messages_parent_chat_message_id_fkey` FOREIGN KEY (`parent_chat_message_id`) REFERENCES `chat_messages`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
