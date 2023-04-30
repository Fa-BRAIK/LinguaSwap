-- CreateTable
CREATE TABLE `Taggable` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tag_id` INTEGER NOT NULL,
    `taggable_type` ENUM('POST', 'REEL') NOT NULL DEFAULT 'POST',
    `taggable_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Taggable` ADD CONSTRAINT `Taggable_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `Tag`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Taggable` ADD CONSTRAINT `post_taggable_id` FOREIGN KEY (`taggable_id`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Taggable` ADD CONSTRAINT `reel_taggable_id` FOREIGN KEY (`taggable_id`) REFERENCES `Reel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
