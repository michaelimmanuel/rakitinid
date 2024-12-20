-- AlterTable
ALTER TABLE `admin` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `build` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `casing` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `gpu` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `motherboard` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `prebuilt` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `processor` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `psu` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `ram` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `socket_type` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `storage` ADD COLUMN `quantity` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `fan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `image` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accessories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `image` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
