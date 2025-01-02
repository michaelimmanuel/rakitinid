/*
  Warnings:

  - You are about to drop the `build_cost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `build_cost` DROP FOREIGN KEY `build_cost_build_id_fkey`;

-- AlterTable
ALTER TABLE `build` ADD COLUMN `totalCost` DOUBLE NULL DEFAULT 0;

-- DropTable
DROP TABLE `build_cost`;
