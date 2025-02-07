/*
  Warnings:

  - Added the required column `storage2Price` to the `build` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `build` ADD COLUMN `storage2Price` DOUBLE NOT NULL;
