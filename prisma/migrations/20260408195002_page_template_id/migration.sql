-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "templateId" INTEGER;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "PageTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;
