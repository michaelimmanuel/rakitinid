/*
  Warnings:

  - Added the required column `cooler` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coolerPrice` to the `build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `build` ADD COLUMN `cooler` VARCHAR(191) NOT NULL,
    ADD COLUMN `coolerPrice` DOUBLE NOT NULL;
