-- AlterTable
ALTER TABLE `accessories` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `admin` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `build` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `casing` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `fan` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `gpu` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `prebuilt` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `processor` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `psu` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `ram` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `socket_type` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `storage` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `motherboard_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `motherboard_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `processor_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `processor_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ram_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ram_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gpu_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gpu_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `psu_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `psu_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `storage_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storage_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `casing_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `casing_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fan_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fan_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accessories_purchase_price` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accessories_id` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BuildFans` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BuildFans_AB_unique`(`A`, `B`),
    INDEX `_BuildFans_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_BuildAccessories` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_BuildAccessories_AB_unique`(`A`, `B`),
    INDEX `_BuildAccessories_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `motherboard_purchase_price` ADD CONSTRAINT `motherboard_purchase_price_motherboard_id_fkey` FOREIGN KEY (`motherboard_id`) REFERENCES `motherboard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `processor_purchase_price` ADD CONSTRAINT `processor_purchase_price_processor_id_fkey` FOREIGN KEY (`processor_id`) REFERENCES `processor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ram_purchase_price` ADD CONSTRAINT `ram_purchase_price_ram_id_fkey` FOREIGN KEY (`ram_id`) REFERENCES `ram`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gpu_purchase_price` ADD CONSTRAINT `gpu_purchase_price_gpu_id_fkey` FOREIGN KEY (`gpu_id`) REFERENCES `gpu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `psu_purchase_price` ADD CONSTRAINT `psu_purchase_price_psu_id_fkey` FOREIGN KEY (`psu_id`) REFERENCES `psu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `storage_purchase_price` ADD CONSTRAINT `storage_purchase_price_storage_id_fkey` FOREIGN KEY (`storage_id`) REFERENCES `storage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `casing_purchase_price` ADD CONSTRAINT `casing_purchase_price_casing_id_fkey` FOREIGN KEY (`casing_id`) REFERENCES `casing`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fan_purchase_price` ADD CONSTRAINT `fan_purchase_price_fan_id_fkey` FOREIGN KEY (`fan_id`) REFERENCES `fan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessories_purchase_price` ADD CONSTRAINT `accessories_purchase_price_accessories_id_fkey` FOREIGN KEY (`accessories_id`) REFERENCES `accessories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BuildFans` ADD CONSTRAINT `_BuildFans_A_fkey` FOREIGN KEY (`A`) REFERENCES `build`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BuildFans` ADD CONSTRAINT `_BuildFans_B_fkey` FOREIGN KEY (`B`) REFERENCES `fan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BuildAccessories` ADD CONSTRAINT `_BuildAccessories_A_fkey` FOREIGN KEY (`A`) REFERENCES `accessories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_BuildAccessories` ADD CONSTRAINT `_BuildAccessories_B_fkey` FOREIGN KEY (`B`) REFERENCES `build`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
