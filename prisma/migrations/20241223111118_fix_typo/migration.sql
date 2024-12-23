/*
  Warnings:

  - You are about to drop the column `acceccories1` on the `build` table. All the data in the column will be lost.
  - You are about to drop the column `acceccories1Price` on the `build` table. All the data in the column will be lost.
  - You are about to drop the column `acceccories2` on the `build` table. All the data in the column will be lost.
  - You are about to drop the column `acceccories2Price` on the `build` table. All the data in the column will be lost.
  - You are about to drop the column `acceccories3` on the `build` table. All the data in the column will be lost.
  - You are about to drop the column `acceccories3Price` on the `build` table. All the data in the column will be lost.
  - You are about to drop the column `acceccories4` on the `build` table. All the data in the column will be lost.
  - You are about to drop the column `acceccories4Price` on the `build` table. All the data in the column will be lost.
  - Added the required column `accessories1Price` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessories2Price` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessories3Price` to the `build` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessories4Price` to the `build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `build` DROP COLUMN `acceccories1`,
    DROP COLUMN `acceccories1Price`,
    DROP COLUMN `acceccories2`,
    DROP COLUMN `acceccories2Price`,
    DROP COLUMN `acceccories3`,
    DROP COLUMN `acceccories3Price`,
    DROP COLUMN `acceccories4`,
    DROP COLUMN `acceccories4Price`,
    ADD COLUMN `accessories1` VARCHAR(191) NULL,
    ADD COLUMN `accessories1Price` DOUBLE NOT NULL,
    ADD COLUMN `accessories2` VARCHAR(191) NULL,
    ADD COLUMN `accessories2Price` DOUBLE NOT NULL,
    ADD COLUMN `accessories3` VARCHAR(191) NULL,
    ADD COLUMN `accessories3Price` DOUBLE NOT NULL,
    ADD COLUMN `accessories4` VARCHAR(191) NULL,
    ADD COLUMN `accessories4Price` DOUBLE NOT NULL;
