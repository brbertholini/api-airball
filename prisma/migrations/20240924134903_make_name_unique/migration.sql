/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Court` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Court_name_key` ON `Court`(`name`);
