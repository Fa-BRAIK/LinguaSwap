/*
  Warnings:

  - You are about to alter the column `gender` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- DropIndex
DROP INDEX `user_authenticable_id` ON `refresh_tokens`;

-- AlterTable
ALTER TABLE `users` MODIFY `gender` ENUM('MALE', 'FEMALE') NULL;
