/*
  Warnings:

  - You are about to drop the column `link` on the `ProductImage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filename]` on the table `ProductImage` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `ProductImage` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `ProductImage_link_key` ON `ProductImage`;

-- AlterTable
ALTER TABLE `ProductImage` DROP COLUMN `link`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ProductImage_filename_key` ON `ProductImage`(`filename`);
