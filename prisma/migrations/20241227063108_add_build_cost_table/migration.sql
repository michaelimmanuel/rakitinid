-- CreateTable
CREATE TABLE `build_cost` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `build_id` INTEGER NOT NULL,
    `total_cost` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `build_cost_build_id_key`(`build_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `build_cost` ADD CONSTRAINT `build_cost_build_id_fkey` FOREIGN KEY (`build_id`) REFERENCES `build`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
