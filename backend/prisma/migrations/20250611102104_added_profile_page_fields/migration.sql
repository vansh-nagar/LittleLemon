-- AlterTable
ALTER TABLE "User" ADD COLUMN     "NewsLetterNoti" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "orderStatusNoti" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "passwordChangesNoti" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "phoneNo" INTEGER,
ADD COLUMN     "specialOfferNoti" BOOLEAN NOT NULL DEFAULT true;
