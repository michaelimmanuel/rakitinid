/*
  Warnings:

  - You are about to drop the `_BuildAccessories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BuildFans` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `acceccories1` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acceccories2` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acceccories3` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `acceccories4` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fan1` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fan2` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fan3` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fan4` to the `build` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_BuildAccessories` DROP FOREIGN KEY `_BuildAccessories_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BuildAccessories` DROP FOREIGN KEY `_BuildAccessories_B_fkey`;

-- DropForeignKey
ALTER TABLE `_BuildFans` DROP FOREIGN KEY `_BuildFans_A_fkey`;

-- DropForeignKey
ALTER TABLE `_BuildFans` DROP FOREIGN KEY `_BuildFans_B_fkey`;

-- DropForeignKey
ALTER TABLE `accessories_purchase_price` DROP FOREIGN KEY `accessories_purchase_price_accessories_id_fkey`;

-- DropForeignKey
ALTER TABLE `casing_purchase_price` DROP FOREIGN KEY `casing_purchase_price_casing_id_fkey`;

-- DropForeignKey
ALTER TABLE `fan_purchase_price` DROP FOREIGN KEY `fan_purchase_price_fan_id_fkey`;

-- DropForeignKey
ALTER TABLE `gpu_purchase_price` DROP FOREIGN KEY `gpu_purchase_price_gpu_id_fkey`;

-- DropForeignKey
ALTER TABLE `motherboard` DROP FOREIGN KEY `motherboard_socket_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `motherboard_purchase_price` DROP FOREIGN KEY `motherboard_purchase_price_motherboard_id_fkey`;

-- DropForeignKey
ALTER TABLE `processor` DROP FOREIGN KEY `processor_socket_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `processor_purchase_price` DROP FOREIGN KEY `processor_purchase_price_processor_id_fkey`;

-- DropForeignKey
ALTER TABLE `psu_purchase_price` DROP FOREIGN KEY `psu_purchase_price_psu_id_fkey`;

-- DropForeignKey
ALTER TABLE `ram_purchase_price` DROP FOREIGN KEY `ram_purchase_price_ram_id_fkey`;

-- DropForeignKey
ALTER TABLE `storage_purchase_price` DROP FOREIGN KEY `storage_purchase_price_storage_id_fkey`;

-- AlterTable
ALTER TABLE `build` ADD COLUMN `acceccories1` VARCHAR(191) NOT NULL,
    ADD COLUMN `acceccories1Price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `acceccories2` VARCHAR(191) NOT NULL,
    ADD COLUMN `acceccories2Price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `acceccories3` VARCHAR(191) NOT NULL,
    ADD COLUMN `acceccories3Price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `acceccories4` VARCHAR(191) NOT NULL,
    ADD COLUMN `acceccories4Price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `fan1` VARCHAR(191) NOT NULL,
    ADD COLUMN `fan1Price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `fan2` VARCHAR(191) NOT NULL,
    ADD COLUMN `fan2Price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `fan3` VARCHAR(191) NOT NULL,
    ADD COLUMN `fan3Price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `fan4` VARCHAR(191) NOT NULL,
    ADD COLUMN `fan4Price` DOUBLE NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `_BuildAccessories`;

-- DropTable
DROP TABLE `_BuildFans`;

-- AddForeignKey
ALTER TABLE `motherboard` ADD CONSTRAINT `motherboard_socket_type_id_fkey` FOREIGN KEY (`socket_type_id`) REFERENCES `socket_type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `processor` ADD CONSTRAINT `processor_socket_type_id_fkey` FOREIGN KEY (`socket_type_id`) REFERENCES `socket_type`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `motherboard_purchase_price` ADD CONSTRAINT `motherboard_purchase_price_motherboard_id_fkey` FOREIGN KEY (`motherboard_id`) REFERENCES `motherboard`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `processor_purchase_price` ADD CONSTRAINT `processor_purchase_price_processor_id_fkey` FOREIGN KEY (`processor_id`) REFERENCES `processor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ram_purchase_price` ADD CONSTRAINT `ram_purchase_price_ram_id_fkey` FOREIGN KEY (`ram_id`) REFERENCES `ram`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `gpu_purchase_price` ADD CONSTRAINT `gpu_purchase_price_gpu_id_fkey` FOREIGN KEY (`gpu_id`) REFERENCES `gpu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `psu_purchase_price` ADD CONSTRAINT `psu_purchase_price_psu_id_fkey` FOREIGN KEY (`psu_id`) REFERENCES `psu`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `storage_purchase_price` ADD CONSTRAINT `storage_purchase_price_storage_id_fkey` FOREIGN KEY (`storage_id`) REFERENCES `storage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `casing_purchase_price` ADD CONSTRAINT `casing_purchase_price_casing_id_fkey` FOREIGN KEY (`casing_id`) REFERENCES `casing`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fan_purchase_price` ADD CONSTRAINT `fan_purchase_price_fan_id_fkey` FOREIGN KEY (`fan_id`) REFERENCES `fan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `accessories_purchase_price` ADD CONSTRAINT `accessories_purchase_price_accessories_id_fkey` FOREIGN KEY (`accessories_id`) REFERENCES `accessories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
