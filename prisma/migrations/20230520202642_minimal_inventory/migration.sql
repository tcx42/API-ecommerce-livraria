/*
  Warnings:

  - You are about to alter the column `inventory` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.

*/
-- AlterTable
ALTER TABLE `Product` MODIFY `inventory` INTEGER UNSIGNED NOT NULL;
