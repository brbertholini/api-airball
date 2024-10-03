/*
  Warnings:

  - You are about to drop the column `lighting` on the `court` table. All the data in the column will be lost.
  - Added the required column `hoop_quality` to the `Court` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lighting_quality` to the `Court` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `court` DROP COLUMN `lighting`,
    ADD COLUMN `hoop_quality` INTEGER NOT NULL,
    ADD COLUMN `image` LONGBLOB NULL,
    ADD COLUMN `lighting_quality` INTEGER NOT NULL;
