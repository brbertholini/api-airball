/*
  Warnings:

  - You are about to drop the column `location` on the `court` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `court` DROP COLUMN `location`;
ALTER TABLE `court` ADD COLUMN `address` VARCHAR(255);
ALTER TABLE `court` ADD COLUMN `latitude` DECIMAL(9,6);
ALTER TABLE `court` ADD COLUMN `longitude` DECIMAL(9,6);
