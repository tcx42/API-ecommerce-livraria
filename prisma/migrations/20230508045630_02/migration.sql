-- AlterTable
ALTER TABLE `Order` ADD COLUMN `couponId` INTEGER NULL;

-- AlterTable
ALTER TABLE `ProductOrder` ADD COLUMN `discount` DECIMAL(65, 30) NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('admin', 'client') NOT NULL;

-- CreateTable
CREATE TABLE `Coupon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `discount` DECIMAL(65, 30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `Coupon`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
