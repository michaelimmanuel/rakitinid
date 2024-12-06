/*
  Warnings:

  - You are about to drop the column `total` on the `build` table. All the data in the column will be lost.
  - Added the required column `casingPrice` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gpuPrice` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motherboardPrice` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processorPrice` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `psuPrice` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ramPrice` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storagePrice` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `build` DROP COLUMN `total`,
    ADD COLUMN `casingPrice` DOUBLE NOT NULL,
    ADD COLUMN `gpuPrice` DOUBLE NOT NULL,
    ADD COLUMN `motherboardPrice` DOUBLE NOT NULL,
    ADD COLUMN `processorPrice` DOUBLE NOT NULL,
    ADD COLUMN `psuPrice` DOUBLE NOT NULL,
    ADD COLUMN `ramPrice` DOUBLE NOT NULL,
    ADD COLUMN `storagePrice` DOUBLE NOT NULL,
    ADD COLUMN `totalPrice` DOUBLE NOT NULL;
