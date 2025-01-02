/*
  Warnings:

  - You are about to alter the column `name` on the `service` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `service` MODIFY `name` JSON NOT NULL;
