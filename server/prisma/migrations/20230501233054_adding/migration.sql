/*
  Warnings:

  - Added the required column `token` to the `refresh_tokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `refresh_tokens` ADD COLUMN `token` VARCHAR(191) NOT NULL;
