-- AlterTable
ALTER TABLE `build` MODIFY `acceccories1` VARCHAR(191) NULL,
    ALTER COLUMN `acceccories1Price` DROP DEFAULT,
    MODIFY `acceccories2` VARCHAR(191) NULL,
    ALTER COLUMN `acceccories2Price` DROP DEFAULT,
    MODIFY `acceccories3` VARCHAR(191) NULL,
    ALTER COLUMN `acceccories3Price` DROP DEFAULT,
    MODIFY `acceccories4` VARCHAR(191) NULL,
    ALTER COLUMN `acceccories4Price` DROP DEFAULT,
    MODIFY `fan1` VARCHAR(191) NULL,
    ALTER COLUMN `fan1Price` DROP DEFAULT,
    MODIFY `fan2` VARCHAR(191) NULL,
    ALTER COLUMN `fan2Price` DROP DEFAULT,
    MODIFY `fan3` VARCHAR(191) NULL,
    ALTER COLUMN `fan3Price` DROP DEFAULT,
    MODIFY `fan4` VARCHAR(191) NULL,
    ALTER COLUMN `fan4Price` DROP DEFAULT;
