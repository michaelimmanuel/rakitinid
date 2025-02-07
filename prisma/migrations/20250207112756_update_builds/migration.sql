/*
  Warnings:

  - You are about to drop the column `storage` on the `build` table. All the data in the column will be lost.
  - You are about to drop the column `storagePrice` on the `build` table. All the data in the column will be lost.
  - Added the required column `accessories5Price` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage1` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storage1Price` to the `build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `build` DROP COLUMN `storage`,
    DROP COLUMN `storagePrice`,
    ADD COLUMN `accessories5` VARCHAR(191) NULL,
    ADD COLUMN `accessories5Price` DOUBLE NOT NULL,
    ADD COLUMN `storage1` VARCHAR(191) NOT NULL,
    ADD COLUMN `storage1Price` DOUBLE NOT NULL,
    ADD COLUMN `storage2` VARCHAR(191) NULL;
