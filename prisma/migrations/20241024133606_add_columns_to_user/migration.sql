/*
  Warnings:

  - Made the column `address` on table `court` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `court` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `court` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bio` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prefered_position` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `court` MODIFY `address` VARCHAR(191) NOT NULL,
    MODIFY `latitude` DECIMAL(65, 30) NOT NULL,
    MODIFY `longitude` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `avatar` VARCHAR(191) NOT NULL,
    ADD COLUMN `bio` VARCHAR(191) NOT NULL,
    ADD COLUMN `prefered_position` VARCHAR(191) NOT NULL;
