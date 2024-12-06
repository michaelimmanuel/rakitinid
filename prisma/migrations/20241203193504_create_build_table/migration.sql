-- CreateTable
CREATE TABLE `build` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motherboard` VARCHAR(191) NOT NULL,
    `processor` VARCHAR(191) NOT NULL,
    `ram` VARCHAR(191) NOT NULL,
    `gpu` VARCHAR(191) NOT NULL,
    `storage` VARCHAR(191) NOT NULL,
    `psu` VARCHAR(191) NOT NULL,
    `casing` VARCHAR(191) NOT NULL,
    `total` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
