-- AlterTable
ALTER TABLE `Address` MODIFY `address_2` VARCHAR(191) NULL,
    MODIFY `latitude` DECIMAL(65, 30) NULL,
    MODIFY `longitude` DECIMAL(65, 30) NULL,
    MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'home';

-- AlterTable
ALTER TABLE `Reel` MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `email_validated_at` DATETIME(3) NULL,
    MODIFY `phone_number` VARCHAR(191) NULL,
    MODIFY `phone_number_verified_at` DATETIME(3) NULL,
    MODIFY `profile_image` VARCHAR(191) NULL,
    MODIFY `cover_image` VARCHAR(191) NULL,
    MODIFY `gender` VARCHAR(191) NULL,
    MODIFY `date_of_birth` DATE NULL,
    MODIFY `introduction` TEXT NULL,
    MODIFY `occupation` VARCHAR(191) NULL,
    MODIFY `interests` TEXT NULL,
    MODIFY `hobbies` TEXT NULL,
    MODIFY `website` VARCHAR(191) NULL,
    MODIFY `language_practice_preferences` TEXT NULL,
    MODIFY `availability` TEXT NULL;
