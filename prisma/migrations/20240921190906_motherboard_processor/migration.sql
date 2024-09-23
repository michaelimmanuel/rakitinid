/*
  Warnings:

  - You are about to drop the `processor_brand` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `processor_brand`;

-- CreateTable
CREATE TABLE `motherboard` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `socket_type_id` INTEGER NOT NULL,
    `form_factor` VARCHAR(191) NOT NULL,
    `supported_memory_type` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `processor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `brand` VARCHAR(191) NOT NULL,
    `socket_type_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `socket_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_motherboardToprocessor` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_motherboardToprocessor_AB_unique`(`A`, `B`),
    INDEX `_motherboardToprocessor_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `motherboard` ADD CONSTRAINT `motherboard_socket_type_id_fkey` FOREIGN KEY (`socket_type_id`) REFERENCES `socket_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `processor` ADD CONSTRAINT `processor_socket_type_id_fkey` FOREIGN KEY (`socket_type_id`) REFERENCES `socket_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_motherboardToprocessor` ADD CONSTRAINT `_motherboardToprocessor_A_fkey` FOREIGN KEY (`A`) REFERENCES `motherboard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_motherboardToprocessor` ADD CONSTRAINT `_motherboardToprocessor_B_fkey` FOREIGN KEY (`B`) REFERENCES `processor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
