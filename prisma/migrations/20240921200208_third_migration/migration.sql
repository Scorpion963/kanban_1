/*
  Warnings:

  - You are about to drop the column `Status` on the `Task` table. All the data in the column will be lost.
  - Added the required column `status_color` to the `Column` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Column" ADD COLUMN     "status_color" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "Status",
ADD COLUMN     "status" TEXT NOT NULL;
