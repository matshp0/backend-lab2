/*
  Warnings:

  - Made the column `defaultCurrencyCode` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_defaultCurrencyCode_fkey";

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "defaultCurrencyCode" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_defaultCurrencyCode_fkey" FOREIGN KEY ("defaultCurrencyCode") REFERENCES "currency"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
