/*
  Warnings:

  - The primary key for the `Taggable` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Taggable` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Taggable` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`tag_id`, `taggable_id`, `taggable_type`);
